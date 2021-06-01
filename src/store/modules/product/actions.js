import { API } from 'aws-amplify';
// import { Storage } from 'aws-amplify';

import { createProduct } from '@/graphql/mutations';
import { getProduct } from '@/graphql/queries';
import { productByCode } from '@/graphql/queries';
import { updateProduct } from '@/graphql/mutations';
// import { deleteProduct } from '@/graphql/mutations';
import { listProducts } from '@/graphql/queries';
import { listProductsWithInventory } from '@/graphql/customQueries';
import { listProductsWithName } from '@/graphql/customQueries';

import { createInventory } from '@/graphql/mutations';
import { updateInventory } from '@/graphql/mutations';
// import { deleteInventory } from '@/graphql/mutations';

const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
// const LIST_PRODUCTS = 'LIST_PRODUCTS'
const PUSH_PRODUCTS = 'PUSH_PRODUCTS'

const NEXT_TOKEN = 'NEXT_TOKEN'
const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'
const SET_ERROR = 'SET_ERROR'

const actions = {
	createProduct({ commit }, product) {
		// Ensure structure of product in test with productInventoryId
		return API.graphql({
			query: createProduct,
			variables: { input: product },
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
			.then((response) => {
				//check if this create product is with inventory
				commit(ADD_PRODUCT, response.data.createProduct)
				console.log('CREATING PRODUCT SUCCESSFUL', response)
				return response.data.createProduct
			})
			.catch(error => {
				console.log('ERROR CREATING PRODUCT', error)
			});
	},
	updateProduct({ commit }, payload) {
		commit(SHOW_LOADER)
		commit(SET_ERROR, null)
		API.graphql({
			query: updateProduct,
			variables: { input: payload },
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
			.then((response) => {
				console.log('UPDATE PRODUCT SUCCESS', response)
				commit(HIDE_LOADER)
				commit(UPDATE_PRODUCT, response.data.updateProduct)
			})
			.catch(error => {
				commit(HIDE_LOADER)
				commit(SET_ERROR, error)
				console.log('ERROR UPDATING PRODUCT', error)
			});
	},
	createInventory({ commit }, stock) {
		// Ensure structure of inventory in test with productInventoryId
		commit(HIDE_LOADER)
		return API.graphql({
			query: createInventory,
			variables: { input: { stock: stock } },
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
			.then((response) => {
				console.log('CREATING INVENTORY SUCCESSFUL', response)
				return response.data.createInventory
			})
			.catch(error => {
				console.log('ERROR CREATING INVENTORY', error)
			});
	},
	updateInventory({ commit }, inventory) {
		// commit(SHOW_LOADER)
		// setTimeout(() => {
		// 	commit(SHOW_LOADER)
		// }, 2000)
		
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
	},
	// async addProduct({ dispatch, commit }, product) {
	// 	// Ensure structure of product with inventory
	// 	const inventory = await dispatch('createInventory', product.stock)
	// 	// if then can be used here
	// 	product.productInventoryId = inventory.id
	// 	dispatch('createProduct', product)
	// },
	// bulkAddProduct({ commit }, items) {
	// 	// items.forEach(item => {
	// 	//     dispatch('createInventory', item.stock)
	// 	//     .then(response => {
	// 	//         delete item.stock
	// 	//         item.productInventoryId = response.data.createInventory.id
	// 	//         dispatch('createProduct', item)
	// 	//     })
	// 	// }
	// },
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
	productByCode({ commit }, code) {
		return API.graphql({
			query: productByCode,
			variables: { code: code },
			authMode: 'API_KEY'
		})
			.then(response => {
				console.log('PRODUCT BY CODE', response)
				commit(UPDATE_PRODUCT, response.data.productByCode.items)
				return response.data.productByCode
			})
			.catch(error => console.log('ERROR FETCHING PRODUCT', error));
	},
	listProducts({ commit, getters }, { limit, withInventory}) {
	// listProducts({ commit, getters }, limit) {
		console.log('LIMIT NEXT TOKEN', limit, getters.nextToken)
		commit(SHOW_LOADER)
		return API.graphql({
			query: withInventory ? listProductsWithInventory : listProducts,
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
				return response.data.listProducts.items
			})
			.catch(error => {
				commit(HIDE_LOADER)
				commit(SET_ERROR, error)
				console.log('ERROR FETCHING PRODUCTS', error)
			});
	},
	productsWithName({ commit }) {
		commit(SHOW_LOADER)
		API.graphql({
			query: listProductsWithName,
			variables: {
				// limit: 4000
				limit: 10
			},
			authMode: 'API_KEY'
		})
			.then(response => {
				console.log('ALL PRODUCTS', response.data.listProducts.items)
				commit(HIDE_LOADER)
				commit(NEXT_TOKEN, response.data.listProducts.nextToken)
				commit(PUSH_PRODUCTS, response.data.listProducts.items)
				// commit(ALL_PRODUCTS, response.data.listProducts.items)
			})
			.catch(error => {
				commit(HIDE_LOADER)
				commit(SET_ERROR, error)
				console.log('ERROR FETCHING PRODUCTS', error)
			});
	}
}

export default actions