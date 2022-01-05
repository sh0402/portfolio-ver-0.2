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
						<span class="text-h6 font-weight-bold">Profile</span>
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
							width="200"
							height="200"
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
						<span class="text-h6 font-weight-bold"> Projects </span>
						<v-btn icon small>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-text>

					<v-card-title class="text-h4 font-weight-black">
						Design that solves problems,<br />
						one product at a time
					</v-card-title>

					<template>
						<div class="card-carousel">
							<div class="card-carousel-wrapper ma-4">
								<v-card
									width="250"
									outlined
									rounded="lg"
									v-for="n in 15"
									:key="n"
									class="card-product mx-2"
								>
									<v-img
										aspect-ratio="1"
										height="250"
										width="250"
										src="https://picsum.photos/200/300"
									></v-img>

									<v-card-title class="text-subtitle-1 font-weight-bold pb-2">
										project-title
									</v-card-title>

									<v-card-text
										class="text-caption d-flex flex-column py-0"
										style="line-height: 1.4"
									>
										<span>Working Time : 4 Days</span>
										<span>Size : 1,020 x 1,020 x 460 (mm)</span>
									</v-card-text>

									<v-card-text>
										<v-chip small label v-for="n in 2" :key="n" class="mr-1">
											Lorem ipsum
										</v-chip>
									</v-card-text>

									<v-card-text class="pt-0 d-flex align-center">
										<v-chip small outlined> 김수트 </v-chip>

										<v-spacer />

										<v-icon small> mdi-heart </v-icon>
										<span> 0 </span>
									</v-card-text>
								</v-card>
							</div>
							<div
								style="position: absolute; top: 60%; left: 0; width: 100%"
								class="d-flex justify-space-between align-center pa-4"
							>
								<v-btn fab small>
									<v-icon>mdi-chevron-left</v-icon>
								</v-btn>
								<v-btn fab small>
									<v-icon>mdi-chevron-right</v-icon>
								</v-btn>
							</div>
						</div>
					</template>
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
				skills: [
					'Photoshop',
					'Illustrator',
					'Figma',
					'Sketch',
					'VueJS',
					'HTML5',
					'CSS3',
					'JavaScript',
					'Bootstrap',
					'Web publishing',
					'Web Developer'
				]
			},
			user: {
				displayName: '김수트',
				email: 'dgryoma0402@gmail.com'
			}
		}
	}
}
</script>

<style lang="scss">
.card-carousel-wrapper {
	display: flex;
	overflow: hidden;

	.v-card:first-child {
		margin-left: 0 !important;
	}
	.v-card:last-child {
		margin-right: 0 !important;
	}
}
</style>
