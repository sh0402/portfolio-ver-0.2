<template>
	<div class="d-flex align-center">
		<template v-if="item.important > 0">
			<template>
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

			<!-- <template v-else>
				<v-icon v-if="item.important === 1" left color="success">
					mdi-bell-ring
				</v-icon>

				<v-icon v-else left color="warning">mdi-alert-circle </v-icon>
			</template> -->
		</template>

		<v-icon color="accent" left v-if="item.images && item.images.length">
			mdi-image
		</v-icon>

		<span class="mr-2" v-text="item.title"></span>

		<span
			max-height="24"
			class="error--text caption"
			v-if="
				!item.important
					? newCheck(item.updatedAt, 'hours', 1)
					: newCheck(item.updatedAt, 'days', 1)
			"
		>
			new
		</span>
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
