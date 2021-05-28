// import { appGetters } from './getters/app'

// export default appGetters

export const appGetters = {
	loader: (state) => {
		return state.showLoader
	},
	sellers: (state) => {
		return state.sellers
	},
	sellerById: (state) => id => {
		return state.sellers.find(s => s.id===id)
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
		return getters.attributeFromUser(getters.userById(id), 'name')
	},
	address: (state, getters) => id => {
		return getters.attributeFromUser(getters.userById(id), 'address')
	},
	employee_no: (state, getters) => id => {
		return getters.attributeFromUser(getters.userById(id), 'custom:employee_no')
	},
	phone: (state, getters) => id => {
		return getters.attributeFromUser(getters.userById(id), 'phone_number')
	},
	area: (state, getters) => id => {
		return getters.attributeFromUser(getters.userById(id), 'custom:area')
	},
	attributeFromUser: () => (user, attribute) => {
		let name = ''
		if(user && user.UserAttributes)
			name = user.UserAttributes.find(u => u.Name===attribute)
		if(name!==undefined)
			return name.Value
		return ''
	},
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
	productsSortedByName: (state) => {
		let products = JSON.parse(JSON.stringify(state.products))
		return products.sort((p1, p2)=> p1.keyword.localeCompare(p2.keyword) )
	},
	product: (state) => {
		return state.product
	},
	featuredProducts: (state) => {
		// console.log('PROD', state.products)
		// const featured = state.products.filter(p => p.featured === 'true')
		// console.log('FEAT PROD', featured)
		// if (state.products.length > 0) {
			return state.products.filter(p => p.featured === true).slice(0,12)
		// }
	},
	latestProducts: (state) => {
		let products = JSON.parse(JSON.stringify(state.products))
		return products.sort((p1,p2) => p1.createdAt < p2.createdAt).slice(0,12)
	},
	productById: (state) => id => {
		return state.products.find(p => p.id === id)
	},
	productCategories: (state) => {
		let categories = JSON.parse(JSON.stringify(state.productCategories))
		return categories.sort((c1,c2) => c1.name.localeCompare(c2.name))
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
	nextToken: (state) => {
		return state.nextToken
	}
}