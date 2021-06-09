<template>
	<v-sheet>
		<Caraousel/>

		<!-- <v-alert
			border="left"
			color="error"
			:icon="$vuetify.breakpoint.mobile ? false : 'mdi-account'"
			dark
			prominent
		>
			<h2>Profile Update</h2>
			<p>Please update your area in the Profile section after login. This will help us better manage our deliveries.</p>
		</v-alert> -->

		<v-alert
			border="left"
			color="error"
			:icon="$vuetify.breakpoint.mobile ? false : 'mdi-package'"
			dark
			prominent
		>
			<h2>Technical Error</h2>
			<p>Due to a glitch in server, a few user ID's have changed. If you are not able to login, please create a new account. We really apologise for the inconvenience.</p>
		</v-alert>

		<div class="mb-6">
			<h3>Featured Products</h3>
			<v-row v-if="featuredProducts.length > 0">
				<v-col v-for="product in featuredProducts" :key="product.id">
					<ProductItem :id="product.id" />
				</v-col>
			</v-row>
		</div>

		<div class="mb-6">
			<h3>New Arrivals</h3>
			<v-row v-if="latestProducts.length > 0">
				<v-col v-for="product in latestProducts" :key="product.id">
					<ProductItem :id="product.id" />
				</v-col>
			</v-row>
		</div>

		<h3>Random Selection</h3>
		<v-row v-if="products">
			<v-col v-for="product in products" :key="product.id">
				<ProductItem :id="product.id" />
			</v-col>
		</v-row>

		<v-alert
			border="left"
			color="error"
			:icon="$vuetify.breakpoint.mobile ? false : 'mdi-alert-circle'"
			dark
			prominent
			class="mt-6"
		>
			<h2>Errors</h2>
			<p>We are in the process of finalising the app and it has not been tested very thoroughly, so you may encounter certain bugs during you shopping experience. Please do inform us about the errors screenshot and be rest assured we will rectify them as soon as possible.</p>
		</v-alert>
		<v-alert
			border="left"
			color="secondary"
			:icon="$vuetify.breakpoint.mobile ? false : 'mdi-github'"
			dark
			prominent
			class="mt-6"
		>
			<h2>Open Source</h2>
			<p>This is an open source project developed by Mohammad Arshad. Source code is available as Git Repo on <v-icon>mdi-github</v-icon> GitHub. Feel free to fork and contribute for the improvements of the project.</p>
		</v-alert>

	</v-sheet>
</template>

<script>
// import ProductItems from '@/components/product/Items'
import ProductItem from '@/components/product/ItemById'
import Caraousel from '@/components/Carousel'

export default {
	name: 'home',
	async created() {
		if(this.$store.state.products.length < 12)
			await this.$store.dispatch('productsWithName')
		// this.$store.dispatch('productCategories')
	},
	// created() {
	// 	// if(this.$store.state.products.length == 0)
	// 	// 	this.$store.dispatch('allProducts')
	// 	if(this.$store.state.productCategories.length === 0)
	// 		this.$store.dispatch('productCategories')
	// 	if(this.$store.state.featuredLists.length === 0)
	// 		this.$store.dispatch('featuredLists')
	// },
	computed: {
		featuredProducts() {
			return this.$store.getters.featuredProducts
		},
		latestProducts() {
			return this.$store.getters.latestProducts
		},
		products() {
			return this.$store.getters.productsSortedByName.length > 12 ? this.getRandom(this.$store.getters.productsSortedByName, 12) : null
		},
	},
	components: {
		Caraousel,
		// ProductItems,
		ProductItem
	},
	data: () => ({
		searchQuery: ''
	}),
	methods: {
		getRandom(arr, n) {
			var result = new Array(n),
					len = arr.length,
					taken = new Array(len);
			if (n > len)
					throw new RangeError("getRandom: more elements taken than available");
			while (n--) {
					var x = Math.floor(Math.random() * len);
					result[n] = arr[x in taken ? taken[x] : x];
					taken[x] = --len in taken ? taken[len] : len;
			}
			return result;
		}
	}
}
</script>