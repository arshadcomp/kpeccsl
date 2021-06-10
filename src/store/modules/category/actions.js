import { API } from 'aws-amplify'

import { listCategorys } from '@/graphql/queries';

import {
	NEXT_TOKEN,
	SHOW_LOADER,
	HIDE_LOADER,
	SET_ERROR
} from '@/store/index'

// const NEXT_TOKEN = 'NEXT_TOKEN'
// const SHOW_LOADER = 'SHOW_LOADER'
// const HIDE_LOADER = 'HIDE_LOADER'
// const SET_ERROR = 'SET_ERROR'

const LIST_CATEGORIES = 'LIST_CATEGORIES'

const actions = {
	listCategories({ commit, getters }, limit) {
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
	}
}

export default actions