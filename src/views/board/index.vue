<template>
	<board-index :category="category"></board-index>
</template>

<script>
import BoardIndex from '@/components/board/index'

export default {
	components: { BoardIndex },
	computed: {
		category() {
			return this.$route.query.category
		}
	}
}
</script>
