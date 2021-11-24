<template>
	<v-app id="App">
		<v-app-bar app color="white">
			<v-toolbar max-width="1200" class="mx-auto" flat>
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
					@click="drawer = !drawer"
				></v-app-bar-nav-icon>
				<v-toolbar-title class="pr-4">Soot's Portfoilo</v-toolbar-title>

				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2 hidden-sm-and-down"
					contain
					src="./assets/logo.png"
					transition="scale-transition"
					width="32"
				/>

				<v-btn
					v-for="item in items"
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
			<v-toolbar
				id="toolbar-mo"
				color="transparent"
				class="font-weight-bold"
				justify-end
				flat
			>
				<v-toolbar-title class="pr-4"> Soot's Portfoilo </v-toolbar-title>

				<span class="caption">ver.0.0.1</span>

				<v-spacer></v-spacer>

				<v-btn icon @click="drawer = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>

			<v-divider />

			<v-list>
				<v-list-item v-for="item in items" :key="item.a" :to="item.to">
					<v-list-item-avatar>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>
							{{ (item.title, item.to) }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>

		<v-footer app dark color="primary" absolute>
			<v-spacer></v-spacer>
			<div>&copy; {{ new Date().getFullYear() }}</div>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			drawer: false,
			items: [
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
			methods: {
				async signOut() {
					this.$firebase.auth().signOut()
					this.$router.push('/sign')
					// this.$Progress.start()
				}
			}
		}
	}
}
</script>

<style lang="scss">
#App {
	background: #e5e5e5;
}
</style>
