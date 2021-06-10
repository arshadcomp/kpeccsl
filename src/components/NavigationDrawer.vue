<template>
	<v-navigation-drawer
		app
		clipped
		right
		:value="drawer"
		v-click-outside="onClickOutside"
	>
		<v-list nav shaped>
			<template v-for="(item, i) in navItems">
				<v-list-item
					:key="i"
					:to="item.link"
					active-class="primary--text text--accent-4"
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-subtitle v-if="item.subtitle">
							Not {{user ? user.attributes.name : '' }}?
						</v-list-item-subtitle>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: "NavigationDrawer",
	data: () => ({
		navItems: [
			{
				icon: "mdi-home",
				title: "Home",
				link: "/",
			},
			{
				icon: "mdi-package",
				title: "My Orders",
				link: "/orders",
			},
			{
				icon: "mdi-account",
				title: "Profile",
				link: "/profile",
			},
			{
				title: "Logout",
				icon: "mdi-logout",
				link: "/authenticate",
				subtitle: "User",
			},
		],
	}),
	computed: {
		drawer() {
			return this.$store.getters.drawer;
		},
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		onClickOutside() {
			if(!this.drawer && this.$vuetify.breakpoint.mobile)
				this.$store.commit("TOGGLE_DRAWER");
		},
	},
	// watch: {
	// 	$route() {
	// 		if (this.drawer && this.$vuetify.breakpoint.mobile)
	// 			this.$store.commit("TOGGLE_DRAWER");
	// 	},
	// },
};
</script>