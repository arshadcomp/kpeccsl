// import { appGetters } from './getters/app'

// export default appGetters

export const appGetters = {
	loader: (state) => {
		return state.showLoader
	}
}

export const userGetters = {
	user: (state) => {
		return state.user
	},
	userById: (state) => id => {
		return state.users.find(u => u.Username === id)
	},
	isAdmin: (state) => {
		return state.isAdmin
	},
	name: (state, getters) => id => {
		const user = getters.userById(id)
		return user ? user.UserAttributes.find(u => u.Name==='name').Value : ''
	},
	address: (state, getters) => id => {
		const user = getters.userById(id)
		return user ? user.UserAttributes.find(u => u.Name==='address').Value+' Kaiga Township, Mallapur, Uttara Kannada, Karanatka-581400' : ''
	},
	phone: (state, getters) => id => {
		const user = getters.userById(id)
		return user ? user.UserAttributes.find(u => u.Name==='phone_number').Value : ''
	}
}

export const productGetters = {
	allProducts: (state) => {
		return state.products
	},
	products: (state) => {
		return state.products
	},
	productsWithStock: (state) => {
		return state.products.filter(p => p.inventory.stock > 0)
	},
	product: (state) => {
		return state.product
	},
	featuredProducts: (state) => {
		if (state.products.length > 0) {
			return state.products.filter(p => p.featured === true)
		}
	},
	productById: (state) => id => {
		return state.products.find(p => p.id === id)
	},
	productcategories: (state) => {
		return state.productCategories
	},
	productCategory: (state) => hsn => {
		return state.productCategories.find(c => c.hsn.includes(hsn))
	},
	featuredLists: (state) => {
		return state.featuredLists
	}
}

// function getRandom(arr, n) {
// 	var result = new Array(n),
// 			len = arr.length,
// 			taken = new Array(len);
// 	if (n > len)
// 			throw new RangeError("getRandom: more elements taken than available");
// 	while (n--) {
// 			var x = Math.floor(Math.random() * len);
// 			result[n] = arr[x in taken ? taken[x] : x];
// 			taken[x] = --len in taken ? taken[len] : len;
// 	}
// 	return result;
// }

export const cartGetters = {
	cart: (state) => {
		return state.cart
	}
}

export const orderGetters = {
	order: (state) => {
		return state.order
	},
	orders: (state) => {
		return state.orders
	},
	orderById: (state) => id => {
		return state.orders.find(o => o.id===id)
	},
}