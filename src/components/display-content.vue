<template>
	<v-card>
		<v-toolbar color="primary" dark>
			<v-toolbar-title>
				{{ item.title }}
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon @click="articleWrite">
				<v-icon>mdi-square-edit-outline</v-icon>
			</v-btn>
			<v-btn icon @click="$emit('close')">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>

		<v-card-text>
			<viewer v-if="content" :initialValue="content"></viewer>
			<v-container v-else>
				<v-row justify="center" align="center">
					<v-progress-circular indeterminate></v-progress-circular>
				</v-row>
			</v-container>
		</v-card-text>

		<v-card-actions>
			<v-spacer />
			<span class="font-italic caption">
				작성일: <display-time :time="item.createdAt"></display-time>
			</span>
		</v-card-actions>

		<v-card-actions>
			<v-spacer />
			<span class="font-italic caption">
				수정일: <display-time :time="item.updatedAt"></display-time>
			</span>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from 'axios'
import DisplayTime from '@/components/display-time'

export default {
	components: { DisplayTime },
	props: ['document', 'item'],
	data() {
		return {
			content: ''
		}
	},
	mounted() {
		console.log('mounted')
		this.fetch()
	},
	methods: {
		async fetch() {
			const r = await axios.get(this.item.url)
			this.content = r.data
			await this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
				.collection('articles')
				.doc(this.item.id)
				.update({
					readCount: this.$firebase.firestore.FieldValue.increment(1)
				})
		},
		async articleWrite() {
			this.$router.push({
				path: this.$route.path + '/article-write',
				query: { articleId: this.item.id }
			})
		}
	}
}
</script>
