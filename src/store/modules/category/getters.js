const getters = {
	categories: (state) => {
		return state.categories.sort((c1,c2) => c1.name.localeCompare(c2.name))
	},
	categoryName: (getters) => id => {
		return getters.categories.find(c => c.id===id).name
	},
	selectedCategories: (state) => {
		return state.selectedCategories
	},
	categoryImageByHsn: (state, getters) => hsn => {
		if(hsn==='')
			return 'https://source.unsplash.com/Hz4FAtKSLKo'
		const hsnCategories = getters.categories.filter(category => category.hsn && category.hsn.includes(hsn))

		// console.log("HSN", hsn, hsnCategories)

		if(hsnCategories.length===0)
			return 'https://source.unsplash.com/Hz4FAtKSLKo'

		if(hsnCategories.length===1)
			return hsnCategories[0].image
		
		if(hsnCategories.length >1 ){
			hsnCategories.forEach(category => {
				if(category.parentId!==null)
					return category.image
			})
			return hsnCategories[hsnCategories.length-1].image
		}
	}
}

export default getters