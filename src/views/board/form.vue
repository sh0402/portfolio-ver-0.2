<template>
	<v-container style="max-width: 1200px" fluid>
		<v-form>
			<v-card :loading="loading">
				<v-toolbar color="accent" dense flat dark>
					<v-toolbar-title>게시판 정보 작성</v-toolbar-title>

					<v-spacer />

					<v-btn text @click="$router.push('/board/' + document)">back</v-btn>
					<v-btn text @click="save">save</v-btn>
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
	props: ['document', 'action'],
	data() {
		return {
			unsubscribe: null,
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
			if (this.unsubscribe) this.unsubscribe()
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
			this.unsubscribe = this.ref.onSnapshot(doc => {
				this.exists = doc.exists
				if (this.exists) {
					const item = doc.data()
					this.form.category = item.category
					this.form.title = item.title
					this.form.description = item.description
				}
			})
		},
		async save() {
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
					await this.ref.set(form)
				} else {
					this.ref.update(form)
				}
				this.$router.push('/board/' + this.document)
			} finally {
				this.loading = false
			}
		}
	}
}
</script>
