const SET_SELLER = 'SET_SELLER'
const SET_SELLER_BY_ID = 'SET_SELLER_BY_ID'

const mutations = {
	[SET_SELLER]: (state, userId) => {
		const seller = state.list.find(s => s.employees.includes(userId))
		if(seller){
			state.id = seller.id
			state.name = seller.name
			state.gstin = seller.gstin
		}
	},
	[SET_SELLER_BY_ID]: (state, id) => {
		const seller = state.list.find(s => s.id===id)
		if(seller){
			state.id = seller.id
			state.name = seller.name
			state.gstin = seller.gstin
		}
	}
}

export default mutations