const getters = {
	product: (state) => {
			return state.product
	},
	productById: (state) => id => {
		return state.products.find(p => p.id === id)
	},

	products: (state) => {
			return state.products
	},
	productsWithInventory: (state) => {
			return state.products.filter(p => p.inventory!==undefined)
	},
	productsWithStock: (state, getters) => {
			return getters.productsWithInventory.filter(p => p.inventory.stock > 0)
	},
	productsSortedByName: (state) => {
			let products = JSON.parse(JSON.stringify(state.products))
			return products.sort((p1, p2)=> p1.keyword.localeCompare(p2.keyword) )
	},
	productCategory: (state, hsn) => {
		console.log(state)
		console.log(hsn)
		return 'Tea'
	}
}

export default getters