const getters = {
  orders: (state) => {
		return state.orders
	},
  ordersByStatus: (state) => status => {
		return state.orders.filter(o => o.status===status)
	},
	ordersByStatusBySeller: (state, getters) =>status => {
		// return state.orders.filter(o => o.status===status)
		// const seller = getters.seller
		return state.orders.filter(o => o.status===status && o.sellerID===getters.sellerId)
	},
  order: (state) => id => {
		return state.orders.find(o => o.id===id)
	}
}

export default getters
