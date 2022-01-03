<template>
	<div>
		<v-sheet rounded="lg" height="auto" elevation="2" class="mb-4">
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
							class="font-weight-black black--text mb-4 align-start"
							:class="
								$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
									? 'text-h5'
									: 'text-h4'
							"
						>
							<p class="mb-0">
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
								class="mb-0"
							>
								Thank you for visiting my portfolio site.
							</p>
						</v-card-subtitle>

						<v-btn text color="error">
							Edit
							<v-icon small>mdi-pencil</v-icon>
						</v-btn>
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
					>
						<v-img
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
						<span class="text-h6">About</span>
						<v-btn icon small>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
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
										v-for="tag in tag.skills"
										:key="tag"
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
						<span class="text-h6">Works</span>
						<v-btn icon small>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tag: {
				skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'VueJS']
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
