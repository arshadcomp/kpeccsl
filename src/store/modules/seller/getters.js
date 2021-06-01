const getters = {
	// loader: (state) => {
	// 	return state.loader
	// },
	// error: (state) => {
	// 	return state.error
	// },
	// isAuthorized: (state) => {
	// 	return state.isAuthorized
	// }
	// seller: (state) => {
	// 	return state.seller
	// },
	// sellers: (state) => {
	// 	return state.sellers
	// },
	sellerById: (state) => (id) => {
		return state.list.find(s => s.id===id)
	},
	sellerId: (state) => {
		return state.id
	},
	sellerName: (state) => {
		return state.name
	},
	sellerList: (state) => {
		return state.list
	},
}

export default getters