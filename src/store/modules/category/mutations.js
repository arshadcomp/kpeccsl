const CREATE_CATEGORY = 'CREATE_CATEGORY'
const LIST_CATEGORIES = 'LIST_CATEGORIES'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

const mutations = {
	[CREATE_CATEGORY](state, category) {
		state.categories.push(category)
	},
	[LIST_CATEGORIES](state, categories) {
		state.categories = categories
	},
	[UPDATE_CATEGORY](state, category) {
		state.categories = state.categories.map(c => {
			if (c.id === category.id)
				c = category
			return c
		})
	}
}

export default mutations