<template>
	<v-container style="max-width: 1200px" fluid v-if="!loaded">
		<v-skeleton-loader type="article"></v-skeleton-loader>
	</v-container>

	<v-container style="max-width: 1200px" fluid v-else-if="loaded && !article">
		<v-alert type="warning" border="left">게시물이 없습니다</v-alert>
	</v-container>

	<v-container style="max-width: 1200px" fluid v-else>
		<v-card v-if="article">
			<v-toolbar flat>
				<v-btn icon>
					<v-icon @click="back"> mdi-chevron-left </v-icon>
				</v-btn>

				<v-btn
					color="primary"
					small
					depressed
					outlined
					class="mr-4"
					@click="goCategory"
				>
					{{ article.category }}
					<v-icon small right v-if="!category">mdi-chevron-right </v-icon>
				</v-btn>

				<!-- <template>
					<v-icon color="red" left v-if="newCheck(article.updatedAt)">
						mdi-fire
					</v-icon>
					<span v-text="article.title"></span>
				</template> -->
			</v-toolbar>

			<v-divider />

			<v-toolbar color="transparent" flat two-line>
				<v-list-item-avatar size="30">
					<v-img :src="article.user.photoURL"></v-img>
				</v-list-item-avatar>

				<v-list-item two-line class="pa-0">
					<v-list-item-content>
						<v-list-item-title class="text--primary body-1">
							<display-title :item="article"></display-title>
						</v-list-item-title>

						<v-list-item-subtitle>
							{{ article.user.displayName }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-spacer />

				<template
					v-if="
						(fireUser && fireUser.uid === article.uid) ||
						(user && user.level === 0)
					"
				>
					<v-btn @click="dialog = true" icon>
						<v-icon>mdi-dots-horizontal</v-icon>
					</v-btn>
				</template>
			</v-toolbar>

			<v-dialog v-model="dialog" width="300">
				<v-card>
					<v-btn @click="remove" block text tile color="red"> Delete </v-btn>
					<v-btn @click="articleWrite" block text tile> Edit </v-btn>
					<v-btn @click="dialog = false" block text tile> Cancle </v-btn>
				</v-card>
			</v-dialog>

			<v-divider />

			<v-card-text>
				<viewer
					ref="viewer"
					v-if="content"
					:initialValue="content"
					@load="onEditorLoad"
				></viewer>
				<v-container v-else>
					<v-row justify="center" align="center">
						<v-progress-circular indeterminate></v-progress-circular>
					</v-row>
				</v-container>

				<v-divider />
			</v-card-text>

			<v-card-actions class="pa-4">
				<v-chip
					small
					outlined
					label
					v-for="tag in article.tags"
					:key="tag"
					v-text="tag"
					color="info"
					class="mr-2"
				></v-chip>
			</v-card-actions>

			<v-card-actions>
				<v-sheet class="mr-4">
					<v-btn icon @click="like">
						<v-icon small v-if="!liked">mdi-heart-outline</v-icon>
						<v-icon small color="red" v-else>mdi-heart</v-icon>
					</v-btn>
					<span>{{ article.likeCount }}</span>
				</v-sheet>

				<v-sheet color="grey--text grey-lighten-1" class="mr-4">
					<span class="body-2">조회수 : {{ article.readCount }}회</span>
				</v-sheet>

				<v-sheet color="grey--text grey-lighten-1" class="mr-4">
					<span class="body-2">
						작성일: <display-time :time="article.createdAt"></display-time>
					</span>
				</v-sheet>
			</v-card-actions>

			<v-divider />

			<v-card-actions class="py-0">
				<v-row no-gutters>
					<v-col cols="4">
						<v-btn block text color="grey" @click="go(-1)"
							><v-icon left>mdi-menu-left</v-icon> 이전</v-btn
						>
					</v-col>

					<v-col cols="4" class="d-flex">
						<v-divider vertical></v-divider>
						<v-btn block text color="grey" @click="back"
							><v-icon left>mdi-format-list-bulleted-square</v-icon> 목록</v-btn
						>
						<v-divider vertical></v-divider>
					</v-col>

					<v-col cols="4">
						<v-btn block text color="grey" @click="go(1)"
							><v-icon left>mdi-menu-right</v-icon> 다음</v-btn
						>
					</v-col>
				</v-row>
			</v-card-actions>

			<v-divider />

			<display-comment :article="article" :docRef="ref"></display-comment>
		</v-card>

		<v-card v-else>
			<v-container>
				<v-row justify="center" align="center">
					<v-progress-circular indeterminate></v-progress-circular>
				</v-row>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
import axios from 'axios'
import DisplayTime from '@/components/display-time'
import DisplayComment from '@/components/display-comment'
import DisplayTitle from '@/components/display-title'
import newCheck from '@/util/newCheck'
import addYoutubeIframe from '@/util/addYoutubeIframe'

export default {
	components: { DisplayTime, DisplayComment, DisplayTitle },
	props: ['boardId', 'action', 'articleId', 'category', 'tag'],
	data() {
		return {
			content: '',
			ref: null,
			unsubscribe: null,
			article: null,
			doc: null,
			dialog: false,
			newCheck,
			loaded: false,
			html: ''
		}
	},
	computed: {
		user() {
			return this.$store.state.user
		},
		fireUser() {
			return this.$store.state.fireUser
		},
		liked() {
			if (!this.fireUser) return false
			return this.article.likeUids.includes(this.fireUser.uid)
		}
	},
	watch: {
		boardId() {
			this.subscribe()
		},
		articleId() {
			this.subscribe()
		},
		action() {
			this.subscribe()
		}
	},
	async created() {
		this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
	},
	methods: {
		subscribe() {
			window.scrollTo(0, 0)
			if (this.unsubscribe) this.unsubscribe()
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.boardId)
				.collection('articles')
				.doc(this.articleId)
			this.ref.update({
				readCount: this.$firebase.firestore.FieldValue.increment(1)
			})
			this.loaded = false
			this.unsubscribe = this.ref.onSnapshot(doc => {
				this.loaded = true
				if (!doc.exists) {
					this.back()
					return
				}
				this.doc = doc
				const item = doc.data()
				item.createdAt = item.createdAt.toDate()
				item.updatedAt = item.updatedAt.toDate()
				if (!this.article || this.article.url !== item.url) this.fetch(item.url)
				this.article = item
			}, console.error)
		},
		async fetch(url) {
			this.content = ''
			const r = await axios.get(url)
			const html = typeof r.data === 'string' ? r.data : r.data.toString()
			this.content = html
		},
		onEditorLoad(v) {
			const el = v.preview.el
			this.html = addYoutubeIframe(el, this.$vuetify.breakpoint)
		},
		async articleWrite() {
			this.$router.push({ path: this.$route.path, query: { action: 'write' } })
		},
		async remove() {
			await this.ref.delete()
		},
		back() {
			const us = this.$route.path.split('/')
			us.pop()
			if (this.category)
				this.$router.push({
					path: us.join('/'),
					query: { category: this.category }
				})
			else this.$router.push({ path: us.join('/') })
		},
		async like() {
			if (!this.fireUser) throw Error('로그인이 필요합니다')
			if (this.liked) {
				await this.ref.update({
					likeCount: this.$firebase.firestore.FieldValue.increment(-1),
					likeUids: this.$firebase.firestore.FieldValue.arrayRemove(
						this.fireUser.uid
					)
				})
			} else {
				await this.ref.update({
					likeCount: this.$firebase.firestore.FieldValue.increment(1),
					likeUids: this.$firebase.firestore.FieldValue.arrayUnion(
						this.fireUser.uid
					)
				})
			}
		},
		async go(arrow) {
			if (!this.doc) return
			let ref
			if (!this.category) {
				ref = this.$firebase
					.firestore()
					.collection('boards')
					.doc(this.boardId)
					.collection('articles')
					.orderBy('createdAt', 'desc')
			} else {
				ref = this.$firebase
					.firestore()
					.collection('boards')
					.doc(this.boardId)
					.collection('articles')
					.where('category', '==', this.category)
					.orderBy('createdAt', 'desc')
			}
			let sn
			if (arrow < 0) sn = await ref.endBefore(this.doc).limitToLast(1).get()
			else sn = await ref.startAfter(this.doc).limit(1).get()

			if (sn.empty) return this.$toast.info('더이상 페이지가 없습니다')
			const doc = sn.docs[0]

			const us = this.$route.path.split('/')
			us.pop()
			us.push(doc.id)
			if (this.category)
				this.$router.push({
					path: us.join('/'),
					query: { category: this.category }
				})
			else this.$router.push({ path: us.join('/') })
		},
		goCategory() {
			const us = this.$route.path.split('/')
			us.pop()
			this.$router.push({
				path: us.join('/'),
				query: { category: this.$article.category }
			})
		}
	}
}
</script>
