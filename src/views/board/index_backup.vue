<template>
	<v-container style="max-width: 1200px" fluid>
		<v-card>
			<v-card-title>Board Test</v-card-title>

			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="5"
				:options.sync="options"
				:server-items-length="serverItemsLength"
				must-sort
			>
				<template v-slot:item.id="{ item }">
					<v-btn icon @click="openDialog(item)">
						<v-icon>mdi-square-edit-outline</v-icon>
					</v-btn>
					<v-btn icon @click="remove(item)">
						<v-icon>mdi-delete-circle</v-icon>
					</v-btn>
				</template>

				<template v-slot:item.createdAt="{ item }">
					{{ item.createdAt.toLocaleString() }}
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
import { head, last } from 'lodash'

export default {
	data() {
		return {
			headers: [
				{ value: 'createdAt', text: '작성일' },
				{ value: 'title', text: '제목' },
				{ value: 'content', text: '내용' },
				{ value: 'id', text: 'id', sortable: false }
			],
			items: [],
			form: {
				title: '',
				content: ''
			},
			dialog: false,
			selectedItem: null,
			unsubscribe: null,
			unsubscribeCount: null,
			options: {
				sortBy: ['createdAt'],
				sortDesc: [true]
			},
			serverItemsLength: 0,
			docs: []
		}
	},
	watch: {
		options: {
			handler(n, o) {
				const arrow = n.page - o.page
				this.subscribe(arrow)
			},
			deep: true
		}
	},
	created() {
		// this.read()
		// this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
		if (this.unsubscribeCount) this.unsubscribeCount()
	},
	methods: {
		subscribe(arrow) {
			this.unsubscribe = this.$firebase
				.firestore()
				.collection('meta')
				.doc('boards')
				.onSnapshot(doc => {
					if (!doc.exists) return
					this.serverItemsLength = doc.data().count
				})

			const order = head(this.options.sortBy)
			const sort = head(this.options.sortDesc) ? 'desc' : 'asc'
			const limit = this.options.itemsPerPage

			const ref = this.$firebase
				.firestore()
				.collection('boards')
				.orderBy(order, sort)
			let query

			switch (arrow) {
				case -1:
					query = ref.endBefore(head(this.docs)).limitToLast(limit)
					break

				case 1:
					query = ref.startAfter(last(this.docs)).limit(limit)
					break

				default:
					query = ref.limit(limit)
					break
			}

			this.unsubscribe = query.onSnapshot(sn => {
				if (sn.empty) {
					this.items = []
					return
				}
				this.docs = sn.docs
				// console.log(head(sn.docs).data())
				// console.log(last(sn.docs).data())
				this.items = sn.docs.map(v => {
					const item = v.data()
					return {
						id: v.id,
						title: item.title,
						content: item.content,
						createdAt: item.createdAt.toDate()
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
			const item = {}
			Object.assign(item, this.form)
			item.createdAt = new Date()
			this.$firebase.firestore().collection('boards').add(item)
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
