import { API } from 'aws-amplify'

import { createCategory } from '@/graphql/mutations';
import { listCategorys } from '@/graphql/queries';
import { updateCategory } from '@/graphql/mutations';
// import { deleteCategorys } from '@/graphql/mutations';

const NEXT_TOKEN = 'NEXT_TOKEN'
const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'
const SET_ERROR = 'SET_ERROR'

const CREATE_CATEGORY = 'CREATE_CATEGORY'
const LIST_CATEGORIES = 'LIST_CATEGORIES'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

const actions = {
	listCategories({ commit, getters }, { limit }) {
		console.log('LIMIT NEXT TOKEN', limit)
		commit(SHOW_LOADER)
		commit(SET_ERROR, null)
		return API.graphql({
			query: listCategorys,
			variables: {
				limit: limit,
				nextToken: getters.nextToken,
			},
			authMode: 'API_KEY'
		})
			.then(response => {
				console.log('ALL CATEGORIES', response.data.listCategorys.items)
				commit(HIDE_LOADER)
				commit(NEXT_TOKEN, response.data.listCategorys.nextToken)
				commit(LIST_CATEGORIES, response.data.listCategorys.items)
				return response.data.listCategorys.items
			})
			.catch(error => {
				commit(HIDE_LOADER)
				commit(SET_ERROR, error)
				console.log('ERROR FETCHING CATEGORIES', error)
			});
	},
	updateCategory({commit}, category) {
		console.log('CATEGORY', category)
		commit(SHOW_LOADER)
		API.graphql({
			query: updateCategory,
			variables: {
				input: category
			},
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
		.then((response) => {
			console.log('UPDATE CATEGORY SUCCESS', response)
			commit(HIDE_LOADER)
			commit(UPDATE_CATEGORY, response.data.updateCategory)
		})
		.catch(error => {
			commit(HIDE_LOADER)
			commit(SET_ERROR, error)
			console.log('ERROR UPDATING CATEGORY', error)
		});
	},
	createCategory({ commit }, category) {
		API.graphql({
			query: createCategory,
			variables: { input: category },
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
			.then((response) => {
				//check if this create product is with inventory
				commit(CREATE_CATEGORY, response.data.createCategory)
				console.log('CREATING CATEGORY SUCCESSFUL', response)
				return response.data.createCategory
			})
			.catch(error => {
				console.log('ERROR CREATING CATEGORY', error)
			});
	},
}

export default actions