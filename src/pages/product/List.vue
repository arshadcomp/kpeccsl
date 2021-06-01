<template>
	<div>
		<h3>Products List</h3>
		<v-alert type="warning" icon="mdi-alert-circle" v-if="error"
			>Sorry, There seems to be some network issue, products could not be
			fetched. Try after some time.</v-alert
		>

		<!-- <v-row>
			<v-col v-for="product in products" :key="product.id">
				<Product  :id="product.id"/>
			</v-col>
		</v-row> -->

		<v-data-iterator
			v-if="products.length > 12"
			:items="products"
			:items-per-page.sync="itemsPerPage"
			:page.sync="page"
			:search="search"
			:sort-by="sortBy.toLowerCase()"
			:sort-desc="sortDesc"
			hide-default-footer
		>
			<template v-slot:header>
				<v-toolbar dark color="blue darken-3" class="mb-1">
					<v-text-field
						v-model="search"
						clearable
						flat
						solo-inverted
						hide-details
						prepend-inner-icon="mdi-magnify"
						label="Search"
					></v-text-field>
					<template v-if="$vuetify.breakpoint.mdAndUp">
						<v-spacer></v-spacer>
						<v-select
							v-model="sortBy"
							flat
							solo-inverted
							hide-details
							:items="keys"
							prepend-inner-icon="mdi-magnify"
							label="Sort by"
						></v-select>
						<v-spacer></v-spacer>
						<v-btn-toggle v-model="sortDesc" mandatory>
							<v-btn large depressed color="blue" :value="false">
								<v-icon>mdi-arrow-up</v-icon>
							</v-btn>
							<v-btn large depressed color="blue" :value="true">
								<v-icon>mdi-arrow-down</v-icon>
							</v-btn>
						</v-btn-toggle>
					</template>
				</v-toolbar>
			</template>

			<template v-slot:default="props">
				<v-row>
					<v-col
						v-for="item in props.items"
						:key="item.id"
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<Product :id="item.id"/>
					</v-col>
				</v-row>
			</template>

			<template v-slot:footer>
				<v-row class="mt-2 pa-6" align="center" justify="center">
					<span class="grey--text">Items per page</span>
					<v-menu offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								dark
								text
								color="primary"
								class="ml-2"
								v-bind="attrs"
								v-on="on"
							>
								{{ itemsPerPage }}
								<v-icon>mdi-chevron-down</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item
								v-for="(number, index) in itemsPerPageArray"
								:key="index"
								@click="updateItemsPerPage(number)"
							>
								<v-list-item-title>{{ number }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>

					<v-spacer></v-spacer>

					<span class="mr-4 grey--text">
						Page {{ page }} of {{ numberOfPages }}
					</span>
					<v-btn
						fab
						dark
						color="blue darken-3"
						class="mr-1"
						@click="formerPage"
					>
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
				</v-row>
			</template>
		</v-data-iterator>

		<v-overlay :value="loader"></v-overlay>
	</div>
</template>

<script>
import Product from '@/components/product/Item'

export default {
	name: "product-list",
	async created() {
		console.log(this.products.length);
		if (this.products.length === 0) 
			// await this.$store.dispatch("productsWithName");
			await this.$store.dispatch("listProducts", { limit: 5000, withInventory: false });
	},
	data() {
		return {
			itemsPerPageArray: [4, 8, 12],
			search: "",
			filter: {},
			sortDesc: false,
			page: 1,
			itemsPerPage: 12,
			sortBy: "name",
			keys: [
				"Name",
				"Price",
				"Inventory"
			]
		};
	},
	computed: {
		loader() {
			return this.$store.getters.loader;
		},
		error() {
			return this.$store.getters.error;
		},
		products() {
			return this.$store.getters.products;
		},
		numberOfPages() {
			return Math.ceil(this.products.length / this.itemsPerPage);
		},
		filteredKeys() {
			return this.keys.filter((key) => key !== "Name");
		},
	},
	methods: {
		nextPage() {
			if (this.page + 1 <= this.numberOfPages) this.page += 1;
		},
		formerPage() {
			if (this.page - 1 >= 1) this.page -= 1;
		},
		updateItemsPerPage(number) {
			this.itemsPerPage = number;
		},
	},
	components: {
		Product
	},
};
</script>