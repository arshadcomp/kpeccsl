<template>
	<v-sheet>
		<h3>Update Product Stock</h3>
		<v-form>
			<v-text-field
				v-model="product.name"
				:counter="100"
				label="Name"
				required
			></v-text-field>

			<v-text-field
				v-if="product.inventory"
				v-model="product.inventory.stock"
				:counter="10"
				label="Stock"
			></v-text-field>

			<v-btn
				color="warning"
				@click="updateStock"
			>
				UPDATE STOCK
			</v-btn>
		</v-form>

	</v-sheet>
</template>

<script>

export default {
	name: 'admin-product-stock-update',
	created() {
		if(this.$store.state.product.id!==this.$route.params.id)
			this.$store.dispatch('getProduct', this.$route.params.id)
	},
	computed: {
		loader() {
			return this.$store.state.showLoader
		},
		product() {
			let p = JSON.parse(JSON.stringify(this.$store.getters.product))
			return  p
		}
	},
	methods: {
		updateStock () {
			delete this.product.inventory.createdAt
			delete this.product.inventory.updatedAt
			this.product.inventory.stock = parseFloat(this.product.inventory.stock)
			this.$store.dispatch('updateInventory', this.product.inventory)
		}
	}
}
</script>