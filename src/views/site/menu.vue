<template>
	<div>
		<v-list-item class="py-2">
			<v-list-item-content>
				<v-list-item-title class="title" v-text="title"></v-list-item-title>
				<v-list-item-subtitle> subtext </v-list-item-subtitle>
			</v-list-item-content>

			<v-btn
				icon
				@click="
					$store.commit(
						'setEdit',
						($store.state.editable = !$store.state.editable)
					)
				"
			>
				<v-icon>mdi-cog</v-icon>
			</v-btn>
			<v-btn icon @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-list-item>

		<v-divider></v-divider>

		<v-list flat>
			<v-list-item to="/">
				<v-list-item-icon>
					<v-icon>mdi-home</v-icon>
				</v-list-item-icon>

				<v-list-item-title>Home</v-list-item-title>
			</v-list-item>

			<v-list-group
				v-for="(item, i) in items"
				:key="i"
				v-model="item.active"
				:prepend-icon="item.icon"
				no-action
			>
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title>
							{{ item.title }}
							<span v-if="!$store.state.editable">
								<v-btn icon @click="openDialogItem(i)">
									<v-icon>mdi-square-edit-outline</v-icon>
								</v-btn>
							</span>
							<span v-if="!$store.state.editable">
								<v-btn icon @click="removeItem(items, i)">
									<v-icon>mdi-delete-circle</v-icon>
								</v-btn>
							</span>
						</v-list-item-title>
					</v-list-item-content>
				</template>

				<v-list-item
					v-for="(subItem, j) in item.subItems"
					:key="j"
					:to="!$store.state.editable ? null : subItem.to"
				>
					<v-list-item-content>
						<v-list-item-title>
							<v-icon>mdi-menu-right</v-icon>
							{{ subItem.title }}

							<span v-if="!$store.state.editable">
								<v-btn icon @click="openDialogSubItem(i, j)">
									<v-icon>mdi-square-edit-outline</v-icon>
								</v-btn>
								<v-btn icon @click="removeItem(item.subItems, i)">
									<v-icon>mdi-delete-circle</v-icon>
								</v-btn>
							</span>
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item
					@click="openDialogSubItem(i, -1)"
					v-if="!$store.state.editable"
				>
					<v-list-item-icon>
						<v-icon>mdi-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>컨텐츠 추가하기</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>

			<v-list-item @click="openDialogItem(-1)" v-if="!$store.state.editable">
				<v-list-item-icon><v-icon>mdi-plus</v-icon></v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>메뉴 추가하기</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-dialog v-model="dialogItem" max-width="400" width="100%">
			<v-card>
				<v-card-title>
					Menu Edit
					<v-spacer />
					<v-btn text color="success" @click="saveItem">save</v-btn>
					<v-btn @click="dialogItem = false" icon>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-row class="align-baseline">
						<v-col cols="2" class="text-center">
							<v-icon v-text="formItem.icon" required></v-icon>
						</v-col>

						<v-col cols="10">
							<v-text-field
								v-model="formItem.icon"
								label="mdi-icon"
								outlined
								clearable
								required
							></v-text-field>
						</v-col>
					</v-row>

					<v-text-field
						v-model="formItem.title"
						label="Menu Name"
						outlined
						hide-details
					></v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="dialogSubItem" max-width="400" width="100%">
			<v-card>
				<v-card-title>
					서브 아이템 수정
					<v-spacer />
					<v-btn text color="success" @click="saveSubItem">save</v-btn>
					<v-btn @click="dialogItem = false" icon>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-text-field
						v-model="formSubItem.title"
						label="Content Name"
						outlined
						required
					></v-text-field>
					<v-text-field
						v-model="formSubItem.to"
						label="URL"
						outlined
						required
						hide-details
					></v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ['items', 'title'],
	data() {
		return {
			loading: false,
			dialogItem: false,
			dialogSubItem: false,
			selectedItemIndex: 0,
			selectedSubItemIndex: 0,
			formItem: {
				icon: 'mdi-emoticon',
				title: ''
			},
			formSubItem: {
				title: '',
				to: ''
			}
		}
	},
	methods: {
		close() {
			this.$emit('drawer')
		},
		async save() {
			try {
				this.loading = true
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.child('menu')
					.set(this.items)
			} finally {
				this.dialogItem = false
				this.dialogSubItem = false
				this.loading = false
			}
		},
		openDialogItem(index) {
			this.selectedItemIndex = index
			if (index < 0) {
				this.formItem.icon = 'mdi-emoticon'
				this.formItem.title = ''
			} else {
				this.formItem.icon = this.items[index].icon
				this.formItem.title = this.items[index].title
			}
			this.dialogItem = true
		},
		async saveItem() {
			// eslint-disable-next-line vue/no-mutating-props
			if (this.selectedItemIndex < 0) this.items.push(this.formItem)
			else {
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].icon = this.formItem.icon
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].title = this.formItem.title
			}
			this.save()
		},
		openDialogSubItem(index, subIndex) {
			this.selectedItemIndex = index
			this.selectedSubItemIndex = subIndex
			if (subIndex < 0) {
				this.formSubItem.title = ''
				this.formSubItem.to = ''
			} else {
				this.formSubItem.title = this.items[index].subItems[subIndex].title
				this.formSubItem.to = this.items[index].subItems[subIndex].to
			}
			this.dialogSubItem = true
		},
		async saveSubItem() {
			if (this.selectedSubItemIndex < 0) {
				if (!this.items[this.selectedItemIndex].subItems)
					// eslint-disable-next-line vue/no-mutating-props
					this.items[this.selectedItemIndex].subItems = []
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].subItems.push({
					title: this.formSubItem.title,
					to: this.formSubItem.to
				})
			} else {
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].subItems[
					this.selectedSubItemIndex
				].title = this.formSubItem.title
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].subItems[
					this.selectedSubItemIndex
				].to = this.formSubItem.to
			}
			this.save()
		},
		removeItem(items, i) {
			items.splice(i, 1)
			this.save()
		}
	}
}
</script>
