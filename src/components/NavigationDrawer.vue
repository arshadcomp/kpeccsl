<template>
	<v-navigation-drawer 
		app
		v-model="drawer"
		right
		temporary
	>
		<v-list
			nav
			shaped
		>
			<!-- <template v-for="(item, i) in navItems">
				<v-list-item v-if="item.show" :key="i">
					<v-list-item-icon>
						<v-icon>{{item.icon}}</v-icon>
					</v-list-item-icon>
					<v-list-item-title>{{item.title}}</v-list-item-title>
				</v-list-item>
			</template> -->

			<v-list-item-group
				v-model="group"
				active-class="primary--text text--accent-4"
			>
				<v-list-item v-for="(item, i) in navItems" :key="i" :to="item.link" link>
					<v-list-item-icon>
						<v-icon>{{item.icon}}</v-icon>
					</v-list-item-icon>
					<v-list-item-title>{{item.title}}</v-list-item-title>
				</v-list-item>
			</v-list-item-group>
			<v-list-item v-if="isAdmin" :to="'/admin'" >
				<v-list-item-icon>
					<v-icon>mdi-star</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>
						Admin
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item v-if="!this.$store.state.authorized" :to="'/login'" >
				<v-list-item-icon>
					<v-icon>mdi-login</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<!-- <v-list-item-subtitle>Not {{user.name}}?</v-list-item-subtitle> -->
					<v-list-item-title>
						Login
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item v-if="this.$store.state.authorized" :to="'/logout'" >
				<v-list-item-icon>
					<v-icon>mdi-power</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-subtitle>Not {{user.name}}?</v-list-item-subtitle>
					<v-list-item-title>
						Logout
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
  export default {
		name: 'NavigationDrawer',
    data: () => ({
			group: null,
			navItems: [
				{
					icon: 'mdi-home',
					title: 'Home',
					link: '/'
				},
				{
					icon: 'mdi-package',
					title: 'My Orders',
					link: '/orders',
				},
				{
					icon: 'mdi-account',
					title: 'Profile',
					link: '/profile'
				}
			]
		}),
		computed: {
			user() {
				return this.$store.state.user.attributes
			},
			isAdmin() {
				return this.$store.getters.isAdmin 
			},
			drawer: {
				get(){
					return this.$store.state.drawer
				},
				set(newDrawer){
					console.log('DRAWER STATUS', newDrawer)
				}
			}
		},
		watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>