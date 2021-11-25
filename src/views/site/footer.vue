<template>
	<v-footer app color="white" absolute :footer="footer">
		<v-spacer></v-spacer>

		<div>&copy; {{ new Date().getFullYear() + ' ' + footer }}</div>

		<v-btn icon @click="openDialog">
			<v-icon>mdi-square-edit-outline</v-icon>
		</v-btn>

		<v-dialog v-model="dialog" max-width="400" width="100%">
			<v-card>
				<v-card-title>제목 수정</v-card-title>

				<v-card-text>
					<v-text-field
						outlined
						label="제목"
						v-model="text"
						@keypress.enter="save"
					>
					</v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-footer>
</template>

<script>
export default {
	props: ['footer'],
	data() {
		return {
			dialog: false,
			text: this.footer
		}
	},
	methods: {
		openDialog() {
			this.dialog = true
		},
		async save() {
			try {
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.update({ footer: this.text })
			} catch (e) {
				console.error(e.message)
			} finally {
				alert('Save Success!')
				this.dialog = false
			}
		}
	}
}
</script>

<style></style>
