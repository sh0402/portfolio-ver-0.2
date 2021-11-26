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
			<v-list-group
				v-for="(item, i) in newItems.items"
				:key="i"
				v-model="item.active"
				:prepend-icon="item.icon"
				no-action
				mandatory
			>
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"></v-list-item-title>
					</v-list-item-content>

					<v-list-item-action>
						<v-btn icon @click="openDialogItem(i)">
							<v-icon>mdi-square-edit-outline</v-icon>
						</v-btn>
					</v-list-item-action>
				</template>

				<v-list-item
					v-for="(subItem, j) in item.subItems"
					:key="j"
					:to="subItem.to"
				>
					<v-list-item-content>
						<v-list-item-title v-text="subItem.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>

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

		<!-- MENU ADD -->
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
			dialogSubItem: false,
			formItem: {
				icon: '',
				title: ''
			},
			selectedItemIndex: -1,
			newItems: {}
		}
	},
	created() {
		this.newItems.items = this.items
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
		},
		saveItem() {
			if (this.selectedItemIndex < 0) {
				this.newItems.items.push(this.formItem)
			} else {
				this.newItems.items[this.selectedItemIndex] = this.formItem
			}
			this.save()
			this.dialogItem = false
		},
		async save() {
			try {
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.update({ menu: this.items })
			} finally {
				this.dialogItem = false
			}
		}
	}
}
</script>
