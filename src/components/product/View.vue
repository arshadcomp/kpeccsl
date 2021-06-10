<template>
	<v-row class="mb-3">
		<v-col cols="12" md="4">
			<v-skeleton-loader
				v-if="this.loading"
				class="mx-auto"
				type="card"
			></v-skeleton-loader>
			<ProductImage :imgUrl="product.image" :hsn="product.hsn" />
		</v-col>
		<v-col cols="12" md="8" class="pt-md-6">
			<ProductName :name="product.name" :seller="product.seller" />
			<ProductPrice :product="product" class="mb-3" />
			<ProductDescription/>
			<Review/>
			<ProductButton v-if="product.inventory" :id="product.id" :stock="product.inventory.stock" />
		</v-col>
	</v-row>
</template>

<script>
import ProductImage from '@/components/product/Image'
import ProductName from '@/components/product/Name'
import ProductPrice from '@/components/product/Price'
import ProductButton from '@/components/product/Button'
import ProductDescription from '@/components/product/Description'
import Review from '@/components/product/Review'


export default {
	name: 'view-product',
	async mounted() {
		if (this.product.inventory === undefined)
			await this.$store.dispatch("getProduct", this.$route.params.id);
	},
	computed: {
		loading() {
			return this.$store.getters.loader
		},
		product() {
			return this.$store.getters.productById(this.$route.params.id)
		},
		featured() {
			return this.product.featured ? 'Featured' : null
		}
	},
	components: {
		ProductImage,
		ProductName,
		ProductPrice,
		ProductButton,
		ProductDescription,
		Review
	}
}
</script>