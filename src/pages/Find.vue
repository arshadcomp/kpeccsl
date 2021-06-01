<template>
	<v-sheet
		class="overflow-hidden"
    style="position: relative;"
	>
		<v-navigation-drawer
      v-model="drawer"
			absolute
      temporary
      right
    >
		
      <v-list dense subheader>
				<v-subheader>Filters</v-subheader>
				<v-checkbox
					dense
					v-for="(category, i) in categories"
					:key="i"
					v-model="selected"
					:value="category.hsn"
				>
				<template v-slot:label>
					<span class="text-capitalize">{{category.name.toLowerCase()}}</span>
				</template>
				</v-checkbox>
				<!-- <v-list-item>
					<v-switch
						v-model="withStock"
						:label="stockSwitchLabel"
					></v-switch>
				</v-list-item> -->
				
				<!-- <v-alert dense border="left" color="error" dark>Other filters are still under development</v-alert> -->
        <!-- <v-list-item v-for="category in categories" :key="category">
					<template v-slot:default="{ active }">
						<v-list-item-action>
							<v-checkbox :input-value="active"></v-checkbox>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>{{category}}</v-list-item-title>
						</v-list-item-content>
					</template>
				</v-list-item> -->
      </v-list>
    </v-navigation-drawer>

		<div class="d-flex justify-space-between mb-6">
			<h2 class="d-none d-sm-flex">Search Products</h2>
			<h2 class="d-flex d-sm-none">Search</h2>
			<v-btn
				color="primary"
				dark
				@click.stop="drawer = !drawer"
				class="d-flex"
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
		
		<v-list v-if="$vuetify.breakpoint.mobile" three-line>
			<v-list-item v-for="product in displayedProducts" :key="product.id" class="px-0" @click="goto(product.id)">
				<ProductItem :id="product.id"/>
			</v-list-item>
			<v-pagination
				v-model="page"
				:length="numberOfPages"
			></v-pagination>
		</v-list>

		<v-container fluid v-else>
			<v-row>
				<v-col cols="3">
					Filter
					<v-checkbox
						dense
						v-for="(category, i) in categories"
						:key="i"
						v-model="selected"
						:value="category.hsn"
					>
					<template v-slot:label>
						<span class="text-capitalize">{{category.name.toLowerCase()}}</span>
					</template>
					</v-checkbox>
				</v-col>
				<v-col cols="9">
					<v-container fluid>
						<v-row>
							<v-col
								v-for="product in displayedProducts"
								:key="product.id"
								cols="4"
							>
								<ProductItem :id="product.id"/>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="pa-6">
								<v-pagination
									v-model="page"
									:length="numberOfPages"
								></v-pagination>
							</v-col>
						</v-row>
					</v-container>
				</v-col>
			</v-row>

			<!-- <v-row>
				<v-col
          v-for="product in displayedProducts"
          :key="product.id"
					cols="3"
        >
					<ProductItem :id="product.id"/>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-pagination
						v-model="page"
						:length="numberOfPages"
					></v-pagination>
				</v-col>
			</v-row> -->
		</v-container>
	</v-sheet>
</template>

<script>
import ProductItem from '@/components/product/ItemById'

export default {
	name: 'search',
	async created() {
		if(this.$store.state.products.length === 0)
			await this.$store.dispatch('productsWithName')
		this.$store.dispatch('productCategories')
	},
	data() {
		return {
			query: '',
			page: 1,
			perPage: 12,
			numberOfPages: 1,
			pages: [],

			drawer: false,
			withStock: false,

			selected: []
			// categories: [
			// 	'Baby Products',
			// 	'Grocery',
			// 	'Appliances',
			// 	'Home Furnishing'
			// ]
		}
	},
	watch: {
		group () {
			this.drawer = false
		},
		filteredProducts() {
			this.setNumberOfPages()
		},
		selected() {
			this.search()
			this.drawer = false
		}
	},
	computed: {
		stockSwitchLabel() {
			return this.withStock ? 'Include Out of Stock' : 'Remove Out of Stock'
		},
		sortedProducts() {
			return this.$store.getters.productsSortedByName
		},
		filteredProducts() {
			return this.search()
		},
		displayedProducts() {
			return this.paginate(this.filteredProducts)
		},
		categories() {
			return this.$store.getters.productCategories
		}
	},
	components: {
		ProductItem
	},
	methods: {
		clearQuery() {
			this.query = ''
		},
		search() {
			if(this.query)
				return this.sortedProducts.filter(p => p.keyword.includes(this.query.toLowerCase()))
			
			if(this.selected.length > 0){
				let categories = this.selected.join(' ')
				return this.sortedProducts.filter(p => categories.includes(p.hsn))
			}

			return this.sortedProducts
		},
		setNumberOfPages() {
			if(this.filteredProducts && this.filteredProducts.length > 0)
				this.numberOfPages = Math.ceil(this.filteredProducts.length/this.perPage)
			else
				this.numberOfPages = 1
		},
		paginate (products) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  products.slice(from, to);
    }
	}
}
</script>