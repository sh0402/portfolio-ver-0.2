<template>
	<v-app id="App">
		<v-app-bar app color="white">
			<v-toolbar max-width="1200" class="mx-auto" flat>
				<!-- <v-app-bar-nav-icon
					class="hidden-md-and-up"
					@click="drawer = !drawer"
				/> -->
				<v-btn
					icon
					small
					plain
					@click="drawer = !drawer"
					:class="
						$vuetify.breakpoint.smAndDown ? 'display: none' : 'display: block'
					"
				>
					<v-icon>mdi-menu</v-icon>
				</v-btn>

				<site-title :title="site.title" class="hidden-md-and-up" />

				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2 hidden-sm-and-down"
					contain
					src="./assets/logo.png"
					transition="scale-transition"
					width="32"
				/>

				<v-btn text plain to="/" class="hidden-sm-and-down"> Home </v-btn>

				<v-btn
					v-for="item in site.menu"
					:key="item.a"
					:to="item.to"
					text
					plain
					class="hidden-sm-and-down"
				>
					{{ item.title }}
				</v-btn>

				<v-spacer />

				<site-sign></site-sign>
			</v-toolbar>
		</v-app-bar>

		<v-navigation-drawer app v-model="drawer" width="100%">
			<site-menu
				:items="site.menu"
				:dropItems="site.dropMenu"
				:title="site.title"
				v-on:drawer="closeMenu"
			></site-menu>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>

		<site-footer :footer="site.footer" />
	</v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'
import SiteSign from '@/views/site/sign'

export default {
	components: { SiteTitle, SiteFooter, SiteMenu, SiteSign },
	name: 'App',
	data() {
		return {
			drawer: false,
			site: {
				menu: [
					{
						title: 'Home',
						icon: 'mdi-home-circle',
						to: '/',
						active: true
					},
					{
						title: 'About',
						icon: 'mdi-information',
						to: '/about'
					},
					{
						title: 'XXX',
						icon: 'mdi-help-circle',
						to: '/xxx'
					}
				],
				dropMenu: [
					{
						title: '01',
						icon: 'mdi-help-circle',
						to: '/xxx'
					},
					{
						title: '02',
						icon: 'mdi-help-circle',
						to: '/xxx'
					},
					{
						title: '03',
						icon: 'mdi-help-circle',
						to: '/xxx'
					}
				],
				title: 'Soot Portfolio',
				footer: 'this Footer'
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

<style lang="scss">
#App {
	background: #e5e5e5;
}
</style>
