<template>
	<div class="mb-4 pb-1">
		<template v-for="(item, i) in items">
			<v-card
				:key="item.id"
				:class="i < items.length - 1 ? 'mb-4' : ''"
				class="ma-4"
				outlined
			>
				<v-card
					color="transparent"
					flat
					:to="
						category
							? `${boardId}/${item.id}?category=${category}`
							: `${boardId}/${item.id}`
					"
				>
					<v-btn
						icon
						absolute
						top
						right
						v-if="fireUser && fireUser.uid === item.uid"
						@click="dialog = true"
					>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>

					<v-card-title>
						<v-list-item-avatar size="48" class="align-self-start">
							<v-img :src="item.user.photoURL"></v-img>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title>
								<display-title :item="item"></display-title>
							</v-list-item-title>

							<v-list-item-subtitle class="grey--text caption">
								<display-time :time="item.createdAt"></display-time>
							</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action class="align-self-start"> </v-list-item-action>
					</v-card-title>

					<template v-if="!item.important">
						<v-card-text class="pa-0 px-4">
							<viewer
								v-if="item.summary"
								@load="onViewerLoad"
								:options="tuiOptions"
								:initialValue="item.summary"
							></viewer>

							<v-container v-else>
								<v-row justify="center" align="center">
									<v-progress-circular indeterminate></v-progress-circular>
								</v-row>
							</v-container>
						</v-card-text>
					</template>

					<v-card-actions v-if="!item.important" class="pa-4">
						<display-user :user="item.user" :size="`small`"></display-user>

						<v-btn small icon class="ml-2">
							<v-icon small color="grey"> mdi-heart </v-icon>
						</v-btn>
						<span class="body-2">{{ item.likeCount }}</span>

						<v-btn small icon>
							<v-icon small color="grey">mdi-eye</v-icon>
						</v-btn>
						<span class="body-2">{{ item.readCount }}</span>
					</v-card-actions>
				</v-card>
			</v-card>
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
