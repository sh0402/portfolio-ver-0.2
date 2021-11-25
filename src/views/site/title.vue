<template>
	<v-toolbar-title class="pr-4">
		{{ title }}
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
	</v-toolbar-title>
</template>

<script>
export default {
	props: ['title'],
	data() {
		return {
			dialog: false,
			text: this.title
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
					.update({ title: this.text })
			} finally {
				this.dialog = false
			}
		}
	}
}
</script>

<style></style>
