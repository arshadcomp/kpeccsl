const PUSH_PRODUCTS = 'PUSH_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const UPDATE_INVENTORY = 'UPDATE_INVENTORY'

const mutations = {
	[PUSH_PRODUCTS]: (state, products) => {
		products.forEach(p => {
			const index = state.products.findIndex(s => s.id===p.id)
			if(index < 0)
				state.products.push(p)
			else
				state.products[index] = p
		})
	},
	[UPDATE_PRODUCT]: (state, product) => {
		state.product = product
		state.products = state.products.map(p => {
			if (p.id === product.id)
				p = product
			return p
		})
	},
	[UPDATE_INVENTORY]:(state, inventory) => {
		state.products = state.products.map(p => {
			if (p.inventory && p.inventory.id === inventory.id)
				p.inventory = inventory
			return p
		})
	}
}

export default mutations
