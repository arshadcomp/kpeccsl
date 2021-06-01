const ADD_PRODUCT = 'ADD_PRODUCT'
const SET_PRODUCT = 'SET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const LIST_PRODUCTS = 'LIST_PRODUCTS'
const PUSH_PRODUCTS = 'PUSH_PRODUCTS'

const mutations = {
	[ADD_PRODUCT]: (state, product) => {
		state.products.push(product)
	},
	[SET_PRODUCT]: (state, product) => {
		state.product = product
	},
	// [ADD_PRODUCT_WITH_INVENTORY] : (state, product) => {
	//     const index = state.products.findIndex(p=> p.id===product.id)
	//     if(index > 0)
	//         state.products.splice(index, 1)
	//     state.product.push(product)
	// },
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
	},
	[REMOVE_PRODUCT](state, id) {
		state.showLoader = false
		let index = state.products.findIndex(p => p.id === id)
		state.products.splice(index, 1)
		if (state.product.id === id)
			state.product = {}
	},
	[LIST_PRODUCTS]: (state, products) => {
		state.products = products
	},
	[PUSH_PRODUCTS]: (state, products) => {
		products.forEach(p => {
			const index = state.products.findIndex(s => s.id===p.id)
			if(index < 0)
				state.products.push(p)
			else
				state.products[index] = p
		})
	}
}

export default mutations
