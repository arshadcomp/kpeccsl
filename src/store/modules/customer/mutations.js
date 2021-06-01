const SET_CUSTOMER = 'SET_CUSTOMER'

const mutations = {
	[SET_CUSTOMER](state, customer) {
		if(state.customers.findIndex(c => c.Username ===customer.Username) < 0)
			state.customers.push(customer)
	},
}

export default mutations