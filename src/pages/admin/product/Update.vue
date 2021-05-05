<template>
	<v-sheet>
		<h3>Update Product</h3> 
		<Form v-if="product.inventory" :product="product" isEditing=true />

		<v-snackbar v-model="snackbarLoader" class="text-center">
			Product Updated
		</v-snackbar>

	</v-sheet>
</template>

<script>
import Form from '@/components/product/Form'

export default {
	name: 'admin-product-update',
	created() {
		if(this.$store.state.product.id!==this.$route.params.id)
			this.$store.dispatch('getProduct', this.$route.params.id).then
	},
	data() {
		return {
			snackbarLoader: false
		}
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
	components: {
		Form
	},
	watch: {
		loader: function(oldLoader, newLoader) {
			if(oldLoader && !newLoader)
				this.snackbarLoader = true
		}
	}
}
</script>