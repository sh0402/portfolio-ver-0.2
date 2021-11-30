<template>
	<div>
		<v-list-item>
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
			<v-list-item-group color="primary">
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="!$store.state.editable ? null : item.to"
					v-model="item.active"
					no-action
				>
					<v-list-item-icon class="py-1">
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>
							{{ item.title }}
							<span v-if="!$store.state.editable">
								<v-btn icon @click="removeItem(items, i)">
									<v-icon>mdi-delete-circle</v-icon>
								</v-btn>
							</span>
						</v-list-item-title>
					</v-list-item-content>

					<v-list-item-action v-if="!$store.state.editable">
						<v-btn @click="openDialogItem(i, -1)" icon>
							<v-icon>mdi-square-edit-outline</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-list-item-group>

			<v-list-item @click="openDialogItem(-1)">
				<v-list-item-icon>
					<v-icon>mdi-plus</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>메뉴 추가하기</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-dialog v-model="dialogItem" max-width="400" width="100%">
			<v-card>
				<v-card-title>
					수정하기
					<v-spacer />
					<v-btn text color="success" @click="saveItem">save</v-btn>
					<v-btn @click="dialogItem = false" icon>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-row align="center">
						<v-col cols="2" class="text-center">
							<v-icon v-text="formItem.icon" required></v-icon>
						</v-col>
						<v-col cols="10">
							<v-text-field
								v-model="formItem.icon"
								label="mdi icon"
								outlined
								clearable
								required
								hide-details=""
							></v-text-field>
						</v-col>
					</v-row>
				</v-card-text>
				<v-card-text>
					<v-text-field
						v-model="formItem.title"
						label="menu name"
					></v-text-field>
					<v-text-field v-model="formItem.to" label="url"> </v-text-field>
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
			// dialogSubItem: false,
			formItem: {
				title: '',
				to: '',
				icon: 'mdi-emoticon'
			},
			selectedItemIndex: 0,
			seletedItem: 0
		}
	},
	methods: {
		close() {
			this.$emit('drawer')
		},
		async save() {
			try {
				this.loading = true //new
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.child('menu') //new
					.set(this.items)
			} finally {
				this.dialogItem = false
				this.loading = false //new
			}
		},
		openDialogItem(index) {
			this.selectedItemIndex = index
			if (index < 0) {
				this.formItem.title = ''
				this.formItem.to = ''
			} else {
				this.formItem.title = this.items[index].title
				this.formItem.to = this.items[index].to
				this.formItem.icon = this.items[index].icon
			}
			this.dialogItem = true
		},
		saveItem() {
			if (this.selectedItemIndex < 0) {
				// eslint-disable-next-line vue/no-mutating-props
				this.items.push(this.formItem)
			} else {
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].title = this.formItem.title
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].to = this.formItem.to
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].icon = this.formItem.icon
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
