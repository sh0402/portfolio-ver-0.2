<template>
	<v-footer padless :footer="footer" class="justify-center">
		<v-card flat tile color="transparent" class="py-4">
			<v-card-subtitle>
				Copyright © {{ new Date().getFullYear() }} All right reserved | make by
				<span class="primary--text font-weight-black">{{ footer }}</span>
				<v-btn icon small v-if="$store.state.editable" @click="openDialog">
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</v-card-subtitle>

			<v-dialog v-model="dialog" max-width="300" width="500" class="pa-2">
				<v-card>
					<v-card-title class="justify-space-between">
						Footer Title
						<v-btn icon small @click="dialog = false">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-card-title>

					<v-card-text>
						<v-text-field v-model="text" label="제목"></v-text-field>
					</v-card-text>

					<v-card-title>
						<v-spacer />

						<v-btn small text @click="save" color="success"> save </v-btn>
					</v-card-title>
				</v-card>
			</v-dialog>
		</v-card>
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
			this.text = this.footer
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
