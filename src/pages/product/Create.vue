<template>
	<v-sheet>
		<h3>Create New Product</h3>
		<v-alert type="warning" dense>Ensure same product doesn't exist in the list before creating new one.</v-alert>
		<Form @save="create" />
		<v-snackbar v-model="errorSnackbar" color="error">Create Product Error. Product with same code exist.</v-snackbar>
	</v-sheet>
</template>

<script>
import Form from '@/components/product/Form'

export default {
	name: 'create-product',
	components: {
		Form
	},
	data() {
		return {
			// snackbarLoader: false,
			successSnackbar: false,
			errorSnackbar: false,
		}
	},
	methods: {
		async create(product) {
			console.log('PRODUCT', product)
			//Ensure product with same code doesn't exist.
			const productByCode = await this.$store.dispatch('productByCode', product.code)
			console.log('PRODUCT', productByCode)
			if(productByCode.length > 0){
				this.errorSnackbar = true
				return false
			}

			const localInventory = JSON.parse(JSON.stringify(product.inventory))
			const inventory = await this.$store.dispatch('createInventory', localInventory.stock )
			if(inventory) {
				product.productInventoryId = inventory.id
				delete product.inventory
				// product.sellerID = this.$store.getters.seller.id
				const seller = this.$store.getters.sellerById(product.sellerID)
				
				product.seller = {name: seller.name, gstin: seller.gstin }
				const createdProduct = await this.$store.dispatch('createProduct', product)
				createdProduct.inventory = localInventory
				if(createdProduct) {
					this.$store.commit("SET_PRODUCT", createdProduct);
					this.$router.push({ path: "/product/view" });
				}
			}
		}
	}
}
</script>
