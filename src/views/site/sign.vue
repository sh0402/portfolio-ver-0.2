<template>
	<v-progress-circular indeterminate v-if="loading"></v-progress-circular>
	<v-menu offset-y left v-else-if="!$store.state.fireUser">
		<template v-slot:activator="{ on }">
			<!-- <v-btn
				text
				v-on="on"
				class="body-2 pa-0 grey--text darken-1 text-capitalize"
				to="/sign"
			>
				Sign in
			</v-btn> -->
			<v-btn icon small v-on="on">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</template>

		<v-card>
			<v-card-title> Log-in </v-card-title>

			<v-divider />

			<v-card-actions>
				<v-btn block color="red" dark @click="signInWithGoogle">
					<v-icon left>mdi-google</v-icon>
					Google Log-in
				</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn block color="blue" dark @click="signInWithFacebook">
					<v-icon left>mdi-facebook</v-icon>
					Facebook Log-in
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>

	<v-menu offset-y v-else>
		<template v-slot:activator="{ on }">
			<v-btn icon v-on="on">
				<v-avatar size="32">
					<v-img :src="$store.state.fireUser.photoURL"></v-img>
				</v-avatar>
			</v-btn>
		</template>

		<v-card width="300">
			<v-img :src="$store.state.fireUser.photoURL"></v-img>
			<v-card-title>{{ $store.state.fireUser.displayName }}</v-card-title>
			<v-card-subtitle>{{ $store.state.fireUser.email }}</v-card-subtitle>

			<v-divider />

			<v-card-actions class="pa-4">
				<v-btn block @click="signOut"> Log out </v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script>
export default {
	data() {
		return {
			loading: false
		}
	},
	methods: {
		async signInWithGoogle() {
			const provider = new this.$firebase.auth.GoogleAuthProvider()
			this.$firebase.auth().languageCode = 'ko'
			this.loading = true
			try {
				const sn = await this.$firebase.auth().signInWithPopup(provider)
				console.log(sn.user)
				this.$store.commit('setFireUser', sn.user)
			} finally {
				this.loading = false
			}
		},
		signOut() {
			this.$firebase.auth().signOut()
		},
		signInWithFacebook() {
			throw Error('Next time, baby')
		}
	}
}
</script>
