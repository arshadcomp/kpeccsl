<template>
	<v-sheet>
		<Caraousel/>

		<v-alert
			border="left"
			color="indigo"
			:icon="$vuetify.breakpoint.mobile ? false : 'mdi-package'"
			dark
			prominent
		>
			<h2>Limited Stock</h2>
			<p>Since its just the begining we have loaded the app with limited number of items which will increase in coming days.</p>
		</v-alert>

		<div v-for="list in featuredLists" :key="list.name" class="mb-12">
			<div class="mb-3 d-flex justify-space-between align-center">
				<v-subheader class="text-uppercase">{{list.name.split('_').join(' ') }}</v-subheader>
				<v-btn text to="/search">
					<v-icon>mdi-magnify</v-icon>Search
				</v-btn>
			</div>
			
			<v-row>
				<v-col v-for="id in list.ids" :key="id">
					<ProductItem :id="id" />
				</v-col>
			</v-row>
		</div>

		<!-- <ProductItems /> -->

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

	</v-sheet>
</template>

<script>
// import ProductItems from '@/components/product/Items'
import ProductItem from '@/components/product/ItemById'
import Caraousel from '@/components/Carousel'

export default {
	name: 'home',
	created() {
		// if(this.$store.state.products.length == 0)
		// 	this.$store.dispatch('allProducts')
		if(this.$store.state.productCategories.length === 0)
			this.$store.dispatch('productCategories')
		if(this.$store.state.featuredLists.length === 0)
			this.$store.dispatch('featuredLists')
	},
	computed: {
		featuredLists() {
			return this.$store.getters.featuredLists
		}
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
	}
}
</script>