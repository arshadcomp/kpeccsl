const getters = {
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