<template>
	<v-list dense>
		<v-subheader>Filters</v-subheader>
		<v-treeview 
			v-model="selection"
			dense
			open-all
			selectable
			return-object
			@input="selectedCategory" 
			:items="categories">
		</v-treeview>
	</v-list>
</template>

<script>
export default {
	name: "category-list",
	data() {
		return {
			selection: []
		}
	},
	computed: {
		categories() {
			const categories =  this.$store.getters.categories;
			const hashTable = Object.create(null)
			categories.forEach(aData => {
				aData.name = aData.name.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')
				hashTable[aData.id] = {...aData, children: []}
			});
			const dataTree = []
			categories.forEach(aData => {
				if(aData.parentId)
					hashTable[aData.parentId].children.push(hashTable[aData.id])
				else
					dataTree.push(hashTable[aData.id])
			})
			return dataTree
		},
	},
	methods: {
		selectedCategory() {
			this.$store.commit('SELECTED_CATEGORIES', this.selection)
		}
	}
};
</script>