<template>
	<v-app-bar
		app
		color="primary"
		dark
	>
		<div class="d-flex align-center">
			<v-avatar color="white" rounded>
				<router-link to="/">
					<v-img
						alt="KPECCSL Logo"
						class="shrink"
						contain
						src="https://kpeccsla899646943534aa39c34c64fd72f84ad82108-prod.s3.ap-south-1.amazonaws.com/public/logo.png"
						transition="scale-transition"
						width="40"
					/>
				</router-link>
			</v-avatar>
			<v-toolbar-title>
				<v-btn
					to="/"
					text
					depressed
				>
					<span  class="d-flex d-md-none">{{this.$store.state.company.shortName}}</span>
					<span  class="d-none d-md-flex">{{this.$store.state.company.name}}</span> 
				</v-btn>
				
			</v-toolbar-title>
		</div>

		<v-spacer></v-spacer>

		<v-btn
			v-if="!this.$store.state.authorized && !$vuetify.breakpoint.mobile"
			text
			outlined
			to="/login"
		>
		LOGIN
		</v-btn>

		<v-btn
			to="/search"
			text
			:small="$vuetify.breakpoint.mobile"
		>	
			<v-icon>mdi-magnify</v-icon>
		</v-btn>

		<v-btn
			to="/cart"
			text
			small
		>	
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
			v-if="this.$store.state.authorized"
			text
			:small="$vuetify.breakpoint.mobile"
			@click="toggleDrawer"
		>
			<v-icon>mdi-account-circle</v-icon>
		</v-btn>
		<v-btn
			v-else
			text
			:small="$vuetify.breakpoint.mobile"
			@click="toggleDrawer"
		>
			<v-icon>mdi-login</v-icon>
		</v-btn>
		<!-- <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon> -->
	</v-app-bar>
</template>

<script>
  export default {
		name: 'AppBar',
		data: () => ({
		}),
		computed: {
			cart() {
				return this.$store.getters.cart
			},
			drawer() {
				return this.$store.state.drawer
			}
		},
		methods: {
			toggleDrawer() {
				console.log('drawer', this.drawer)
				this.$store.dispatch('toggleDrawer')
			}
		}
  }
</script>