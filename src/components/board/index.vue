<template>
	<v-container style="max-width: 1200px" fluid v-if="!loaded">
		<v-row>
			<v-col cols="12" sm="6" v-for="i in 4" :key="i">
				<v-skeleton-loader type="card"></v-skeleton-loader>
			</v-col>
		</v-row>
	</v-container>

	<v-container
		style="max-width: 1200px"
		fluid
		v-else-if="loaded && !items.length && (!user || (user && user.level > 0))"
	>
		<v-alert type="warning" border="left"> 게시판이 없습니다 </v-alert>
	</v-container>

	<v-container style="max-width: 1200px" fluid v-else>
		<v-card>
			<v-toolbar flat>
				<v-toolbar-title>게시판 목록</v-toolbar-title>
				<v-spacer />
			</v-toolbar>

			<v-divider />

			<v-card-text>
				<v-row>
					<v-col cols="12" sm="6" v-if="user && user.level === 0">
						<v-card height="100%">
							<v-subheader> 새로운 게시판 추가 </v-subheader>

							<v-divider />

							<v-card-text>
								<v-text-field
									v-model="boardId"
									label="게시판 아이디"
									color="primary"
									placeholder="주소에 사용 될 문자입니다"
									outlined
									hide-details
								>
								</v-text-field>
							</v-card-text>

							<v-card-actions v-if="boardId">
								<v-btn text x-large block :to="`${$route.path}/${boardId}`">
									<v-icon left>mdi-plus</v-icon>
									추가하기
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>

					<v-col cols="12" sm="6" v-for="item in items" :key="item.id">
						<v-card heigth="100%">
							<v-subheader>
								<v-icon color="red" left v-if="newCheck(item.updatedAt)">
									mdi-fire
								</v-icon>
								{{ item.title }}
								<v-spacer />

								<template v-if="user && user.level === 0">
									<v-btn
										text
										small
										:to="`${$route.path}/${item.id}?&action=write`"
									>
										수정
									</v-btn>
									<v-btn text small @click="remove(item)" color="red">
										삭제
									</v-btn>
								</template>
							</v-subheader>

							<v-divider />

							<v-card-text>
								<v-alert border="left" type="info" outlined class="white-space">
									{{ item.description }}
								</v-alert>
							</v-card-text>

							<v-list-item>
								<v-list-item-content>
									<v-list-item-title> 작성자 </v-list-item-title>
									<v-list-item-subtitle>
										<display-user :user="item.user"></display-user>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-list-item>
								<v-list-item-content>
									<v-list-item-title> 작성일 </v-list-item-title>
									<v-list-item-subtitle class="body-2 grey--text">
										<display-time :time="item.createdAt"></display-time>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-list-item>
								<v-list-item-content>
									<v-list-item-title> 수정일 </v-list-item-title>
									<v-list-item-subtitle class="body-2 grey--text">
										<display-time :time="item.updatedAt"></display-time>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-list-item>
								<v-list-item-content>
									<v-list-item-title> 게시물수 </v-list-item-title>
									<v-list-item-subtitle class="body-2 grey--text">
										{{ item.count }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-divider />

							<v-list-item :to="`${$route.path}/${item.id}`">
								<v-list-item-content> 전체 </v-list-item-content>
								<v-list-item-action>
									<v-btn icon>
										<v-icon>mdi-menu-right</v-icon>
									</v-btn>
								</v-list-item-action>
							</v-list-item>

							<v-divider />

							<template v-for="(category, i) in item.categories">
								<v-list-item
									:key="category"
									:to="`${$route.path}/${item.id}?category=${category}`"
								>
									<v-list-item-content> {{ category }} </v-list-item-content>
									<v-list-item-action>
										<v-btn icon>
											<v-icon>mdi-menu-right</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>

								<v-divider :key="i" />
							</template>
						</v-card>
					</v-col>

					<v-col cols="12" sm="6" v-if="lastDoc">
						<v-container fluid fill-height>
							<v-btn
								@click="more"
								v-intersect="onIntersect"
								text
								color="primary"
								block
								:loading="loading"
							>
								<v-icon>mdi-plus-circle</v-icon>
								더보기
							</v-btn>
						</v-container>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import { last } from 'lodash'
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'
import newCheck from '@/util/newCheck'
const LIMIT = 5

export default {
	components: { DisplayTime, DisplayUser },
	data() {
		return {
			unsubscribe: null,
			items: [],
			ref: null,
			lastDoc: null,
			order: 'createdAt',
			sort: 'desc',
			boardId: '',
			loading: false,
			newCheck,
			loaded: false
		}
	},
	computed: {
		user() {
			return this.$store.state.user
		}
	},
	created() {
		this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
	},
	methods: {
		snapshotToItems(sn) {
			this.lastDoc = last(sn.docs)
			sn.docs.forEach(doc => {
				const findItem = this.items.find(item => doc.id === item.id)
				const item = doc.data()
				if (!findItem) {
					item.id = doc.id
					item.createdAt = item.createdAt.toDate()
					item.updatedAt = item.updatedAt.toDate()
					this.items.push(item)
				} else {
					findItem.category = item.category
					findItem.title = item.title
					findItem.count = item.count
					findItem.description = item.description
					findItem.categories = item.categories
					findItem.tags = item.tags
					findItem.updatedAt = item.updatedAt.toDate()
				}
			})
			this.items.sort((before, after) => {
				return (
					Number(after.createdAt.getTime()) - Number(before.createdAt.getTime())
				)
			})
		},
		subscribe() {
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.orderBy(this.order, this.sort)
				.limit(LIMIT)
			this.loaded = false
			this.unsubscribe = this.ref.onSnapshot(sn => {
				this.loaded = true
				if (sn.empty) {
					this.items = []
					return
				}
				this.snapshotToItems(sn)
			}, console.error)
		},
		async more() {
			if (!this.lastDoc) throw Error('더이상 데이터가 없습니다')
			if (this.loading) return
			this.loading = true
			try {
				const sn = await this.ref.startAfter(this.lastDoc).get()
				this.snapshotToItems(sn)
			} finally {
				this.loading = false
			}
		},
		onIntersect(entries, observer, isIntersecting) {
			if (isIntersecting) this.more()
		},
		async remove(item) {
			const r = await this.$swal.fire({
				title: '정말 삭제하시겠습니까?',
				text: '삭제 후 되돌릴 수 없습니다.',
				icon: 'error',
				// confirmButtonText: 'Cool',
				showCancelButton: true
			})
			if (!r.value) return
			await this.$firebase
				.firestore()
				.collection('boards')
				.doc(item.id)
				.delete()
			const i = this.items.findIndex(el => el.id === item.id)
			this.items.splice(i, 1)
		}
	}
}
</script>
