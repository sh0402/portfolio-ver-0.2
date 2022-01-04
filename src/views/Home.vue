<template>
	<v-container style="max-width: 1200px" fluid>
		<v-sheet rounded="lg" height="auto" elevation="2" class="mb-6">
			<v-row no-gutters class="align-center">
				<v-col
					cols="12"
					md="6"
					:class="
						$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
							? 'px-2 py-4'
							: 'pl-4 py-4'
					"
				>
					<v-card flat rounded="lg">
						<v-card-title
							class="font-weight-black black--text align-start"
							:class="
								$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
									? 'text-h5'
									: 'text-h4'
							"
						>
							<p>
								Products & Brand<br />
								UI/UX & Web Design<br />
								<span class="primary--text">experiences</span>
							</p>
						</v-card-title>

						<v-card-subtitle>
							<p
								:class="
									$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
										? 'body-2'
										: 'body-1'
								"
							>
								Hello, I'm Soohwan Kim, Designer of Web & Products. <br />
								I specialize in UI/UX design, responsive web design and product
								packaging design.
							</p>

							<p
								:class="
									$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
										? 'body-2'
										: 'body-1'
								"
							>
								Thank you for visiting my portfolio site.
							</p>

							<v-btn color="primary">
								Edit
								<v-icon small>mdi-pencil</v-icon>
							</v-btn>
						</v-card-subtitle>
					</v-card>
				</v-col>

				<v-col cols="12" md="6" style="position: relative">
					<v-card
						flat
						rounded="lg"
						:class="
							$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
								? 'rounded-t-0'
								: 'rounded-l-0'
						"
						max-width="100%"
					>
						<v-img
							height="400px"
							src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80"
						>
						</v-img>
					</v-card>
					<v-btn fab small style="position: absolute; left: 2rem; bottom: 1rem">
						<v-icon small style="color: rgba(0, 0, 0, 0.54)">
							mdi-image-edit
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-sheet>

		<v-row>
			<v-col cols="12" md="4">
				<v-card
					rounded="lg"
					:class="
						$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
							? 'px-2 py-4'
							: 'pa-4'
					"
				>
					<v-card-text class="d-flex align-center justify-space-between">
						<span class="text-h6 font-weight-bold">About</span>
						<v-menu offset-y left>
							<template v-slot:activator="{ on }">
								<v-btn icon small v-on="on">
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>

							<v-card width="150">
								<v-btn
									text
									tile
									block
									class="text-subtitle-2 text-capitalize pa-2"
								>
									Profile
								</v-btn>

								<v-btn
									text
									tile
									block
									class="text-subtitle-2 text-capitalize pa-2"
								>
									Edit Profile
								</v-btn>

								<v-btn
									text
									tile
									block
									class="text-subtitle-2 text-capitalize pa-2"
									color="grey"
								>
									Cancel
								</v-btn>
							</v-card>
						</v-menu>
					</v-card-text>

					<v-card-actions class="d-flex flex-column align-center">
						<v-img
							width="150"
							height="150"
							class="rounded-circle"
							src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
						>
						</v-img>
					</v-card-actions>

					<v-card-actions class="d-flex flex-column align-center">
						<span class="text-h6 font-weight-black">
							{{ user.displayName }}
						</span>
						<span class="grey--text">
							{{ user.email }}
						</span>
					</v-card-actions>

					<v-card-actions>
						<v-row>
							<v-col>
								<v-chip-group column class="pa-2">
									<v-chip
										label
										close
										outlined
										v-for="tag in tag.skills"
										:key="tag"
										color="accent"
										class="pa-2 align-center"
									>
										{{ tag }}
									</v-chip>
								</v-chip-group>
							</v-col>
						</v-row>
					</v-card-actions>
				</v-card>
			</v-col>

			<v-col cols="12" md="8">
				<v-card
					rounded="lg"
					:class="
						$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
							? 'px-2 py-4'
							: 'pa-4'
					"
				>
					<v-card-text class="d-flex align-center justify-space-between">
						<span class="text-h6 font-weight-bold">Works</span>
						<v-btn icon small>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-text>

					<v-card-title class="text-h4 font-weight-black">
						Design that solves problems,<br />
						one product at a time
					</v-card-title>

					<v-card-text class="d-flex align-center pa-0" elevation="1">
						<v-card
							id="carousel"
							outlined
							rounded="lg"
							v-for="n in 3"
							:key="n"
							class="ma-4"
							height="250"
							width="250"
						></v-card>

						<div
							style="position: absolute; width: 95%"
							class="d-flex justify-space-between"
						>
							<v-btn fab small>
								<v-icon>mdi-chevron-left</v-icon>
							</v-btn>

							<v-btn fab small>
								<v-icon>mdi-chevron-right</v-icon>
							</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-dialog v-model="dialog">
			<v-card>adasd</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			model: null,
			dialog: false,
			tag: {
				skills: ['#Photoshop', '#Illustrator', '#Figma', '#VueJS']
			},
			user: {
				displayName: '김수트',
				email: 'dgryoma0402@gmail.com'
			}
		}
	},
	methods: {}
}
</script>
