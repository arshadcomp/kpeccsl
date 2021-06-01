<template>
	<v-navigation-drawer app clipped>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="title">{{ user ? user.attributes.name : 'Username' }}</v-list-item-title>
				<v-list-item-subtitle> {{ belongsToSeller || 'Seller'}} </v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-list-item>
			<v-select 
			v-if="isAdmin"
			v-model="selectedSellerId"
			:items="sellers"
			item-text="name"
			item-value="id"
			@change="setSeller"
		>
			</v-select>
		</v-list-item>
		
		<v-divider></v-divider>

		<v-list v-if="isAuthorized" dense nav>
			<template v-for="(group, index) in groups">
				<v-list-group v-if="group.items.length > 0" :key="index" :prepend-icon="group.icon">
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>{{ group.title }}</v-list-item-title>
						</v-list-item-content>
					</template>
					<v-list-item v-for="(item, i) in group.items" :key="i" :to="item.to">
						<v-list-item-icon></v-list-item-icon>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-group>

				<v-list-item v-else :key="index" :to="group.to">
					<v-list-item-icon>
						<v-icon>{{ group.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-title>{{ group.title }}</v-list-item-title>
				</v-list-item>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data() {
		return {
			selectedSellerId: '',
			groups: [
				{
					title: 'Dashboard',
					icon: 'mdi-view-dashboard',
					to: '/',
					items: []
				},
				{
					title: 'Product',
					icon: 'mdi-apps-box',
					items: [
						{
							title: 'Create',
							icon: 'mdi-new-box',
							to: '/product/create'
						},
						{
							title: 'List',
							icon: 'mdi-view-list',
							to: '/product/list'
						},
						{
							title: 'Table',
							icon: 'mdi-table-large-plus',
							to: '/product/table'
						},
						{
							title: 'Inventory',
							icon: 'mdi-tray-full',
							to: '/product/inventory'
						},
					]
				},
				{
					title: 'Categories',
					icon: 'mdi-shape',
					to: '/product/category',
					items: []
				},
				{
					title: 'Orders',
					icon: 'mdi-package-variant',
					items: [
						{
							title: 'Pending',
							icon: 'mdi-clock-outline',
							to: { name:'orderTable', params: { status: 'pending' }}
						},
						{
							title: 'Confirmed',
							icon: 'mdi-check-decagram',
							to: { name:'orderTable', params: { status: 'confirmed' }}
						},
						{
							title: 'Cancelled',
							icon: 'mdi-close-outline',
							to: { name:'orderTable', params: { status: 'cancelled' }}
						},
						{
							title: 'Packed',
							icon: 'mdi-package-variant-closed',
							to: { name:'orderTable', params: { status: 'packed' }}
						},
						{
							title: 'Delivered',
							icon: 'mdi-truck-delivery',
							to: { name:'orderTable', params: { status: 'delivered' }}
						}
					]
				},
				{
					title: 'Logout',
					icon: 'mdi-logout',
					to: '/authenticate',
					items: []
				},
			],
			right: null,
		};
	},
	computed: {
		isAuthorized() {
			return this.$store.getters.isAuthorized;
		},
		isAdmin() {
			return this.$store.getters.isAdmin;
		},
		user() {
			return this.$store.getters.user
		},
		sellerId() {
			return this.$store.getters.sellerId
		},
		belongsToSeller() {
			return this.$store.getters.sellerName
		},
		sellers() {
			return this.$store.getters.sellerList
		}
	},
	methods: {
		setSeller() {
			this.$store.commit('SET_SELLER_BY_ID', this.selectedSellerId)
		}
	}
}
</script>