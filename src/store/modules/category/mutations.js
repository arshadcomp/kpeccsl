const LIST_CATEGORIES = 'LIST_CATEGORIES'
const SELECTED_CATEGORIES = 'SELECTED_CATEGORIES'

const mutations = {
	[LIST_CATEGORIES](state, categories) {
		state.categories = categories
	},
	[SELECTED_CATEGORIES] (state, categories) {
		state.selectedCategories = categories
	}
}

export default mutations