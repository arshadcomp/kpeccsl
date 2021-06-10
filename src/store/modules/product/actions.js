import { API } from 'aws-amplify';

import { listProducts } from '@/graphql/queries';
import { getProduct } from '@/graphql/queries';

import { updateInventory } from '@/graphql/mutations';

import {
	NEXT_TOKEN,
	SHOW_LOADER,
	HIDE_LOADER,
	SET_ERROR
} from '@/store/index'

const PUSH_PRODUCTS = 'PUSH_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const UPDATE_INVENTORY = 'UPDATE_INVENTORY'

const actions = {
	listProducts({ commit, getters }, limit) {
		console.log('LIMIT NEXT TOKEN', limit, getters.nextToken)
		commit(SHOW_LOADER)
		API.graphql({
			query: listProducts,
			variables: {
				limit: limit,
				nextToken: getters.nextToken,
			},
			authMode: 'API_KEY'
		})
			.then(response => {
				console.log('ALL PRODUCTS', response.data.listProducts.items)
				commit(HIDE_LOADER)
				commit(NEXT_TOKEN, response.data.listProducts.nextToken)
				commit(PUSH_PRODUCTS, response.data.listProducts.items)
				response.data.listProducts.items
			})
			.catch(error => {
				commit(HIDE_LOADER)
				commit(SET_ERROR, error)
				console.log('ERROR FETCHING PRODUCTS', error)
			});
	},
	getProduct({ commit }, id) {
		API.graphql({
			query: getProduct,
			variables: { id: id },
			authMode: 'API_KEY'
		})
			.then(response => {
				commit(UPDATE_PRODUCT, response.data.getProduct)
				return response.data.getProduct
			})
			.catch(error => console.log('ERROR FETCHING PRODUCT', error));
	},
	updateInventory({ commit }, inventory) {
		API.graphql({
			query: updateInventory,
			variables: { input: inventory },
			authMode: 'API_KEY'
		})
			.then(response => {
				console.log('INVENTORY UPDATED', response)
				commit(UPDATE_INVENTORY, response.data.updateInventory)
			})
			.catch(error => {
				console.log('ERROR UPDATING INVENTORY', error)
			})
	}
}

export default actions