<template>
	<v-sheet class="overflow-hidden" style="position: relative">
		<v-navigation-drawer v-model="drawer" absolute temporary right>
			<!-- <v-list dense subheader>
				<v-subheader>Filters</v-subheader>
				<v-checkbox
					dense
					v-for="(category, i) in categories"
					:key="i"
					v-model="selected"
					:value="category.hsn"
				>
					<template v-slot:label>
						<span class="text-capitalize">{{
							category.name.toLowerCase()
						}}</span>
					</template>
				</v-checkbox>
			</v-list> -->
			<CategoryList/>
		</v-navigation-drawer>

		<div class="mx-n3 mx-lg-auto">
			<v-alert type="warning" icon="mdi-alert-circle" v-if="error"
				>Sorry, There seems to be some network issue, products could not be
				fetched. Try after some time.</v-alert
			>

			<v-progress-linear
				v-if="loader"
				indeterminate
				color="primary"
			></v-progress-linear>

			<v-data-iterator
				:items="products"
				:items-per-page.sync="itemsPerPage"
				:page.sync="page"
				:search="search"
				:sort-by="sortBy.toLowerCase()"
				:sort-desc="sortDesc"
				hide-default-footer
			>
				<template v-slot:header>
					<v-toolbar light class="mb-1">
						<v-text-field
							v-model="search"
							clearable
							flat
							solo-inverted
							hide-details
							prepend-inner-icon="mdi-magnify"
							label="Search"
							class="mr-2"
						></v-text-field>
						<v-btn
							color="primary"
							dark
							large
							@click.stop="drawer = !drawer"
						>
							Filter
						</v-btn>
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
							<Product :id="item.id" />
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
						<v-btn
							fab
							dark
							color="blue darken-3"
							class="ml-1"
							@click="nextPage"
						>
							<v-icon>mdi-chevron-right</v-icon>
						</v-btn>
					</v-row>
				</template>
			</v-data-iterator>

			<!-- <v-overlay :value="loader"></v-overlay> -->
		</div>
	</v-sheet>
</template>

<script>
import Product from "@/components/product/Item";
import CategoryList from '@/components/product/CategoryList'

export default {
	name: "product-list",
	created() {
		this.$store.commit("SET_ERROR", false);
		this.$store.commit("NEXT_TOKEN", null);
		this.init();
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
			keys: ["Name", "Price", "Inventory"],
			drawer: false,
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
			return this.$store.getters.productsInCategory;
		},
		selectedCategories() {
			return this.$store.getters.selectedCategories
		},
		numberOfPages() {
			return Math.ceil(this.products.length / this.itemsPerPage);
		},
		filteredKeys() {
			return this.keys.filter((key) => key !== "Name");
		},
	},
	methods: {
		init() {
			this.$store.dispatch("listProducts", 2000);
			this.$store.dispatch("listCategories", 100);
		},
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
		Product,
		CategoryList
	}
};
</script>