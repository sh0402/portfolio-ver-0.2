<template>
	<v-app id="App">
		<v-app-bar app color="white">
			<v-toolbar max-width="1200" class="mx-auto" flat>
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
					@click="drawer = !drawer"
				></v-app-bar-nav-icon>

				<site-title :title="site.title"></site-title>

				<v-spacer></v-spacer>

				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2 hidden-sm-and-down"
					contain
					src="./assets/logo.png"
					transition="scale-transition"
					width="32"
				/>

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
				<v-spacer></v-spacer>

				<v-btn icon v-if="$store.state.user">
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-avatar size="32" color="grey lighten-4">
									<img :src="$store.state.user.photoURL" alt="avatar" />
								</v-avatar>
							</v-btn>
						</template>

						<v-card width="320">
							<v-container>
								<v-row dense>
									<v-col cols="12">
										<v-card elevation="0" disabled>
											<v-img
												:src="$store.state.user.photoURL"
												alt="avatar"
												aspect-ratio="2"
												max-height="150"
											/>
										</v-card>
									</v-col>

									<v-col cols="12" class="my-4">
										<span class="font-weight-bold">
											{{ $store.state.user.displayName }}
										</span>

										<br />

										<span>
											{{ $store.state.user.email }}
										</span>
									</v-col>

									<v-col cols="12">
										<v-divider class="mb-4"></v-divider>
										<v-btn block color="warning" @click="signOut">
											Log-out
										</v-btn>
									</v-col>
								</v-row>
							</v-container>
						</v-card>
					</v-menu>
				</v-btn>

				<v-btn text v-else to="/sign"> Sign-in </v-btn>
			</v-toolbar>
		</v-app-bar>

		<v-navigation-drawer app temporary v-model="drawer" width="100%">
			<site-menu :items="site.menu" v-on:closeDrawer="closeDrawer"></site-menu>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>

		<site-footer :footer="site.footer"></site-footer>
	</v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'

export default {
	name: 'App',
	components: {
		SiteTitle,
		SiteFooter,
		SiteMenu
	},
	data() {
		return {
			drawer: false,
			site: {
				menu: [
					{
						title: 'Home',
						icon: 'mdi-home',
						to: '/'
					},
					{
						title: 'About',
						icon: 'mdi-information',
						to: '/about'
					},
					{
						title: 'Projects',
						icon: 'mdi-view-gallery',
						to: '/projects'
					},
					{
						title: 'Contact',
						icon: 'mdi-account-box',
						to: '/contact'
					},
					{
						title: 'Admin',
						icon: 'mdi-text-long',
						to: '/admin/users'
					},
					{
						title: 'Storage',
						icon: 'mdi-text-long',
						to: '/lectures/storage'
					},
					{
						title: 'lv2',
						icon: 'mdi-text-long',
						to: '/test/lv2'
					}
				],
				title: `Soot's Portfolio`,
				footer: 'this Footer'
			}
		}
	},
	created() {
		this.subscribe()
	},
	methods: {
		closeDrawer() {
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
		},
		save() {
			this.$firebase.database().ref().child('abcd').set({
				title: 'abcd',
				text: 'xxxx'
			})
			console.log('Save Success')
		},
		read() {
			this.$firebase
				.database()
				.ref()
				.child('abcd')
				.on('value', sn => {
					console.log(sn)
					console.log(sn.val())
				})
			console.log('Read Success')
		},
		async readOne() {
			const sn = await this.$firebase
				.database()
				.ref()
				.child('abcd')
				.once('value')

			console.log(sn.val())
			console.log('ReadOne Success')
		}
	}
}
</script>

<style lang="scss">
#App {
	background: #e5e5e5;
}
</style>
