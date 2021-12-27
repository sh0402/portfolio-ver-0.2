<template>
	<v-container style="max-width: 1200px" fluid v-if="!loaded">
		<!-- <v-skeleton-loader type="card" v-for="i in 3" :key="i"></v-skeleton-loader> -->
		<v-skeleton-loader type="card"></v-skeleton-loader>
	</v-container>

	<v-container style="max-width: 1200px" fluid v-else-if="loaded && !board">
		<v-alert type="warning" border="left">게시판이 없습니다</v-alert>
	</v-container>

	<v-container style="max-width: 1200px" fluid v-else>
		<v-card>
			<v-toolbar color="transparent" flat>
				<v-sheet width="120" class="mr-2">
					<v-select
						:value="getCategory"
						:items="board.categories"
						@change="changeCategory"
						dense
						outlined
						single-line
						hide-details
						flat
					/>
				</v-sheet>

				<template>
					<span
						color="error"
						class="caption"
						v-if="newCheck(board.updatedAt, 'days', 1)"
					>
						New
					</span>
					<span v-text="board.title"></span>
				</template>

				<v-spacer />

				<v-btn icon @click="dialog = true">
					<v-icon>mdi-information-outline</v-icon>
				</v-btn>

				<v-btn
					icon
					v-if="board.type === '일반'"
					@click="$store.commit('toggleBoardType')"
				>
					<v-icon
						v-text="
							$store.state.boardTypeList
								? 'mdi-format-list-bulleted'
								: 'mdi-text-box-outline'
						"
					></v-icon>
				</v-btn>

				<template v-if="user">
					<v-btn icon @click="articleWrite" :disabled="!user">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</template>
			</v-toolbar>

			<v-divider />

			<board-article
				:boardId="boardId"
				:board="board"
				:category="category"
			></board-article>

			<v-dialog v-model="dialog" width="320">
				<v-card>
					<v-toolbar color="transparent" flat>
						<v-toolbar-title>게시판 정보</v-toolbar-title>

						<v-spacer />

						<template>
							<v-btn icon small @click="dialogBoardInfo = true">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>

						<v-dialog v-model="dialogBoardInfo" width="200">
							<v-list>
								<v-list-item class="px-1">
									<v-btn
										text
										block
										@click="write"
										:disabled="user && user.level > 0"
										color="info"
									>
										Edit
									</v-btn>
								</v-list-item>
								<v-list-item class="px-1">
									<v-btn
										text
										block
										@click="dialogBoardInfo = false"
										color="grey"
									>
										Cancle
									</v-btn>
								</v-list-item>
							</v-list>
						</v-dialog>
					</v-toolbar>

					<v-divider />

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 게시판 유형 </v-list-item-title>
							<v-list-item-subtitle>
								{{ board.type }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 게시판 이름 </v-list-item-title>
							<v-list-item-subtitle>
								{{ board.title }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 작성자 </v-list-item-title>
							<v-list-item-subtitle>
								<display-user :user="board.user"></display-user>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 작성일 </v-list-item-title>
							<v-list-item-subtitle class="body-2">
								<display-time :time="board.createdAt"></display-time>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 수정일 </v-list-item-title>
							<v-list-item-subtitle class="body-2">
								<display-time :time="board.updatedAt"></display-time>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 게시물수 </v-list-item-title>
							<v-list-item-subtitle class="body-2">
								{{ board.count }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 등록된 종류 </v-list-item-title>
							<v-list-item-subtitle>
								<v-chip
									color="info"
									label
									small
									outlined
									v-for="item in board.categories"
									:key="item"
									class="mt-2 mr-2"
									v-text="item"
								></v-chip>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 등록된 태그 </v-list-item-title>
							<v-list-item-subtitle class="comment">
								<v-chip
									color="info"
									label
									small
									outlined
									v-for="item in board.tags"
									:key="item"
									class="mt-2 mr-2"
									v-text="item"
								></v-chip>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> 설명 </v-list-item-title>
							<v-list-item-subtitle
								class="white-space"
								v-text="board.description"
							></v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-divider />

					<v-card-actions>
						<v-spacer />
						<v-btn text small @click="dialog = false">
							<v-icon small>mdi-close</v-icon>
							Close
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card>
	</v-container>
</template>

<script>
import BoardArticle from './article/index'
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'
import newCheck from '@/util/newCheck'

export default {
	components: { BoardArticle, DisplayTime, DisplayUser },
	props: ['boardId', 'category', 'tag'],
	data() {
		return {
			unsubscribe: null,
			board: null,
			loading: false,
			dialog: false,
			dialogBoardInfo: false,
			newCheck,
			loaded: false
		}
	},
	watch: {
		boardId() {
			this.subscribe()
		}
	},
	computed: {
		user() {
			return this.$store.state.user
		},
		getCategory() {
			if (!this.category) return '전체'
			return this.category
		}
	},
	created() {
		this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
	},
	methods: {
		subscribe() {
			if (this.unsubscribe) this.unsubscribe()
			const ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.boardId)
			this.unsubscribe = ref.onSnapshot(doc => {
				this.loaded = true
				if (!doc.exists) return this.write()
				const item = doc.data()
				item.createdAt = item.createdAt.toDate()
				item.updatedAt = item.updatedAt.toDate()
				item.categories.unshift('전체')
				this.board = item
			}, console.error)
		},
		async write() {
			this.$router.push({ path: this.$route.path, query: { action: 'write' } })
		},
		async articleWrite() {
			this.$router.push({
				path: this.$route.path + '/' + new Date().getTime(),
				query: { action: 'write' }
			})
		},
		changeCategory(item) {
			if (item === '전체') this.$router.push(this.$route.path)
			else
				this.$router.push({ path: this.$route.path, query: { category: item } })
		}
	}
}
</script>
