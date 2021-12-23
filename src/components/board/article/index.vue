<template>
	<v-container style="max-width: 1200px" fluid v-if="!loaded">
		<v-skeleton-loader
			type="article"
			v-for="i in 3"
			:key="i"
		></v-skeleton-loader>
	</v-container>

	<v-container
		style="max-width: 1200px"
		fluid
		v-else-if="loaded && !items.length"
	>
		<v-alert type="warning" border="left">
			게시물이 없습니다
			<v-icon>mdi-plus</v-icon> 버튼을 눌러서 게시물을 작성하세요
		</v-alert>
	</v-container>

	<v-container fluid v-else class="pa-0 pb-2">
		<template v-for="(item, i) in items">
			<template v-if="$store.state.boardTypeList">
				<v-list-item
					three-line
					:key="item.id"
					:to="
						category
							? `${boardId}/${item.id}?category=${category}`
							: `${boardId}/${item.id}`
					"
				>
					<v-list-item-avatar v-if="!item.important">
						<v-img :src="item.user.photoURL"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title class="mb-2">
							<display-title :item="item"></display-title>
						</v-list-item-title>

						<v-list-item-subtitle class="grey--text caption mb-4">
							<display-time :time="item.createdAt"></display-time>
						</v-list-item-subtitle>

						<v-list-item-subtitle>
							<v-btn
								v-if="!$vuetify.breakpoint.xs && category != item.category"
								color="primary"
								small
								depressed
								outlined
								:to="`${$route.path}?category=${item.category}`"
								height="32"
							>
								{{ item.category }}
								<v-icon small>mdi-chevron-right</v-icon>
							</v-btn>
						</v-list-item-subtitle>
						<!-- <v-list-item-subtitle class="my-4">
							{{ getSummary(item.summary, 100, '!') }}
						</v-list-item-subtitle> -->
					</v-list-item-content>

					<v-list-item-action>
						<display-user :user="item.user" :size="'small'"></display-user>
					</v-list-item-action>

					<v-list-item-action>
						<v-btn
							icon
							small
							v-if="fireUser && fireUser.uid === item.uid"
							:to="`${boardId}/${item.id}?action=write`"
						>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>

						<v-sheet class="mr-2">
							<v-btn icon small>
								<v-icon small color="grey"> mdi-heart </v-icon>
							</v-btn>
							<span class="body-2 ma-0">{{ item.likeCount }}</span>
						</v-sheet>

						<v-sheet class="mr-2">
							<v-btn icon small>
								<v-icon small color="grey">mdi-eye</v-icon>
							</v-btn>
							<span class="body-2 ma-0">{{ item.readCount }}</span>
						</v-sheet>
					</v-list-item-action>
				</v-list-item>

				<v-divider v-if="i < items.length - 1" :key="i" />
			</template>

			<template v-else>
				<v-card
					:key="item.id"
					:class="i < items.length - 1 ? 'mb-4' : ''"
					class="ma-4"
					outlined
				>
					<v-card-title>
						<v-list-item-avatar size="48" class="align-self-start">
							<v-img :src="item.user.photoURL"></v-img>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title>
								<display-title :item="item"></display-title>
							</v-list-item-title>

							<v-list-item-subtitle class="grey--text caption">
								<display-time :time="item.createdAt"></display-time>
							</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action class="align-self-start"> </v-list-item-action>
					</v-card-title>

					<v-menu offset-y left>
						<template v-slot:activator="{ on }">
							<v-btn
								icon
								absolute
								top
								right
								v-if="fireUser && fireUser.uid === item.uid"
								v-on="on"
							>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>

						<v-card width="150">
							<v-btn block text color="error">Delete</v-btn>
							<v-btn block text>Edit</v-btn>
						</v-card>
					</v-menu>

					<v-card
						tile
						:to="
							category
								? `${boardId}/${item.id}?category=`
								: `${boardId}/${item.id}`
						"
						flat
						class="pa-2"
					>
						<v-card-text class="pa-0 px-2">
							<viewer
								v-if="item.summary"
								@load="onViewerLoad"
								:options="tuiOptions"
								:initialValue="item.summary"
							></viewer>

							<v-container v-else>
								<v-row justify="center" align="center">
									<v-progress-circular indeterminate></v-progress-circular>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions class="d-flex justify-center">
							<v-btn text color="primary">
								<v-icon left>mdi-dots-horizontal</v-icon>
								자세히보기
							</v-btn>

							<v-btn
								v-if="fireUser && fireUser.uid === item.uid"
								:to="`${boardId}/${item.id}?action=write`"
								text
								color="primary"
							>
								<v-icon left>mdi-pencil</v-icon>수정하기
							</v-btn>
						</v-card-actions>

						<v-card-actions v-if="!item.important">
							<v-btn
								color="primary"
								depressed
								small
								outlined
								class="mr-4"
								:to="`${$route.path}?category=${item.category}`"
								height="32"
							>
								{{ item.category }}
								<v-icon small>mdi-chevron-right</v-icon>
							</v-btn>

							<v-chip
								label
								outlined
								color="info"
								class="mr-2"
								v-for="tag in item.tags"
								:key="tag"
								v-text="tag"
							></v-chip>
						</v-card-actions>
					</v-card>

					<v-card-actions v-if="!item.important" class="pa-4">
						<display-user :user="item.user" :size="`small`"></display-user>

						<v-btn small icon class="ml-2">
							<v-icon small color="grey"> mdi-heart </v-icon>
						</v-btn>
						<span class="body-2">{{ item.likeCount }}</span>

						<v-btn small icon>
							<v-icon small color="grey">mdi-eye</v-icon>
						</v-btn>
						<span class="body-2">{{ item.readCount }}</span>
					</v-card-actions>
				</v-card>

				<!-- <v-divider
					v-if="i < items.length - 1 && $vuetify.breakpoint.xs"
					:key="i"
				/> -->
			</template>
		</template>

		<v-list-item v-if="lastDoc && items.length < board.count">
			<v-btn
				@click="more"
				v-intersect="onIntersect"
				text
				color="primary"
				block
				:loading="loading"
			>
				더보기
			</v-btn>
		</v-list-item>
	</v-container>
