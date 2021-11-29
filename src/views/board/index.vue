<template>
	<v-container style="max-width: 1200px" fluid>
		<v-card>
			<v-card-title>Board Test</v-card-title>

			<v-data-table :headers="headers" :items="items" :items-per-page="5">
				<template v-slot:item.id="{ item }">
					<v-btn icon @click="openDialog(item)">
						<v-icon>mdi-square-edit-outline</v-icon>
					</v-btn>
					<v-btn icon @click="remove(item)">
						<v-icon>mdi-delete-circle</v-icon>
					</v-btn>
				</template>
			</v-data-table>

			<v-card-actions>
				<v-btn color="" @click="openDialog(null)"> write </v-btn>
			</v-card-actions>
			<v-dialog v-model="dialog" max-width="600" width="100%">
				<v-card>
					<v-form>
						<v-card-text>
							<v-text-field v-model="form.title"></v-text-field>
							<v-text-field v-model="form.content"></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn @click="update" v-if="selectedItem">save</v-btn>
							<v-btn @click="add" v-else>save</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-dialog>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{ value: 'title', text: 'title' },
				{ value: 'content', text: 'content' },
				{ value: 'id', text: 'id' }
			],
			items: [],
			form: {
				title: '',
				content: ''
			},
			dialog: false,
			selectedItem: null,
			unsubscribe: null
		}
	},
	created() {
		// this.read()
		this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
	},
	methods: {
		subscribe() {
			this.unsubscribe = this.$firebase
				.firestore()
				.collection('boards')
				.onSnapshot(sn => {
					if (sn.empty) {
						this.items = []
						return
					}
					this.items = sn.docs.map(v => {
						const item = v.data()
						return {
							id: v.id,
							title: item.title,
							content: item.content
						}
					})
				})
		},
		openDialog(item) {
			this.selectedItem = item
			this.dialog = true
			if (!item) {
				;(this.form.title = ''), (this.form.content = '')
			} else {
				;(this.form.title = item.title), (this.form.content = item.content)
			}
		},
		add() {
			this.$firebase.firestore().collection('boards').add(this.form)
			this.dialog = false
		},
		update() {
			this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.selectedItem.id)
				.update(this.form)
			this.dialog = false
		},
		async read() {
			const sn = await this.$firebase.firestore().collection('boards').get()
			// if(sn.)
			// sn.docs.forEach(v => {
			// 	console.log(v.id)
			// 	console.log(v.data())
			// })
			this.items = sn.docs.map(v => {
				const item = v.data()
				return {
					id: v.id,
					title: item.title,
					content: item.content
				}
			})
			// console.log(this.items)
		},
		remove(item) {
			this.$firebase.firestore().collection('boards').doc(item.id).delete()
		}
	}
}
</script>
