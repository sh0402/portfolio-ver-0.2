import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

import en from 'vuetify/es5/locale/en'
import ko from 'vuetify/es5/locale/ko'

Vue.use(Vuetify, {
	components: {
		VSnackbar,
		VBtn,
		VIcon
	}
})
const theme = {
	themes: {
		light: {
			primary: '#0074D9',
			secondary: '#BFBFBF',
			accent: '#004E91',
			info: '#02a9f7',
			success: '#28A745'
		}
	}
}
const VuetifyObj = new Vuetify({
	lang: {
		locales: { en, ko },
		current: 'ko'
	},
	theme
})

Vue.use(VuetifyToast, {
	x: 'right', // default
	y: 'bottom', // default
	color: 'info', // default
	icon: 'mdi-information',
	iconColor: 'rgba(0, 0, 0, 0.54)', // default
	classes: ['body-2'],
	timeout: 3000, // default
	dismissable: true, // default
	multiLine: false, // default
	vertical: false, // default
	queueable: false, // default
	showClose: false, // default
	closeText: '', // default
	closeIcon: 'close', // default
	closeColor: '', // default
	slot: [], // default
	shorts: {
		custom: {
			color: 'purple'
		}
	},
	property: '$toast', // default
	$vuetify: VuetifyObj.framework
})

export default VuetifyObj
