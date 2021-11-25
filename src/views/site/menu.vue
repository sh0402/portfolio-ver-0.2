<template>
	<div>
		<v-toolbar
			id="toolbar-mo"
			color="transparent"
			class="font-weight-bold"
			justify-end
			flat
		>
			<v-toolbar-title class="pr-4"> Soot's Portfoilo </v-toolbar-title>

			<span class="caption">ver.0.0.1</span>

			<v-spacer></v-spacer>

			<v-btn icon @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>

		<v-divider />

		<v-list>
			<v-list-item
				v-model="item.active"
				v-for="item in items"
				:key="item.a"
				:to="item.to"
			>
				<!-- <v-list-item-avatar>
						<v-icon>{{ menu.icon }}</v-icon>
					</v-list-item-avatar> -->
				<v-list-item-content>
					<v-list-item-title>
						{{ item.title }}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item @click="openDialogItem(-1)">
				<v-list-item-icon>
					<v-icon> mdi-plus </v-icon>
				</v-list-item-icon>
				<v-list-item-content> menu add </v-list-item-content>
			</v-list-item>
		</v-list>

		<v-dialog v-model="dialogItem" max-width="600" width="100%">
			<v-card>
				<v-card-title>
					수정하기
					<v-spacer></v-spacer>

					<v-btn icon @click="saveItem">
						<v-icon>mdi-check</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-text-field v-model="formItem.title"></v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ['items'],
	data() {
		return {
			dialogItem: false,
			formItem: {
				icon: '',
				title: ''
			}
		}
	},
	methods: {
		close() {
			this.$emit('closeDrawer')
		},
		// eslint-disable-next-line no-unused-vars
		openDialogItem(index) {
			this.dialogItem = true
		},
		saveItem() {}
	}
}
</script>

<style></style>
