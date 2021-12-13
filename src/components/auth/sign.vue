<template>
	<!-- <v-container style="max-width: 1200px" fluid>
		<v-card height="650">
			<v-row>
				<v-col class="hidden-xs-only">
					<v-img></v-img>
				</v-col>
				<v-col>
					<sign-in v-if="type" @changeType="type = !type" />
					<sign-up v-else @changeType="type = !type" />
				</v-col>
			</v-row>
		</v-card>
	</v-container> -->
	<v-container style="max-width: 1200px" fluid>
		<v-card height="575">
			<v-row no-gutters class="pa-4">
				<v-col class="hidden-xs-only"> </v-col>
				<v-col>
					<sign-in v-if="type" @changeType="type = !type" />
					<sign-up v-else @changeType="type = !type" />
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
import SignIn from '@/components/auth/signIn'
import SignUp from '@/components/auth/signUp'

export default {
	components: {
		SignIn,
		SignUp
	},
	data() {
		return {
			type: false
		}
	}
}
</script>
