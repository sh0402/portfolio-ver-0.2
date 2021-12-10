<template>
	<v-container style="max-width: 1200px" fluid>
		<v-form>
			<v-card :loading="loading">
				<v-toolbar color="accent" dense flat dark>
					<v-toolbar-title>게시판 정보 작성</v-toolbar-title>

					<v-spacer />

					<v-btn text @click="$router.push('/board/' + boardId)">back</v-btn>
					<v-btn text @click="save" :disabled="!user">save</v-btn>
				</v-toolbar>

				<v-card-text>
					<v-text-field
						v-model="form.category"
						label="종류"
						outlined
					></v-text-field>
					<v-text-field
						v-model="form.title"
						label="제목"
						outlined
					></v-text-field>
					<v-textarea
						v-model="form.description"
						label="설명"
						outlined
					></v-textarea>
				</v-card-text>
			</v-card>
		</v-form>
	</v-container>
</template>

<script>
export default {
	props: ['boardId', 'action'],
	data() {
		return {
			form: {
				category: '',
				title: '',
				description: ''
			},
			exists: false,
			loading: false,
			ref: null
		}
	},
	watch: {
		boardId() {
			this.fetch()
		}
	},
	created() {
		this.fetch()
	},
	methods: {
		async fetch() {
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.boardId)
			const doc = await this.ref.get()
			this.exists = doc.exists
			if (this.exists) {
				const item = doc.data()
				this.form.category = item.category
				this.form.title = item.title
				this.form.description = item.description
			}
		},
		async save() {
			if (!this.$store.state.fireUser) throw Error('로그인이 필요합니다')
			if (!this.form.category || !this.form.title)
				throw Error('종류 제목은 필수 항목입니다')
			const form = {
				category: this.form.category,
				title: this.form.title,
				description: this.form.description,
				updatedAt: new Date()
			}
			this.loading = true
			try {
				if (!this.exists) {
					form.createdAt = new Date()
					form.count = 0
					form.uid = this.$store.state.fireUser.uid
					form.user = {
						email: this.$store.state.user.email,
						photoURL: this.$store.state.user.photoURL,
						displayName: this.$store.state.user.displayName
					}
					form.categories = ['일반']
					form.tags = ['vue', 'firebase']
					await this.ref.set(form)
				} else {
					await this.ref.update(form)
				}
				this.$router.push('/board/' + this.boardId)
			} finally {
				this.loading = false
			}
		}
	}
}
</script>
