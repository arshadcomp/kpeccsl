<template>
	<v-app-bar app color="error" dark clipped-left>
		<div class="d-flex align-center">
			<v-btn text to="/">
				<v-avatar color="white" rounded class="mr-2">
					<v-img
						alt="KPECCSL Logo"
						class="shrink"
						contain
						src="https://kpeccsla899646943534aa39c34c64fd72f84ad82108-prod.s3.ap-south-1.amazonaws.com/public/logo.png"
						transition="scale-transition"
						width="40"
					/>
				</v-avatar>
				<span v-if="company">
					{{ company.name.full }}
				</span>
			</v-btn>
		</div>

		<v-spacer></v-spacer>

		<v-btn
			href="https://github.com/vuetifyjs/vuetify/releases/latest"
			target="_blank"
			text
		>
			<span class="mr-2">Latest Release</span>
			<v-icon>mdi-open-in-new</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: "app-bar",
	computed: {
		company() {
			return this.$store.getters.company
		}
	}
};
</script>