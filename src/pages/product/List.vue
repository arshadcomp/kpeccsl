<template>
	<b-container>
		<h2 class="font-courgette text-center display-2 mt-5 pt-5">Our Products</h2>
		<b-row>
			<b-col cols="12" md="4" class="mb-3" v-for="product in products" :key="product.id" >
				<product-item :product="product"></product-item>
			</b-col>
		</b-row>
		<!-- <b-card-group deck>
			<product-item v-for="product in products" :key="product.id" :product="product"></product-item>
		</b-card-group> -->
	</b-container>
</template>

<script>
import Item from '@/components/product/Item'

export default {
	name: 'product-list',
	created() {
		if(this.products.length === 0)
			this.$store.dispatch('allProducts')
	},
	computed: {
		products() {
			return this.$store.getters.allProducts
		}
	},
	components: {
		'product-item' : Item
	}
}
</script>