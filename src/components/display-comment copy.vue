<template>
	<v-card flat>
		<template>
			<v-card-title>
				<v-avatar size="40" class="mr-4">
					<v-img :src="article.user.photoURL"></v-img>
				</v-avatar>

				<v-textarea
					v-model="comment"
					label="댓글 작성"
					placeholder="Ctrl + Enter로 작성 가능"
					@keypress.ctrl.enter="save"
					outlined
					hide-details
					auto-grow
					rows="1"
					clearable
					dense
				/>

				<v-btn text small color="success" @click="save"> send </v-btn>
			</v-card-title>
		</template>

		<template v-for="(item, i) in items">
			<v-list-item-content :key="item.id">
				<v-list-item-icon v-if="isReplay(item)">
					<v-icon>mdi-comment-arrow-right</v-icon>
				</v-list-item-icon>

				<v-list-item>
					<v-list-item-action class="align-self-start mr-4">
						<v-avatar size="40">
							<v-img :src="item.user.photoURL"></v-img>
						</v-avatar>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-subtitle>
							<span class="mr-2">
								<display-user :user="item.user" size="small"></display-user>
							</span>

							<span class="ml-2 grey--text">
								<display-time :time="item.createdAt"></display-time>
							</span>
						</v-list-item-subtitle>

						<v-list-item-title
							v-if="!item.edit"
							class="black--text white-space mt-4"
						>
							{{ item.comment }} || {{ item.no }}
							<span
								v-if="newCheck(item.updatedAt, 'minutes', 10)"
								class="error--text caption"
							>
								new
							</span>
						</v-list-item-title>

						<v-list-item-subtitle v-else class="d-flex align-center pt-4">
							<v-avatar size="32" class="mr-4">
								<v-img :src="item.user.photoURL"></v-img>
							</v-avatar>
							<v-textarea
								v-model="item.comment"
								label="댓글수정"
								placeholder="Ctrl + Enter로 작성 가능"
								@keypress.ctrl.enter="update(item)"
								hide-details
								auto-grow
								autofocus
								rows="1"
								clearable
								dense
							>
							</v-textarea>
							<v-btn text small color="success"> send </v-btn>
						</v-list-item-subtitle>

						<v-list-item-title class="d-flex align-center mt-2 body-1">
							<v-list-item-action-text class="mr-2">
								<v-icon
									small
									@click="like(item)"
									:color="liked(item) ? 'error' : ''"
								>
									mdi-heart
								</v-icon>

								{{ item.likeCount }}
							</v-list-item-action-text>
							<v-list-item-action-text>
								<v-btn
									text
									small
									class="grey--text"
									@click="item.replyEdit = !item.replyEdit"
								>
									답글달기
								</v-btn>
							</v-list-item-action-text>
						</v-list-item-title>

						<v-list-item-subtitle
							class="d-flex align-center pt-4"
							v-if="item.replyEdit"
						>
							<v-avatar size="32" class="mr-4">
								<v-img :src="item.user.photoURL"></v-img>
							</v-avatar>
							<v-textarea
								v-model="item.replyComment"
								label="답글작성"
								placeholder="Ctrl + Enter로 작성 가능"
								@keypress.ctrl.enter="saveReply(item)"
								hide-details
								auto-grow
								autofocus
								rows="1"
								clearable
								dense
							></v-textarea>
							<v-btn text small color="success" @click="saveReply(item)">
								send
							</v-btn>
						</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-action class="align-self-start">
						<v-menu offset-y left>
							<template v-slot:activator="{ on }">
								<v-btn icon small v-on="on">
									<v-icon> mdi-dots-vertical </v-icon>
								</v-btn>
							</template>

							<v-list class="pa-0">
								<v-btn
									block
									text
									tile
									color="red"
									@click="remove(item)"
									class="px-6"
								>
									Delete
								</v-btn>

								<v-btn
									block
									text
									tile
									@click="item.edit = !item.edit"
									:color="item.edit ? 'warning' : ''"
									v-if="fireUser && fireUser.uid === item.uid"
									class="px-6"
								>
									Edit
								</v-btn>
							</v-list>
						</v-menu>
					</v-list-item-action>
				</v-list-item>

				<v-list-item>
					<display-time :time="item.createdAt"></display-time>
				</v-list-item>
			</v-list-item-content>

			<v-divider :key="i" v-if="i < items.length - 1"></v-divider>
		</template>

		<v-list-item v-if="lastDoc && items.length < article.commentCount">
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
	</v-card>
</template>

