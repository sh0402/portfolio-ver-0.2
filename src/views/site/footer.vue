<template>
	<v-footer app color="primary" dark absolute :footer="footer">
		<v-spacer></v-spacer>

		<div>&copy; {{ new Date().getFullYear() + ' ' + footer }}</div>

		<v-btn icon @click="openDialog">
			<v-icon>mdi-square-edit-outline</v-icon>
		</v-btn>

		<v-dialog v-model="dialog" max-width="400" width="100%">
			<v-card>
				<v-card-title class="title">
					제목 수정

					<v-spacer />

					<v-btn @click="save" color="success" text> save </v-btn>
					<v-btn icon @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-text-field
						v-model="text"
						outlined
						label="제목"
						@keypress.enter="save"
						hide-details
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
			} finally {
				this.dialog = false
			}
		}
	}
}
</script>

<style></style>
