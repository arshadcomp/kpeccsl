<template>
	<v-sheet>
		<h2 class="px-2 py-3">My Cart</h2>
		<v-alert v-for="(bag, index) in bags" :key="index" icon="mdi-information" color="secondary" dense dark border="left">
			<strong>{{bag.seller.name}}</strong> : Atleast {{bag.seller.minCartItem}} items and minimum cart value of &#8377; {{bag.seller.minCartAmount}} is required for delivery
		</v-alert>

		<!-- <v-alert icon="mdi-information" type="info" border="left">Applicable for KPECCSL Only: Atleast {{minCartItem}} items and minimum cart value of &#8377; {{minCartAmount}} are required for delivery.</v-alert>
		<v-alert icon="mdi-information" type="warning" border="left">There is no limit on amount or quantity for vegetables. If you are not able to order, please remove everything from cart. Refresh the page and add to cart again.</v-alert> -->
	
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
		bags() {
			return this.$store.getters.bags
		},
		// minCartAmount() {
		// 	return this.$store.state.minCartAmount
		// },
		// minCartItem() {
		// 	return this.$store.state.minCartItem
		// }
	},
	components : {
		'product-item' : ProductItem,
	}
}
</script>