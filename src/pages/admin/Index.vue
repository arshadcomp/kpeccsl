<template>
  <v-row>
		<v-col cols="3">
			<v-list>
				<v-list-item to="/admin/orders">
					<v-list-item-icon>
						<v-icon>mdi-package</v-icon>
					</v-list-item-icon>

					<v-list-item-title>All Orders</v-list-item-title>
				</v-list-item>


				<v-list-group
					:value="false"
					prepend-icon="mdi-account-circle"
				>
					<template v-slot:activator>
						<v-list-item-title>Users</v-list-item-title>
					</template>
					<v-list-item
						v-for="([title, icon], i) in admins"
						:key="i"
						link
					>
						<v-list-item-title v-text="title"></v-list-item-title>

						<v-list-item-icon>
							<v-icon v-text="icon"></v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-group>

				<v-list-group
					:value="true"
					prepend-icon="mdi-package"
				>
					<template v-slot:activator>
						<v-list-item-title>Products</v-list-item-title>
					</template>
					<v-list-item
						v-for="([title, icon, link], i) in product"
						:key="i"
						link
						:to="link"
					>
						<v-list-item-title v-text="title"></v-list-item-title>

						<v-list-item-icon>
							<v-icon v-text="icon"></v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-group>

				<v-list-item to="/admin/images">
					<v-list-item-icon>
						<v-icon>mdi-image</v-icon>
					</v-list-item-icon>

					<v-list-item-title>All Images</v-list-item-title>
				</v-list-item>


			</v-list>
		</v-col>
		<v-col cols="9">
			<router-view></router-view>
		</v-col >
	</v-row>
</template>

<script>

export default {
  data: () => ({
		user: [
			['Management', 'mdi-account-multiple-outline'],
			['Settings', 'mdi-cog-outline'],
		],
		product: [
			['List', 'mdi-account-multiple-outline', '/admin/product/list'],
			['Create', 'mdi-cog-outline', '/admin/product/create'],
			['View', 'mdi-update', 'product/view'],
			['Update', 'mdi-update', 'product/update'],
		],
		admins: [
			['Management', 'mdi-account-multiple-outline'],
			['Settings', 'mdi-cog-outline'],
		],
		cruds: [
			['List', 'mdi-menu'],
			['Create', 'mdi-plus-outline'],
			['Read', 'mdi-file-outline'],
			['Update', 'mdi-update'],
			['Delete', 'mdi-delete'],
		],
	}),
}
</script>