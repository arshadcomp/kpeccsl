<template>
	<v-app-bar app color="primary" dark clipped-right>
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
				{{
					$vuetify.breakpoint.mobile ? company.name.short : company.name.full
				}}
			</span>
		</v-btn>
		<v-spacer></v-spacer>

		<v-btn
			v-if="!this.$store.state.isAuthorized && !$vuetify.breakpoint.mobile"
			text
			outlined
			to="/login"
		>
			LOGIN
		</v-btn>

		<v-btn to="/search" text :small="$vuetify.breakpoint.mobile">
			<v-icon>mdi-magnify</v-icon>
		</v-btn>

		<v-btn to="/cart" text small>
			<v-badge
				:content="cart.length"
				:value="cart.length"
				color="error"
				overlap
			>
				<v-icon>mdi-cart</v-icon>
			</v-badge>
		</v-btn>

		<v-btn
			v-if="isAuthorized"
			text
			:small="$vuetify.breakpoint.mobile"
			@click="toggleNavigationDrawer"
		>
			<v-icon>mdi-account-circle</v-icon>
		</v-btn>
		<v-btn
			v-else
			text
			:small="$vuetify.breakpoint.mobile"
			to="/authenticate"
		>
			<v-icon>mdi-login</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: "app-bar",
	computed: {
		company() {
			return this.$store.getters.company;
		},
		cart() {
			return this.$store.getters.cart;
		},
		isAuthorized() {
			return this.$store.getters.isAuthorized;
		}
	},
	methods: {
		toggleNavigationDrawer() {
			console.log('DRAWER', this.$store.getters.drawer)
			this.$store.commit("TOGGLE_DRAWER");
		},
	},
};
</script>