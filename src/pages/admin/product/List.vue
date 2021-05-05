<template>
	<v-sheet>
		<h3>All Products</h3>
		<v-text-field
			v-model="query"
			append-icon="mdi-magnify"
			filled
			clear-icon="mdi-close-circle"
			clearable
			label="Search"
			type="text"
			
			@click:append="search"
			@click:clear="clearQuery"
			@keyup.enter="search"
		></v-text-field>

		<ProductItems />
	</v-sheet>
</template>

<script>
import ProductItems from '@/components/product/Items'

export default {
	name: 'admin-product-list',
	data() {
		return {
			query: ''
		}
	},
	components: {
		ProductItems
	},
	methods: {
		clearQuery() {
			this.query = ''
		},
		search() {
			this.$store.dispatch('listProducts', this.query.toLowerCase())
		}
	}

}
</script>