</template>

<script>
import { last } from 'lodash'
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'
import DisplayTitle from '@/components/display-title'
import getSummary from '@/util/getSummary'
import newCheck from '@/util/newCheck'
import addYoutubeIframe from '@/util/addYoutubeIframe'

const LIMIT = 5

export default {
	components: {
		DisplayTime,
		DisplayUser,
		DisplayTitle
	},

	props: ['board', 'boardId', 'category', 'tag'],
	data() {
		return {
			tuiOptions: {
				linkAttribute: {
					target: '_blank'
				}
			},
			items: [],
			unsubscribe: null,
			ref: null,
			lastDoc: null,
			order: 'createdAt',
			sort: 'desc',
			loading: false,
			getSummary,
			newCheck,
			loaded: false
		}
	},
	computed: {
		fireUser() {
			return this.$store.state.fireUser
		}
	},
	watch: {
		boardId() {
			this.subscribe()
		},
		category() {
			this.subscribe()
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
					if (findItem.summary !== item.summary) {
						findItem.summary = ''
						setTimeout(() => {
							findItem.summary = item.summary
						}, 1000)
					}
					findItem.title = item.title
					findItem.readCount = item.readCount
					findItem.commentCount = item.commentCount
					findItem.likeCount = item.likeCount
					findItem.likeUids = item.likeUids
					findItem.categories = item.categories
					findItem.tags = item.tags
					findItem.updatedAt = item.updatedAt.toDate()
					findItem.important = item.important
				}
			})
			this.items.sort((before, after) => {
				if (after.important > before.important) return 1
				else if (after.important < before.important) return -1
				return Number(after.id) - Number(before.id)
			})
		},
		// eslint-disable-next-line no-unused-vars
		subscribe(arrow) {
			if (this.unsubscribe) this.unsubscribe()
			this.items = []
			if (!this.category) {
				this.ref = this.$firebase
					.firestore()
					.collection('boards')
					.doc(this.boardId)
					.collection('articles')
					.orderBy('important', 'desc')
					.orderBy(this.order, this.sort)
					.limit(LIMIT)
			} else {
				this.ref = this.$firebase
					.firestore()
					.collection('boards')
					.doc(this.boardId)
					.collection('articles')
					.where('category', '==', this.category)
					.orderBy('important', 'desc')
					.orderBy(this.order, this.sort)
					.limit(LIMIT)
			}
			this.loaded = false
			this.unsubscribe = this.ref.onSnapshot(sn => {
				this.loaded = true
				if (sn.empty) {
					this.items = []
					return
				}
				this.snapshotToItems(sn)
			})
		},
		read(item) {
			this.$router.push({ path: this.$route.path + '/' + item.id })
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
		liked(item) {
			if (!this.fireUser) return false
			return item.likeUids.includes(this.fireUser.uid)
		},
		onViewerLoad(v) {
			addYoutubeIframe(v.preview.el, this.$vuetify.breakpoint)
		}
	}
}
</script>
