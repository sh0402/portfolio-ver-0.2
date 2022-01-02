<template>
	<v-footer padless :footer="footer">
		<v-card flat tile color="transparent" class="text-center py-4" width="100%">
			<v-card-subtitle>
				Copyright © {{ new Date().getFullYear() }} All right reserved | make by
				<strong>{{ footer }}</strong>
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
						<!-- <v-btn small text @click="dialog = false" color="error" class="pa-0">
							close
						</v-btn> -->
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
