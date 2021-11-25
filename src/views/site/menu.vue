<template>
	<div>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="title" v-text="title"></v-list-item-title>
				<v-list-item-subtitle>version 0.0.1</v-list-item-subtitle>
			</v-list-item-content>
			<v-btn icon @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-list-item>

		<v-divider />

		<v-list>
			<v-list-item v-for="item in items" :key="item.title" :to="item.to">
				<v-list-item-content>
					<v-list-item-title v-text="item.title"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn icon @click="openDialogItem(i)">
						<v-icon>mdi-square-edit-outline</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>

			<v-list-item @click="openDialogItem(-1)">
				<v-list-item-content>
					<v-list-item-title class="text-button">Add</v-list-item-title>
				</v-list-item-content>

				<v-spacer></v-spacer>

				<v-list-item-icon>
					<v-icon> mdi-plus-box </v-icon>
				</v-list-item-icon>
			</v-list-item>
		</v-list>

		<v-dialog v-model="dialogItem" max-width="600" width="100%">
			<v-card>
				<v-card-title>
					수정하기
					<v-spacer></v-spacer>

					<v-btn color="success" @click="saveItem" text> Create </v-btn>
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
	props: ['title', 'items'],
	data() {
		return {
			dialogItem: false,
			formItem: {
				icon: '',
				title: ''
			},
			selectedItemIndex: -1
		}
	},
	methods: {
		close() {
			this.$emit('closeDrawer')
		},
		openDialogItem(index) {
			this.selectedItemIndex = index
			this.dialogItem = true
			if (index < 0) {
				this.formItem.title = ''
			} else {
				this.formItem.title = this.items[index].title
			}
		}
		// saveItem() {
		// 	if (this.selectedItemIndex < 0) {
		// 		// eslint-disable-next-line vue/no-mutating-props
		// 		this.items.push(this.formItem)
		// 	} else {
		// 		// eslint-disable-next-line vue/no-mutating-props
		// 		this.items[this.selectedItemIndex] = this.formItem
		// 	}
		// 	this.dialogItem = false
		// }
	}
}
</script>
