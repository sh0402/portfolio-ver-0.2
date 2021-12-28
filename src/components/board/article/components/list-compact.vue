<template>
	<div>
		<template v-for="(item, i) in items">
			<v-list-item
				three-line
				:key="item.id"
				:to="
					category
						? `${boardId}/${item.id}?category=${category}`
						: `${boardId}/${item.id}`
				"
			>
				<v-list-item-avatar v-if="!item.important">
					<v-img :src="item.user.photoURL"></v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title class="mb-2">
						<display-title :item="item"></display-title>
					</v-list-item-title>

					<v-list-item-subtitle class="grey--text caption mb-4">
						<display-time :time="item.createdAt"></display-time>
					</v-list-item-subtitle>

					<v-list-item-subtitle>
						<v-btn
							v-if="!$vuetify.breakpoint.xs && category != item.category"
							color="primary"
							small
							depressed
							outlined
							:to="`${$route.path}?category=${item.category}`"
							height="32"
						>
							{{ item.category }}
							<v-icon small>mdi-chevron-right</v-icon>
						</v-btn>
					</v-list-item-subtitle>
					<!-- <v-list-item-subtitle class="my-4">
							{{ getSummary(item.summary, 100, '!') }}
						</v-list-item-subtitle> -->
				</v-list-item-content>

				<v-list-item-action>
					<display-user :user="item.user" :size="'small'"></display-user>
				</v-list-item-action>

				<v-list-item-action>
					<v-btn
						icon
						small
						v-if="fireUser && fireUser.uid === item.uid"
						:to="`${boardId}/${item.id}?action=write`"
					>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>

					<v-sheet class="mr-2">
						<v-btn icon small>
							<v-icon small color="grey"> mdi-heart </v-icon>
						</v-btn>
						<span class="body-2 ma-0">{{ item.likeCount }}</span>
					</v-sheet>

					<v-sheet class="mr-2">
						<v-btn icon small>
							<v-icon small color="grey">mdi-eye</v-icon>
						</v-btn>
						<span class="body-2 ma-0">{{ item.readCount }}</span>
					</v-sheet>
				</v-list-item-action>
			</v-list-item>

			<v-divider v-if="i < items.length - 1" :key="i" />
		</template>
	</div>
</template>

<script>
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'
import DisplayTitle from '@/components/display-title'
// import DisplayCount from '@/components/display-count'
import getSummary from '@/util/getSummary'
import addYoutubeIframe from '@/util/addYoutubeIframe'

export default {
	components: { DisplayTime, DisplayUser, DisplayTitle },
	props: ['items', 'boardId', 'category'],

	data() {
		return {
			tuiOptions: {
				linkAttribute: {
					target: '_blank'
				}
			},
			getSummary,
			dialog: false
		}
	},
	computed: {
		fireUser() {
			return this.$store.state.fireUser
		}
	},
	methods: {
		read(item) {
			this.$router.pusH({ path: this.$route.pate + '/' + item.id })
		},
		like(item) {
			if (!this.fireUser) return false
			return item.likeUids.includes(this.fireUser.uid)
		},
		onViewerLoad(v) {
			addYoutubeIframe(v.preview.el, this.$vuetify.breakpoint)
		},
		test(event) {
			event.stopPropagation()
		}
	}
}
</script>
