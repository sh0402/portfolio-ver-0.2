<template>
	<div class="d-flex align-center">
		<template v-if="item.important && item.important > 0">
			<template v-if="!$vuetify.breakpoint.xs">
				<v-chip
					:color="item.important === 1 ? 'success' : 'warning'"
					label
					small
					class="mr-2"
				>
					<template v-if="item.important === 1">
						<v-icon left small>mdi-bell-ring</v-icon>
						<span>공지</span>
					</template>

					<template v-else>
						<v-icon left small>mdi-alert-circle</v-icon>
						<span>중요</span>
					</template>
				</v-chip>
			</template>

			<template v-else>
				<v-icon v-if="item.important === 1" left color="success">
					mdi-bell-ring
				</v-icon>

				<v-icon v-else left color="warning">mdi-alert-circle </v-icon>
			</template>
		</template>

		<v-icon color="accent" left v-if="item.images && item.images.length">
			mdi-image
		</v-icon>

		<span class="mr-2" v-text="item.title"></span>

		<v-btn
			small
			color="error"
			max-height="24"
			class="pa-0"
			left
			v-if="newCheck(item.updatedAt)"
		>
			new
		</v-btn>
	</div>
</template>

<script>
import newCheck from '@/util/newCheck'

export default {
	props: ['item'],
	data() {
		return {
			newCheck
		}
	}
}
</script>
