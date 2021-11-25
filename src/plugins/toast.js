import Vue from 'vue'
import Toasted from 'vue-toasted'
Vue.use(Toasted, {
	iconPack: 'mdi',
	position: 'bottom-right'
})

Vue.toasted.register(
	'notice',
	payload => {
		return payload
	},
	{
		icon: 'mdi-bell',
		duration: 4000,
		type: 'info',
		action: {
			text: 'Close',
			onClick: (e, toastObject) => {
				toastObject.goAway(0)
			}
		}
	}
)

Vue.toasted.register(
	'error',
	payload => {
		return payload
	},
	{
		icon: 'mdi-alert-circle',
		duration: 8000,
		type: 'error',
		fitToScreen: 'true',
		action: {
			text: 'Close',
			onClick: (e, toastObject) => {
				toastObject.goAway(0)
			}
		}
	}
)
