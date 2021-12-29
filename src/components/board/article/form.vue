<template>
	<v-container style="max-width: 1200px" fluid v-if="!loaded">
		<v-skeleton-loader type="article"></v-skeleton-loader>
	</v-container>

	<v-container style="max-width: 1200px" fluid v-else-if="loaded && !board">
		<v-alert type="warning" border="left">
			게시판 정보를 불러오지 못했습니다
		</v-alert>
	</v-container>

	<v-container style="max-width: 1200px" fluid v-else>
		<form-normal
			v-if="board.type === '일반'"
			:boardId="boardId"
			:articleId="articleId"
			:action="action"
			:board="board"
		></form-normal>
		<form-gallery
			v-else
			:boardId="boardId"
			:articleId="articleId"
			:action="action"
			:board="board"
		></form-gallery>
	</v-container>
</template>

<script>
import FormNormal from './components/form-normal.vue'
import FormGallery from './components/form-gallery.vue'

export default {
	components: { FormNormal, FormGallery },
	props: ['boardId', 'articleId', 'action'],
	data() {
		return {
			board: null,
			loading: false,
			loaded: false
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
		boardId() {
			this.fetch()
		},
		articleId() {
			this.fetch()
		},
		action() {
			this.fetch()
		}
	},
	created() {
		this.fetch()
	},
	mounted() {},
	destroyed() {},
	methods: {
		async fetch() {
			this.board = null
			const ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.boardId)
			this.loaded = false
			const doc = await ref.get()
			this.loaded = true
			if (doc.exists) this.board = doc.data()
		}
	}
}
</script>
