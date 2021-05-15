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
		// const user = getters.userById(id)
		return getters.attributeFromUser(getters.userById(id), 'name')
		// return user ? user.UserAttributes.find(u => u.Name==='name').Value : ''
	},
	address: (state, getters) => id => {
		return getters.attributeFromUser(getters.userById(id), 'address')
		// const user = getters.userById(id)
		// return user ? user.UserAttributes.find(u => u.Name==='address').Value+' Kaiga Township, Mallapur, Uttara Kannada, Karanatka-581400' : ''
	},
	phone: (state, getters) => id => {
		return getters.attributeFromUser(getters.userById(id), 'phone_number')
		// const user = getters.userById(id)
		// return user ? user.UserAttributes.find(u => u.Name==='phone_number').Value : ''
	},
	area: (state, getters) => id => {
		return getters.attributeFromUser(getters.userById(id), 'custom:Area')
		// const user = getters.userById(id)
		// return user ? user.UserAttributes.find(u => u.Name==='phone_number').Value : ''
	},
	attributeFromUser: () => (user, attribute) => {
		let name = ''
		if(user && user.UserAttributes)
			name = user.UserAttributes.find(u => u.Name===attribute)
		if(name!==undefined)
			return name.Value
		return ''
		// return user && user.UserAttributes && user.UserAttributes.length === 7 ? user.UserAttributes.find(u => u.Name==='name').Value : ''
	},
	// addressFromUser: () => user => {
	// 	return user && user.UserAttributes && user.UserAttributes.length === 7 ? user.UserAttributes.find(u => u.Name==='address').Value : ''
	// },
	// phoneFromUser: () => user => {
	// 	return user && user.UserAttributes && user.UserAttributes.length === 7 ? user.UserAttributes.find(u => u.Name==='phone_number').Value : ''
	// },
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
		if (state.products.length > 0) {
			return state.products.filter(p => p.featured === true)
		}
	},
	productById: (state) => id => {
		return state.products.find(p => p.id === id)
	},
	productCategories: (state) => {
		return state.productCategories.sort((c1,c2) => c1.name.localeCompare(c2.name))
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