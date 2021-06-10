<template>
	<v-btn
		v-if="!inStock"
		color="error"
		outlined
		disabled
		:small="$vuetify.breakpoint.mobile"
	>
		Out of Stock
	</v-btn>
	<v-btn
		v-else-if="inStock && inCart"
		color="info"
		:small="$vuetify.breakpoint.mobile"
		outlined
		disabled
	>
		Item in Cart
	</v-btn>
	<v-btn
		v-else-if="inStock && !inCart"
		color="warning"
		:small="$vuetify.breakpoint.mobile"
		@click.stop="addToCart"
	>
		Add To Cart
	</v-btn>
</template>

<script>
export default {
	name: "product-button",
	props: {
		id: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
	},
	computed: {
		cart() {
			return this.$store.getters.cart
		},
		inStock() {
			return this.stock > 0;
		},
		inCart() {
			return this.cart.findIndex(item => item.id===this.id) !== -1
		},
	},
	methods: {
		addToCart() {
			// console.log('Add To Cart')
			let product = this.$store.getters.productById(this.id)
			if(!product.image)
				product.image = this.$store.getters.categoryImageByHsn(product.hsn)
			this.$store.commit("ADD_TO_CART", product);
		},
	},
};
</script>