<template>
	<b-container class="p-3">
		<b-row>
			<b-col cols="1">
				<b-icon icon="check2-square" variant="info"></b-icon>
			</b-col>
			<b-col cols="9">
				<h6 class="text-secondary">ORDER SUMMARY</h6>
				<strong>{{cart.length}} Items</strong>
			</b-col>
			<b-col cols="2">
				<b-button size="sm" :to="'/cart'" variant="outline-info" class="float-right">CHANGE</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			cart: this.$store.state.cart
		}
	}
}
</script>