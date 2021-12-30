<template>
	<admin-index :items="site.menu"></admin-index>
</template>

<script>
import AdminIndex from '@/components/admin/index'

export default {
	components: { AdminIndex },
	data() {
		return {
			drawer: false,
			site: {
				menu: [
					{
						title: '',
						icon: '',
						to: '',
						active: true
					}
				],
				title: '',
				footer: ''
			}
		}
	},
	created() {
		this.subscribe()
	},
	methods: {
		closeMenu() {
			this.drawer = false
		},
		subscribe() {
			this.$firebase
				.database()
				.ref()
				.child('site')
				.on(
					'value',
					sn => {
						const v = sn.val()
						if (!v) {
							this.$firebase.database().ref().child('site').set(this.site)
							return
						}
						this.site = v
					},
					e => {
						console.log(e.message)
					}
				)
		}
	}
}
</script>
