import {
	TOGGLE_DRAWER,

	SET_AUTH_STATE,
	SET_AUTH_DATA,

	GET_USER_SUCCESS,
	

	SHOW_LOADER,
	HIDE_LOADER,

	ADD_PRODUCT,
	ADD_PRODUCT_SUCCESS,
	PRODUCT_BY_ID,
	PRODUCT_BY_ID_SUCCESS,
	ALL_PRODUCTS,
	ALL_PRODUCTS_SUCCESS,
	UPDATE_PRODUCT,
	UPDATE_PRODUCT_SUCCESS,
	REMOVE_PRODUCT,
	REMOVE_PRODUCT_SUCCESS,

	UPDATE_INVENTORY,

	ALL_CATEGORY_SUCCESS,
	FEATURED_LISTS,

	ADD_TO_CART,
	UPDATE_CART_NO_STOCK,
	INCREMENT_CART_QUANTITY,
	DECREMENT_CART_QUANTITY,
	REMOVE_FROM_CART, 
	CREATE_ORDER, 
	CREATE_ORDER_SUCCESS, 
	CREATE_ORDER_FAILURE,

	LIST_ORDER_SUCCESS
} from './mutation-types'

export const appMutations = {
	[SHOW_LOADER]: (state) => {
		state.showLoader = true
	},
	[HIDE_LOADER]: (state) => {
		state.showLoader = false
	},
	[TOGGLE_DRAWER](state) {
		state.drawer = !state.drawer
	}
}

export const userMutations = {
	[SET_AUTH_STATE] (state, authState) {
		state.authorized = authState === 'signedin' ? true : false;
	},
	[SET_AUTH_DATA](state, authData) {
		state.user = authData
		if(authData.signInUserSession.accessToken.payload['cognito:groups'].indexOf('Admin') > -1) 
			state.isAdmin = true
		else 
			state.isAdmin = false
	},
	[GET_USER_SUCCESS](state, payload) {
		if(state.users.findIndex(u => u.Username ===payload.Username) < 0)
			state.users.push(payload)
		state.showLoader = false
	}
}

export const productMutations = {
	[ADD_PRODUCT]: (state) => {
		state.showLoader = true
	},
	[ADD_PRODUCT_SUCCESS]: (state, payload) => {
		state.showLoader = false
		state.products.push(payload)
	},
	[PRODUCT_BY_ID] (state) {
		state.showLoader = true
	},
	[PRODUCT_BY_ID_SUCCESS] (state, payload) {
		state.showLoader = false
		state.product = payload
		if(state.products.findIndex(p=> p.id===payload.id) < 0)
			state.products.push(payload)
	},
	[ALL_PRODUCTS] (state) {
		state.showLoader = true
	},
	[ALL_PRODUCTS_SUCCESS] (state, payload) {
		state.showLoader = false
		state.products = payload
	},
	[UPDATE_PRODUCT]: (state) => {
		state.showLoader = true
	},
	[UPDATE_PRODUCT_SUCCESS]: (state, payload) => {
		state.showLoader = false
		state.product = payload
		state.products = state.products.map(p => {
			if(p.id === payload.id)
				p = payload
			return p
		})
	},
	[REMOVE_PRODUCT] (state) {
		state.showLoader = true
	},
	[REMOVE_PRODUCT_SUCCESS](state, payload) {
		state.showLoader = false
		let index = state.products.findIndex(m => m.id === payload)
		state.products.splice(index, 1)
		if(state.product.id === payload)
			state.product = {}
	},

	// [INVENTORY_BY_PRODUCT_SUCCESS](state, payload) {
	// 	state.products.map(p => {
	// 		if(p.id === payload.productID)
	// 			p.stock = payload.stock
	// 	})
	// 	console.log('PRODUCTS', state.products)
	// },

	[ALL_CATEGORY_SUCCESS] (state, payload) {
		state.showLoader = false
		state.productCategories = payload
	},
	[FEATURED_LISTS] (state, payload) {
		state.showLoader = false
		state.featuredLists = payload
	}
}



export const cartMutations = {
	[ADD_TO_CART]: (state, payload) => {
		payload.quantity = 1
		const category = state.productCategories.find(c => c.hsn.includes(payload.hsn))
		if(category)
				payload.image = category.images[Math.floor(Math.random() * category.images.length)]
		else
			payload.image =  'https://source.unsplash.com/Hz4FAtKSLKo/640x480'
		state.cart.push(payload)
		console.log('Cart', state.cart)
	},
	[UPDATE_CART_NO_STOCK]: (state, product_id) => {
		const index = state.cart.findIndex(p => p.id === product_id)
		state.cart[index].quantity = 0
	},
	[INCREMENT_CART_QUANTITY]: (state, product) => {
		if(product.inventory.stock !== undefined && product.inventory.stock !== 0 && product.quantity < product.inventory.stock)
			product.quantity++
		// Here indication for maximum stock reached to be displayed.
		console.log('CART ITEM INCREMENT', state.cart)
	},
	[DECREMENT_CART_QUANTITY]: (state, product) => {
		if(product.quantity !== product.leastCount)
			product.quantity--
		console.log('CART ITEM DECREMENT', state.cart)
	},
	[REMOVE_FROM_CART]: (state, product_id) => {
		const index = state.cart.findIndex(p => p.id === product_id)
		state.cart.splice(index, 1)
	}
}

export const orderMutations = {
	[CREATE_ORDER]: (state) => {
		state.showLoader = true
	},
	[CREATE_ORDER_SUCCESS]: (state, order) => {
		console.log('ORDER', order)
		state.cart = []
		state.order = order
		state.showLoader = false
	},
	[CREATE_ORDER_FAILURE] : (state, error) => {
		console.log('ORDER ERROR', error)
		state.order = false
		state.showLoader = false
	},
	[UPDATE_INVENTORY]: (state) =>  {
		state.showLoader = false
	},
	[LIST_ORDER_SUCCESS] : (state, payload) => {
		state.orders = payload
	}
}