<template>
	<v-sheet>
		<h3 class="mb-6">Update Product</h3>
		<Form @save="update" :product="product" />
		<v-snackbar v-model="successSnackbar">Product Updated</v-snackbar>
		<v-snackbar v-model="errorSnackbar" color="error">Product Updated error</v-snackbar>
	</v-sheet>
</template>

<script>
import Form from '@/components/product/Form'

export default {
	name: 'update-product',
	components: {
		Form
	},
	data() {
		return {
			snackbarLoader: false,
			successSnackbar: false,
			errorSnackbar: false,
		}
	},
	computed: {
		loader() {
			return this.$store.getters.loader
		},
		error() {
			return this.$store.getters.error
		},
		product() {
			return this.$store.getters.product
		},
	},
	methods: {
		update(product) {
			const localProduct = JSON.parse(JSON.stringify(product))
			const localInventory = JSON.parse(JSON.stringify(product.inventory))
			console.log('PRODUCT', this.product)
			console.log('LOCAL PRODUCT', localProduct)
			// if(product.inventory.stock!==localProduct.inventory.stock)
				this.$store.dispatch('updateInventory', { id: localProduct.inventory.id, stock: parseFloat(localInventory.stock) })
			
			delete localProduct.inventory
			delete localProduct.createdAt
			delete localProduct.updatedAt
			product.sellerID = this.$store.getters.seller.id
			product.seller = this.$store.getters.seller
			this.$store.dispatch('updateProduct', localProduct)
		}
	},
	// watch: {
	// 	loader: function(oldLoader, newLoader) {
	// 		if(oldLoader && !newLoader)
	// 			this.snackbarLoader = true
	// 	}
	// }
}
</script>
