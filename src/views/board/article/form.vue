<template>
	<v-container style="max-width: 1200px" fluid>
		<v-form>
			<v-card :loading="loading">
				<v-toolbar color="accent" dense flat dark>
					<v-toolbar-title>게시판 글 작성</v-toolbar-title>

					<v-spacer />

					<v-btn text @click="$router.push('/board/' + document)">back</v-btn>
					<v-btn text @click="save">save</v-btn>
				</v-toolbar>

				<v-card-text>
					<v-text-field
						v-model="form.title"
						label="제목"
						outlined
					></v-text-field>
					<editor :initialValue="form.content" ref="editor"></editor>
					<!-- <v-textarea
						v-model="form.description"
						label="설명"
						outlined
					></v-textarea> -->
				</v-card-text>
			</v-card>
		</v-form>
	</v-container>
</template>

<script>
export default {
	props: ['document', 'action'],
	data() {
		return {
			unsubscribe: null,
			form: {
				title: '',
				content: ''
			},
			exists: false,
			loading: false,
			ref: null
		}
	},
	computed: {
		articleId() {
			return this.$route.query.articleId
		}
	},
	watch: {
		document() {
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
		subscribe() {
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
			console.log(this.articleId)
			if (!this.articleId) return
			if (this.unsubscribe) this.unsubscribe()

			this.unsubscribe = this.ref
				.collection('articles')
				.doc(this.articleId)
				.onSnapshot(doc => {
					this.exists = doc.exists
					if (this.exists) {
						const item = doc.data()
						this.form.title = item.title
					}
				})
		},
		async save() {
			this.loading = true
			try {
				const createdAt = new Date()
				const id = createdAt.getTime().toString()
				const md = this.$refs.editor.invoke('getMarkdown')
				const sn = await this.$firebase
					.storage()
					.ref()
					.child('boards')
					.child(this.document)
					.child(id + '.md')
					.putString(md)
				const url = await sn.ref.getDownloadURL()
				const doc = {
					title: this.form.title,
					updatedAt: createdAt,
					url: url
				}

				const batch = await this.$firebase.firestore().batch()

				if (!this.articleId) {
					doc.createdAt = createdAt
					doc.commantCount = 0
					batch.set(this.ref.collection('articles').doc(id), doc)
					batch.update(this.ref, {
						count: this.$firebase.firestore.FieldValue.increment(1)
					})
				} else {
					batch.update(this.ref.collection('articles').doc(this.articleId), doc)
				}
				await batch.commit()
			} finally {
				this.loading = false
				this.$router.push('/board/' + this.document)
			}
		}
	}
}
</script>
