<template>
	<v-container
		style="max-width: 1200px"
		fluid
		:class="$vuetify.breakpoint.xs ? 'pa-0' : ''"
	>
		<v-sheet
			rounded="lg"
			height="auto"
			elevation="2"
			:tile="$vuetify.breakpoint.xs"
			class="mb-4"
		>
			<v-row no-gutters class="align-center">
				<v-col
					cols="12"
					md="6"
					:class="
						$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
							? 'px-2 py-4'
							: 'pa-4'
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
							<span>
								Products & Brand<br />
								UI/UX & Web Design<br />
								<span class="primary--text">experiences</span>
							</span>
						</v-card-title>

						<v-card-subtitle>
							<span
								:class="
									$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
										? 'body-2'
										: 'body-1'
								"
							>
								Hello, I'm Soohwan Kim, Designer of Web & Products. <br />
								I specialize in UI/UX design, responsive web design and product
								packaging design. <br />
								Thank you for visiting my portfolio site.
							</span>
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
						:tile="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
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
			<v-col cols="12" md="5">
				<v-card
					rounded="lg"
					:class="
						$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
							? 'px-2 py-4'
							: 'pa-4'
					"
					:tile="$vuetify.breakpoint.xs"
				>
					<v-card-text class="d-flex align-center justify-space-between">
						<h2>About</h2>
						<v-btn icon small>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" md="7">
				<v-card
					rounded="lg"
					:class="
						$vuetify.breakpoint.xs || $vuetify.breakpoint.sm
							? 'px-2 py-4'
							: 'pa-4'
					"
					:tile="$vuetify.breakpoint.xs"
				>
					<v-card-text class="d-flex align-center justify-space-between">
						<h2>Works</h2>
						<v-btn icon small>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
