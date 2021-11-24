<template>
	<v-app>
		<v-app-bar app dark color="primary">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Page title</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon to="/about">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer app temporary v-model="drawer">
			<v-list nav dense>
				<v-list-item-group>
					<v-list-item>
						<v-list-item-title>Foo</v-list-item-title>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Bar</v-list-item-title>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Fizz</v-list-item-title>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Buzz</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
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
			drawer: false
		}
	}
}
</script>
