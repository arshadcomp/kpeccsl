const LIST_ORDERS = 'LIST_ORDERS'
const PUSH_ORDERS = 'PUSH_ORDERS'
const PUSH_ORDER = 'PUSH_ORDER'

const UPDATE_ORDER = 'UPDATE_ORDER'

const mutations = {
	[LIST_ORDERS]: (state, orders) => {
		state.orders = orders
	},
	[PUSH_ORDERS]: (state, orders) => {
		orders.forEach(o => {
			if(state.orders.findIndex(s => s.id===o.id) < 0)
				state.orders.push(o)
		})
	},
	[PUSH_ORDER]: (state, order) => {
		if(state.orders.findIndex(s => s.id===order.id) < 0)
			state.orders.push(order)
	},
  [UPDATE_ORDER]: (state, order) => {
		state.orders = state.orders.map(o => {
			if(o.id === order.id){
				o.status = order.status
				o.history = order.history
			}
			return o
		})
	}
}

export default mutations
