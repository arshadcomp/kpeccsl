<template>
	<v-sheet>
		<h2 class="px-2 py-3">My Cart</h2>
		<v-alert icon="mdi-information" type="info" border="left">Minimum cart value for delivery is &#8377; {{minCartAmount}}</v-alert>
		<div class="p-0 mb-3">
				<h5 v-if="cart.length === 0" class="pa-3"><v-icon color="error">mdi-information</v-icon> Sorry, your cart is empty.</h5>
				<template v-else v-for="product in cart">
						<product-item :product="product" :key="product.id"></product-item>
				</template>
		</div>
	</v-sheet>
</template>

<script>
import ProductItem from '@/components/product/CartItem'

export default {
	computed: {
		cart() {
			return this.$store.getters.cart
		},
		minCartAmount() {
			return this.$store.state.minCartAmount
		}
	},
	components : {
		'product-item' : ProductItem,
	}
}
</script>