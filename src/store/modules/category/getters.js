const getters = {
	categories: (state) => {
		return state.categories.sort((c1,c2) => c1.name.localeCompare(c2.name))
	},
	categoryName: (getters) => id => {
		return getters.categories.find(c => c.id===id).name
	}
}

export default getters