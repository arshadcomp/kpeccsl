import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { createStore } from '@/store'

// import { API } from 'aws-amplify';

// import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let query = ''
let variables = {}
let authMode = ''
let mockError = false

// const API = jest.fn()

// jest.mock('API', () => ({
//     graphql: (_query, _variables, _authMode) => {
//         return new Promise((resolve) => {
//             if (mockError)
//                 throw Error()
//             query = _query
//             variables = _variables
//             authMode = _authMode
//             resolve(true)
//         })
//     }
// }))

const products = [
	{
		id: 'abcd-1',
		keyword: 'Product Name',
		inventory: {
			id: 'abcd-1-inv',
			stock: 5
		}
	},
	{
		id: 'abcd-2',
		keyword: 'b Product Name',
		inventory: {
			id: 'abcd-2-inv',
			stock: -5
		}
	},
	{
		id: 'abcd-3',
		keyword: 'd Product Name',
		inventory: {
			id: 'abcd-3-inv',
			stock: undefined
		}
	},
	{
		id: 'abcd-4',
		keyword: 'c Product Name',
		inventory: undefined
	},
	{
		id: 'abcd-5',
		keyword: 'f Product Name',
	}
]

const state = {}
state.product = {}
// state.product.products = products

// const store = createStore({
// 	modules: {
// 		product: {
// 			state: {
// 				products: products
// 			}
// 		}
// 	}
// })

// const store = createStore({
// 	state: {
// 		product: {
// 			products: products
// 		}
// 	}
// })

const store = createStore()

store.state.product.products = products


describe('product getters', () => {
	it('get all products length', () => {
		const actual = store.getters.products
		expect(actual).toHaveLength(5)
	})

	it('get single product by ID', () => {
		const actual = store.getters.productById('abcd-4')
		expect(actual.id).toBe('abcd-4')
	})

	it('get all products with inventory', () => {
		const products = store.getters.productsWithInventory
		expect(products).toHaveLength(3)
	})

	it('get all products with stock', () => {
		const products = store.getters.productsWithStock
		expect(products).toHaveLength(1)
	})

	it('get all products sorted by keyword', () => {
		const products = store.getters.productsSortedByName
		expect(products[0].id).toEqual('abcd-2')
	})
})

// Remove show loader etc. from mutations
const newProducts = [
	{
		id: 'abcd-1',
		keyword: 'Product Name',
		inventory: {
			id: 'abcd-1-inv',
			stock: 55
		}
	},
	{
		id: 'abcd-new',
		keyword: 'New Products Name',
		inventory: {
			id: 'abcd-new-inv',
			stock: 25
		}
	},
]

const inventory = {
	id: 'abcd-2-inv',
	stock: 65
}

describe('product mutations', () => {
	it('must add product', () => {
		store.commit('ADD_PRODUCT', newProducts[1])
		expect(store.state.product.products).toHaveLength(6)
	})

	it('must update product list', () => {
		store.commit('UPDATE_PRODUCT', newProducts[0])
		// store.mutations.UPDATE_PRODUCT(state, newProducts[0])
		expect(store.state.product.products).toContain(newProducts[0])
		expect(store.state.product.products[0].inventory.stock).toEqual(55)
	})
	//Update inventory is not required with products as updateProduct is sufficient for that
	it('must update inventory of product', () => {
		store.commit('UPDATE_INVENTORY', inventory)
		expect(store.state.product.products[1].inventory.stock).toEqual(65)
	})

	it('must push new products list to products', () => {
		store.commit('PUSH_PRODUCTS', newProducts)
		// store.mutations.PUSH_PRODUCTS(state, newProducts)
		expect(store.state.product.products).not.toHaveLength(7)
		expect(store.state.product.products).toContain(newProducts[1])
		expect(store.state.product.products[0].inventory.stock).toEqual(55)
		// Here expectd matching products to be updated with current version
	})
})

// describe('product actions', () => {
//     it('actuates create product', async () => {
//         const commit = jest.fn()
//         await store.actions.createProduct({commit}, product[0])
//         expect(query).toBe('createProduct')
//     })
// })


// describe('product actions', () => {
// 	// it('gets a product')
//     it('creates a product action', async () => {
//         // const commit = jest.fn()
// 				await store.dispatch('createProduct', products[0])
//         // await store.actions.createProduct({commit}, product)

//         // expect(query).toBe('createProduct')
//         expect(variables.input).toEqual(products[0])
//         // expect(authMode).toBe('AMAZON_COGNITO_USER_POOLS')
//         // expect(commit).toHaveBeenCalledWith('ADD_PRODUCT', product)
//     })

//     // it("catches an error", async () => {
//     //         mockError = true
//     //         await expect(store.actions.createProduct({ commit: jest.fn() }, {}))
//     //         .rejects.toThrow("API Error occurred.")
//     // })

//     // it('add product action', async () => {
//     //     const commit = jest.fn()
//     //     await store.actions.addProduct({commit}, product)
//     //     expect(commit).toHaveBeenCalledWith('ADD_PRODUCT', product)
//     // })
// })