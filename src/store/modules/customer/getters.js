const getters = {
	customer: (state) => {
		return state.customer
	},
	customers: (state) => {
		return state.customers
	},
	customerById: (state) => id => {
		return state.customers.find(u => u.Username === id)
	},
	// customerName: (state, getters) => id => {
	// 	return getters.attributeFromUser(getters.customerById(id), 'name')
	// },
	// customerAddress: (state, getters) => id => {
	// 	return getters.attributeFromUser(getters.customerById(id), 'address')
	// },
	// customerEmployee_no: (state, getters) => id => {
	// 	return getters.attributeFromUser(getters.customerById(id), 'custom:employee_no')
	// },
	// customerPhone: (state, getters) => id => {
	// 	return getters.attributeFromUser(getters.customerById(id), 'phone_number')
	// },
	// customerArea: (state, getters) => id => {
	// 	return getters.attributeFromUser(getters.customerById(id), 'custom:area')
	// },
	attributeFromUser: () => (customer, attribute) => {
		if(!customer || !customer.UserAttributes)
			return ''
		const attributeName = customer.UserAttributes.find(u => u.Name===attribute)
		return attributeName ? attributeName.Value : ''
	}
}

export default getters