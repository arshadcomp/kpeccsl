<template>
	<v-sheet>
		<v-navigation-drawer
      v-model="drawer"
			absolute
      temporary
      right
    >
		
      <v-list dense subheader>
				<v-subheader>Filters</v-subheader>
				<v-list-item>
					<v-switch
						v-model="withStock"
						:label="stockSwitchLabel"
					></v-switch>
				</v-list-item>
				
				<v-alert dense border="left" color="error" dark>Other filters are still under development</v-alert>
        <v-list-item v-for="category in categories" :key="category">
					<template v-slot:default="{ active }">
						<v-list-item-action>
							<v-checkbox :input-value="active"></v-checkbox>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>{{category}}</v-list-item-title>
						</v-list-item-content>
					</template>
				</v-list-item>
      </v-list>
    </v-navigation-drawer>

		<div class="d-flex justify-space-between mb-6">
			<h2 class="d-none d-sm-flex">Search Products</h2>
			<h2 class="d-flex d-sm-none">Search</h2>
			<v-btn
				color="primary"
				dark
				@click.stop="drawer = !drawer"
				class="d-flex d-sm-none"
			>
				Filter
			</v-btn>
		</div>
		<v-text-field
			v-model="query"
			append-icon="mdi-magnify"
			filled
			clear-icon="mdi-close-circle"
			clearable
			label="Search"
			type="text"
			
			@click:append="search"
			@click:clear="clearQuery"
			@keyup.enter="search"

			max-width="200"
		></v-text-field>
		<!-- <p class="text-subtitle-1 mb-0">RESULTS</p> -->

		<v-row>
			<v-col :sm="12" :md="9">
				<v-row>
					<v-col>
						<ProductItems :withStock="withStock" />
					</v-col>
				</v-row>
			</v-col>
			<v-col :md="3" class="d-none d-md-flex">
				
				<v-list
					flat
					subheader
				>
					<v-subheader>Filters</v-subheader>
					<v-switch
						v-model="withStock"
						:label="stockSwitchLabel"
					></v-switch>
					<v-alert dense border="left" color="error" dark>Other Filters are still under development</v-alert>
					<v-list-item>
						<!-- <v-list-item-action>
							<v-switch
								v-model="withStock"
							></v-switch>
							<v-list-item-content>
								{{stockSwitchLabel}}
							</v-list-item-content>
						</v-list-item-action> -->
					</v-list-item>
					<v-list-item v-for="category in categories" :key="category">
						<template v-slot:default="{ active }">
							<v-list-item-action>
								<v-checkbox :input-value="active"></v-checkbox>
							</v-list-item-action>

							<v-list-item-content>
								<v-list-item-title>{{category}}</v-list-item-title>
							</v-list-item-content>
						</template>
					</v-list-item>
				</v-list>

			</v-col>
		</v-row>
	</v-sheet>
</template>

<script>
import ProductItems from '@/components/product/Items'

export default {
	name: 'search',
	// created() {
	// 	if(this.$store.products == 0)
	// 		this.$store.dispatch('allProducts')
	// },
	data() {
		return {
			query: '',
			drawer: false,
			withStock: false,
			categories: [
				'Baby Products',
				'Grocery',
				'Appliances',
				'Home Furnishing'
			],
			items: [
				{ title: 'Home', icon: 'mdi-home-city' },
				{ title: 'My Account', icon: 'mdi-account' },
				{ title: 'Users', icon: 'mdi-account-group-outline' },
			],
		}
	},
	watch: {
		group () {
			this.drawer = false
		},
	},
	computed: {
		stockSwitchLabel() {
			return this.withStock ? 'Include Out of Stock' : 'Remove Out of Stock'
		}
	},
	components: {
		ProductItems
	},
	methods: {
		clearQuery() {
			this.query = ''
		},
		search() {
			this.$store.dispatch('searchProducts', this.query.toLowerCase())
		}
	}
}
</script>