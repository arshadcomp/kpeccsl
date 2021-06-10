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
	productsInCategory: (state, getters) => {
		if(getters.selectedCategories.length > 0) {
			const selectedCategoriesHsn = getters.selectedCategories.map(category => category.hsn)
			console.log('SELECTED CATEGORIES IN GETTERS', selectedCategoriesHsn)
			return state.products.filter(product => selectedCategoriesHsn.includes(product.hsn))
		}
		return state.products
	}
}

export default getters