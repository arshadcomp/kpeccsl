const ADD_TO_CART = 'ADD_TO_CART'
const INCREMENT_CART_QUANTITY = 'INCREMENT_CART_QUANTITY'
const DECREMENT_CART_QUANTITY = 'DECREMENT_CART_QUANTITY'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'
const EMPTY_BAGS = 'EMPTY_BAGS'
const PUSH_TO_BAG = 'PUSH_TO_BAG'


const mutations = {
	[ADD_TO_CART]: (state, payload) => {
		if(payload.leastCount)
			payload.quantity = payload.leastCount
		else
			payload.quantity = 1
		if(!payload.image) 
		// 	payload.image = payload.image
		// else 
			payload.image = 'https://source.unsplash.com/Hz4FAtKSLKo'

		state.cart.push(payload)
		console.log('Cart', state.cart)
	},
	[INCREMENT_CART_QUANTITY]: (state, product) => {
		if(product.leastCount === undefined)
			product.leastCount = 1
		if(product.inventory.stock !== undefined && product.inventory.stock !== 0 && (product.quantity + product.leastCount) < product.inventory.stock)
			product.quantity += product.leastCount
	},
	[DECREMENT_CART_QUANTITY]: (state, product) => {
		if(product.leastCount === undefined)
			product.leastCount = 1 
		if(product.quantity !== product.leastCount)
			product.quantity -= product.leastCount
	},
	[REMOVE_FROM_CART]: (state, product) => {
		const index = state.cart.findIndex(p => p.id === product.id)
		state.cart.splice(index, 1)
	},
	[EMPTY_CART] : (state) => {
		state.cart = []
	},
	[EMPTY_BAGS] : (state) => {
		state.bags = []
	},
	[PUSH_TO_BAG]: (state, {seller, item}) => {
		const index = state.bags.findIndex(bag => bag.seller.id === seller.id)
		if(index===-1) {
			state.bags.push(
				{
					seller: seller, 
					items: [item]
				}
			)
		} else {
			state.bags[index].items.push(item)
		}
	}
}

export default mutations