<script>
import { last } from 'lodash'
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'
import newCheck from '@/util/newCheck'
const LIMIT = 5
const REPLY_LIMIT = 1000
export default {
	components: { DisplayTime, DisplayUser },
	props: ['article', 'docRef'],
	data() {
		return {
			comment: '',
			items: [],
			unsubscribe: null,
			lastDoc: null,
			loading: false,
			newCheck
		}
	},
	computed: {
		user() {
			return this.$store.state.user
		},
		fireUser() {
			return this.$store.state.fireUser
		}
	},
	watch: {
		docRef() {
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
					item.edit = false
					item.replyEdit = false
					item.replyComment = ''
					this.items.push(item)
				} else {
					findItem.comment = item.comment
					findItem.likeCount = item.likeCount
					findItem.likeUids = item.likeUids
					findItem.updatedAt = item.updatedAt.toDate()
					findItem.no = item.no
				}
			})
			this.items.sort((before, after) => before.no - after.no)
		},
		subscribe() {
			if (this.unsubscribe) this.unsubscribe()
			this.items = []
			this.unsubscribe = this.docRef
				.collection('comments')
				.orderBy('no', 'asc')
				.limit(LIMIT)
				.onSnapshot(sn => {
					if (sn.empty) {
						this.items = []
						return
					}
					this.snapshotToItems(sn)
				})
		},
		async more() {
			if (!this.lastDoc) throw Error('더이상 데이터가 없습니다')
			if (this.loading) return
			this.loading = true
			try {
				const sn = await this.docRef
					.collection('comments')
					.orderBy('no', 'asc')
					.startAfter(this.lastDoc)
					.limit(LIMIT)
					.get()
				this.snapshotToItems(sn)
			} finally {
				this.loading = false
			}
		},
		onIntersect(entries, observer, isIntersecting) {
			if (isIntersecting) this.more()
		},
		async save() {
			if (!this.fireUser) throw Error('로그인이 필요합니다')
			if (this.article.commentCount > 100)
				throw Error('댓글 개수 허용치를 넘었습니다')
			if (!this.comment) throw Error('내용을 작성해야 합니다')
			if (this.comment.length > 300) throw Error('문자 허용치를 넘었습니다')
			const doc = {
				createdAt: new Date(),
				updatedAt: new Date(),
				comment: this.comment,
				uid: this.fireUser.uid,
				user: {
					email: this.user.email,
					photoURL: this.user.photoURL,
					displayName: this.user.displayName
				},
				likeCount: 0,
				likeUids: [],
				no: this.article.commentCount * REPLY_LIMIT
			}
			const id = doc.createdAt.getTime().toString()
			await this.docRef.collection('comments').doc(id).set(doc)
			this.comment = ''
		},
		async saveReply(item) {
			if (!this.fireUser) throw Error('로그인이 필요합니다')
			if (this.article.commentCount > 100)
				throw Error('댓글 개수 허용치를 넘었습니다')
			if (!item.replyComment) throw Error('내용을 작성해야 합니다')
			if (item.replyComment.length > 300)
				throw Error('문자 허용치를 넘었습니다')
			const min = item.no
			const max = item.no + REPLY_LIMIT
			const rs = this.items.filter(el => {
				return el.no > min && el.no < max
			})
			let no = min + rs.length + 1
			if (rs.length) no = last(rs).no + 1
			const doc = {
				createdAt: new Date(),
				updatedAt: new Date(),
				comment: item.replyComment,
				uid: this.fireUser.uid,
				user: {
					email: this.user.email,
					photoURL: this.user.photoURL,
					displayName: this.user.displayName
				},
				likeCount: 0,
				likeUids: [],
				no: no
			}
			const id = doc.createdAt.getTime().toString()
			await this.docRef.collection('comments').doc(id).set(doc)
			item.replyComment = ''
			const findItem = this.items.find(el => id === el.id)
			if (findItem) return
			doc.id = id
			this.items.push(doc)
			this.items.sort((before, after) => {
				return before.no - after.no
			})
		},
		isReplay(item) {
			return item.no % REPLY_LIMIT
		},
		liked(item) {
			if (!this.fireUser) return false
			return item.likeUids.includes(this.fireUser.uid)
		},
		async like(comment) {
			if (!this.fireUser) throw Error('로그인이 필요합니다')
			if (this.liked(comment)) {
				await this.docRef
					.collection('comments')
					.doc(comment.id)
					.update({
						likeCount: this.$firebase.firestore.FieldValue.increment(-1),
						likeUids: this.$firebase.firestore.FieldValue.arrayRemove(
							this.fireUser.uid
						)
					})
			} else {
				await this.docRef
					.collection('comments')
					.doc(comment.id)
					.update({
						likeCount: this.$firebase.firestore.FieldValue.increment(1),
						likeUids: this.$firebase.firestore.FieldValue.arrayUnion(
							this.fireUser.uid
						)
					})
			}
			if (this.items.findIndex(el => el.id === comment.id) < LIMIT) return
			const doc = await this.docRef.collection('comments').doc(comment.id).get()
			const item = doc.data()
			comment.comment = item.comment
			comment.likeCount = item.likeCount
			comment.likeUids = item.likeUids
		},
		async remove(comment) {
			await this.docRef.collection('comments').doc(comment.id).delete()
			const i = this.items.findIndex(el => el.id === comment.id)
			this.items.splice(i, 1)
		},
		async update(item) {
			const doc = {
				updatedAt: new Date(),
				comment: item.replyComment
			}
			try {
				await this.docRef.collection('comments').doc(item.id).update(doc)
			} finally {
				item.edit = false
				item.replyEdit = false
				item.replyComment = ''
			}
		}
	}
}
</script>
