import { API, Auth } from 'aws-amplify';
import { Storage } from 'aws-amplify';

import { createProduct } from '@/graphql/mutations';
import { getProduct } from '@/graphql/queries';
// import { productByCode } from '@/graphql/customQueries'
import { listProducts } from '@/graphql/customQueries';
import { searchProducts } from '@/graphql/customQueries';
import { listProductsWithName } from '@/graphql/customQueries';
import { updateProduct } from '@/graphql/mutations';
import { deleteProduct } from '@/graphql/mutations';

import { createInventory } from '@/graphql/mutations';

import { createOrder } from '@/graphql/mutations';

import { listCategorys } from '@/graphql/queries';

import { listInventorys } from '@/graphql/queries';
import { getInventory } from '@/graphql/queries';
import { updateInventory } from '@/graphql/mutations';
import { deleteInventory } from '@/graphql/mutations';


// import { byUserByTime } from '@/graphql/queries'
// import { ordersbyUserByTime } from '@/graphql/queries'
import { updateOrder } from '@/graphql/mutations';
import { getOrder } from '@/graphql/queries';
import { ordersByUserByTime } from '@/graphql/customQueries'
import { ordersByStatusByUser } from '@/graphql/customQueries'
import { listOrders } from '@/graphql/queries'


import {
  SHOW_LOADER,
  HIDE_LOADER,

  TOGGLE_DRAWER,

  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,

  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT,
	UPDATE_PRODUCT_SUCCESS,
	REMOVE_PRODUCT, 
  REMOVE_PRODUCT_SUCCESS,

  UPDATE_INVENTORY,
  
  ALL_CATEGORY_SUCCESS,
  FEATURED_LISTS,

  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY, 

  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  UPDATE_ORDER, 
	UPDATE_ORDER_SUCCESS, 
	UPDATE_ORDER_FAILURE,
  GET_ORDER_SUCCESS,
  EMPTY_ORDERS,
  LIST_ORDER_SUCCESS,
  NEXT_TOKEN,

} from './mutation-types'

export const appActions = {
  toggleDrawer({commit}){
    commit(TOGGLE_DRAWER)
  }
}

export const userActions = {
  getUser({commit, state}, userID) {
    console.log('USER ID', userID)
    commit(SHOW_LOADER)
    API.get(
      'AdminQueries', 
      '/getUser', 
      {
        queryStringParameters: {
          "username": userID
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: state.user.signInUserSession.getAccessToken().getJwtToken()
        }
      })
      .then(user => {
        console.log('USER', user)
        commit(GET_USER_SUCCESS, user)
      })
      .catch(error => {
        console.log('ERROR FETCHING USER ATTRIBUTES', error)
      })
  },
  userById({commit, state}, userID) {
    console.log('USER ID', userID)
    commit(SHOW_LOADER)
    return API.get(
      'AdminQueries', 
      '/getUser', 
      {
        queryStringParameters: {
          "username": userID
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: state.user.signInUserSession.getAccessToken().getJwtToken()
        }
      })
      .then(user => {
        console.log('USER', user)
        commit(GET_USER_SUCCESS, user)
        return user
      })
      .catch(error => {
        console.log('ERROR FETCHING USER ATTRIBUTES', error)
      })
  }, 
  async updateUser({commit}, payload) {
    commit(SHOW_LOADER)
    const user = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(user, {
      'name': payload.name,
      'custom:employee_no': payload['custom:employee_no'],
      'address': payload.address,
      'custom:area': payload['custom:area'],
      'custom:seller_id': payload['custom:seller_id']
    })
    .then( () => {
      commit(UPDATE_USER_SUCCESS, payload)
    })
    .catch(error => {
      console.log('ERROr UPDATING USER', error)
    })

  }
}

export const productActions = {
  addProduct ({commit}, payload) {
    commit(ADD_PRODUCT)
    API.graphql({
      query: createProduct,
      variables: { input: payload },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then((response) => { 
      commit(ADD_PRODUCT_SUCCESS, response.data.createProduct)
      console.log('CREATING PRODUCT SUCCESSFUL')
    })
    .catch(error => {
      commit(ADD_PRODUCT_FAILURE)
      console.log('ERROR CREATING PRODUCT', error)
    });
  },
  bulkAddProduct({commit}, items) {
    console.log('ADDING PRODUCTS', items)
    commit(HIDE_LOADER)
    items.forEach(item => {
      API.graphql({
        query: createInventory,
        variables: {input: {stock: item.stock}},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })
      .then(response => {
        console.log('CREATED INVENTORY', response.data.createInventory)
        delete item.stock
        item.productInventoryId = response.data.createInventory.id
        API.graphql({
          query: createProduct,
          variables: { input: item },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        })
        .then(response => {
          console.log('CREATED PRODUCT', response.data.createProduct)
          commit(SHOW_LOADER)
        })
        .catch(error => {
          console.log('ERROR CREATING PRODUCT', error)
        })
      })
      .catch(error => {
        console.log('ERROR CREATING INVENTORY', error)
      })
    })
  },
  getProduct ({commit, state}, payload) {
    // Here the product is returned in addition to commit
    console.log('PRODUCT ID', payload)
    commit(PRODUCT_BY_ID)
    let product = state.products.find(p => p.id === payload)
    if(product && product.inventory){
      commit(PRODUCT_BY_ID_SUCCESS, product)
      return product
    } else {
      return API.graphql({
        query: getProduct,
        variables: {id: payload},
        authMode: 'API_KEY'
      })
      .then(response => {
        commit(PRODUCT_BY_ID_SUCCESS, response.data.getProduct)
        return response.data.getProduct
      })
      .catch(error => console.log('ERROR FETCHING PRODUCT', error));
    }
  },
  // productById ({commit}, payload) {
  //   // Here the product is returned in addition to commit
  //   commit(PRODUCT_BY_ID)
  //   return API.graphql({
  //     query: getProduct,
  //     variables: {id: payload},
  //     authMode: 'API_KEY'
  //   })
  //   .then(response => {
  //     commit(PRODUCT_BY_ID_SUCCESS, response.data.getProduct)
  //     console.log('PRODUCT', response.data.getProduct)
  //     return response.data.getProduct
  //   })
  //   .catch(error => console.log('ERROR FETCHING PRODUCT', error));
  // },
  allProducts ({commit}) {
    commit(ALL_PRODUCTS)
    API.graphql({
      query: listProducts,
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('ALL PRODUCTS', response.data.listProducts.items)
      commit(ALL_PRODUCTS_SUCCESS, response.data.listProducts.items)
    })
    .catch(error => console.log('ERROR FETCHING PRODUCTS', error));
  },
  productsWithName ({commit}) {
    commit(ALL_PRODUCTS)
    API.graphql({
      query: listProductsWithName,
      variables: { 
        limit: 4000
      },
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('ALL PRODUCTS', response.data.listProducts.items)
      commit(ALL_PRODUCTS_SUCCESS, response.data.listProducts.items)
    })
    .catch(error => console.log('ERROR FETCHING PRODUCTS', error));
  },
  allProductsWithLimit ({commit}) {
    commit(ALL_PRODUCTS)
    API.graphql({
      query: listProducts,
      variables: { limit: 2 },
      authMode: 'API_KEY'
    })
    .then(response => {
      commit(ALL_PRODUCTS_SUCCESS, response.data.listProducts.items)
    })
    .catch(error => console.log('ERROR FETCHING PRODUCTS', error));
  },
  listProducts ({commit}, payload) {
    commit(ALL_PRODUCTS)
    console.log('payload',payload)
    API.graphql({
      query: listProducts,
      variables: { 
        filter: { 
          keyword : { contains: payload } 
        },
        limit: 100000
      },
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('SEARCH PRODUCTS', response)
      commit(ALL_PRODUCTS_SUCCESS, response.data.listProducts.items)
    })
    .catch(error => console.log('ERROR FETCHING PRODUCTS', error));
  },
  searchProducts ({commit}, payload) {
    commit(ALL_PRODUCTS)
    console.log('payload',payload)
    API.graphql({
      query: searchProducts,
      variables: { 
        filter: { 
          keyword : { contains: payload } 
        },
        limit: 4000
      },
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('SEARCH PRODUCTS', response)
      commit(ALL_PRODUCTS_SUCCESS, response.data.listProducts.items)
    })
    .catch(error => console.log('ERROR FETCHING PRODUCTS', error));
  },
  updateProduct ({commit}, payload) {
    commit(UPDATE_PRODUCT)
    API.graphql({
      query: updateProduct,
      variables: { input: payload },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then((response) => { 
      console.log('UPDATE PRODUCT SUCCESS', response)
      commit(UPDATE_PRODUCT_SUCCESS, response.data.updateProduct)
    })
    .catch(error => console.log('ERROR UPDATING PRODUCT', error));
  },
  
  deleteProduct({commit}, payload) {
    commit(REMOVE_PRODUCT)
    API.graphql({
      query: deleteProduct,
      variables: { input: { id: payload} },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      commit(REMOVE_PRODUCT_SUCCESS, response)
      console.log('PRODUCT DELETE SUCCESS', response.data.deleteProduct)
    })
    .catch(error => console.log('ERROR REMOVING PRODUCT', error))
  },
  deleteInventory({commit}, payload) {
    console.log('DELETE ID', payload)
    API.graphql({
      query: deleteInventory,
      variables: { input: { id: payload} },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      commit(SHOW_LOADER)
      console.log('INVENTORY DELETE SUCCESS', response.data.deleteInventory)
    })
    .catch(error => console.log('ERROR DELETING INVENTORY', error));
  },
  bulkDeleteProduct({dispatch, commit}) {
    console.log('BULK DELETE PRODUCT')
    API.graphql({
      query: listProducts,
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('PRODUCTS', response)
      response.data.listProducts.items.forEach(item => {
        dispatch('deleteProduct', item.id)
      }) 
    })
    .catch(error => console.log('ERROR BULK DELETING INVENTORY', error));
    
    commit(SHOW_LOADER)
  },
  bulkDeleteInventory({dispatch, commit}) {
    console.log('BULK DELETE INVENTORY')
    commit(SHOW_LOADER)
    API.graphql({
      query: listInventorys,
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('INVENTORIES', response)
      response.data.listInventorys.items.forEach(item => {
        // dispatch('getInventory', item.id)
        dispatch('deleteInventory', item.id)
      }) 
    })
    .catch(error => console.log('ERROR BULK DELETING INVENTORY', error));
    commit(HIDE_LOADER)
  },
  productListForUpdate ({commit}, payload) {
    commit(SHOW_LOADER)
    console.log('payload',payload)
    return API.graphql({
      query: listProducts,
      variables: { 
        nextToken: payload
      },
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('LIST PRODUCTS', response)
      commit(HIDE_LOADER)
      return response.data.listProducts
    })
    .catch(error => console.log('ERROR FETCHING PRODUCTS', error));
  },
  getInventory ({commit}, payload) {
    API.graphql({
      query: getInventory,
      variables: {id: payload},
      authMode: 'API_KEY'
    })
    .then(response => {
      commit(UPDATE_INVENTORY)
      console.log('INVENTORY SUCCESS', response.data.getInventory)
      return response.data.getInventory
    })
    .catch(error => console.log('ERROR FETCHING INVENTORY', error));
  },
  updateInventory({commit}, payload){
    console.log('INVENTORY', payload)
    API.graphql({
      query: updateInventory,
      variables: { input: payload },
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('INVENTORY UPDATED', response)
      commit(UPDATE_INVENTORY)
    })
    .catch(error => {
      console.log('ERROR UPDATING INVENTORY', error)
    })
  },
  productCategories({commit}) {
    API.graphql({
      query: listCategorys,
      authMode: 'API_KEY'
    })
    .then(response => {
      console.log('CATEGORIES', response)
      commit(ALL_CATEGORY_SUCCESS, response.data.listCategorys.items)
    })
    .catch(error => console.log('ERROR FETCHING CATEGORIES', error));
  },
  async featuredLists({commit}) {
    const staticData = await Storage.get('static.json', { download: true})
		const fr = new FileReader()
		const blob = new Blob([staticData.Body], {type:"application/json"});
		fr.addEventListener("load", () => {
			console.log('READING FILE')
			var items = JSON.parse(fr.result)
      console.log('ITEMS IN FILE', items)
      commit(FEATURED_LISTS, items.lists)
		});

		fr.readAsText(blob);
  }
}


export const cartActions = {
  async addToCart({dispatch, commit}, payload) {
    // Here API call can be added to ensure stock availability, price etc.
    // var product = getters.products.find(p => p.id === payload)
    
    //if(product===undefined)
    const  product = await dispatch('getProduct', payload)
    console.log('PRODUCT TO BE ADDED IN CART', product)
    commit(ADD_TO_CART, product)
  },
  removeFromCart({commit}, payload) {
    commit(REMOVE_FROM_CART, payload)
  },
  incrementCartQuantity({commit}, payload) {
    commit(INCREMENT_CART_QUANTITY, payload)
  },
  decrementCartQuantity({commit}, payload) {
    commit(DECREMENT_CART_QUANTITY, payload)
  }
}

export const orderActions = {
  createOrder({dispatch, commit, getters}, items){
    commit(CREATE_ORDER)
    let order = {}
    order.status = 'CONFIRMED'
    order.history = [
      { name: 'PENDING', createdAt: new Date().toISOString() },
      { name: 'CONFIRMED', createdAt: new Date().toISOString() }
    ]
    order.items = []
    items.forEach(item => {
      order.items.push({
        id: item.id, 
        name: item.name, 
        image: item.image, 
        quantity: item.quantity, 
        price: item.price, 
        unit: item.unit,
        status:'CONFIRMED'
      })
    })
    order.sellerID = items[0].sellerID
    order.owner = getters.user.attributes.sub
    const customer = getters.user.attributes
    order.customer = {
      address: customer.address,
      email: customer.email,
      name: customer.name,
      phone_number: customer.phone_number,
      sub: customer.sub
    }
    console.log('ORDER', order)

    API.graphql({
      query: createOrder,
      variables: { input: order },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      let cart = getters.cart
      let order = response.data.createOrder
      console.log('CREATE ORDER', response.data.createOrder)
      cart.forEach((item)=> {
        API.graphql({
          query: getInventory,
          variables: {id: item.inventory.id},
          authMode: 'API_KEY'
        })
        .then(response => {
          console.log('INVENTORY SUCCESS', response.data.getInventory)
          dispatch('updateInventory', { id:response.data.getInventory.id, stock: response.data.getInventory.stock - item.quantity })
        })
        .catch(error => console.log('ERROR FETCHING INVENTORY', error));
      })
      commit(CREATE_ORDER_SUCCESS, order)
    })
    .catch(error => {
      console.log('ERROR CREATING ORDER', error)
      commit(CREATE_ORDER_FAILURE, error)
    })



  },
  createOrderFor({dispatch, commit, getters}){
    let payload = JSON.parse(JSON.stringify(getters.cart));
    // console.log('ORDER ITEMS', payload)
    payload.forEach((item)=>{ 
      item.status = 'PENDING'
      delete item.keyword
      delete item.description
      delete item.hsn
      delete item.category
      delete item.code
      delete item.tax
      delete item.mrp
      delete item.purchase_rate
      delete item.rate
      delete item.gst
      delete item.leastCount
      delete item.seller
      delete item.sellerID
      delete item.featured
      delete item.inventory
      delete item.createdAt
      delete item.updatedAt
    })
    console.log('ORDER ITEMS AFTER CLEANING', payload)
    console.log('ORDER IN CART', getters.cart)
    let order = {}
    order.status = 'CONFIRMED'
    order.history = [
      { name: 'PENDING', createdAt: new Date().toISOString() },
      { name: 'CONFIRMED', createdAt: new Date().toISOString() }
    ]
    order.items = payload
    order.owner = getters.user.attributes.sub
    console.log('ORDER', order)
    commit(CREATE_ORDER)
    // setTimeout(()=>{commit(CREATE_ORDER_SUCCESS, 'AFTER 2000')}, 2000)
    API.graphql({
      query: createOrder,
      variables: { input: order },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      let cart = getters.cart
      let order = response.data.createOrder
      console.log('CREATE ORDER', response.data.createOrder)
      cart.forEach((item)=> {
        API.graphql({
          query: getInventory,
          variables: {id: item.inventory.id},
          authMode: 'API_KEY'
        })
        .then(response => {
          console.log('INVENTORY SUCCESS', response.data.getInventory)
          dispatch('updateInventory', { id:response.data.getInventory.id, stock: response.data.getInventory.stock - item.quantity })
        })
        .catch(error => console.log('ERROR FETCHING INVENTORY', error));
      })
      commit(CREATE_ORDER_SUCCESS, order)
    })
    .catch(error => {
      console.log('ERROR CREATING ORDER', error)
      commit(CREATE_ORDER_FAILURE, error)
    })
  },
  myOrders({commit, getters}) {
    console.log('USER', getters.user.attributes.sub)
    API.graphql({
      query: ordersByUserByTime,
      variables: {
        owner: getters.user.attributes.sub,
        sortDirection: 'DESC'
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      console.log('ORDERS BY USER', response)
      commit(LIST_ORDER_SUCCESS, response.data.OrdersbyUserByTime)
    })
    .catch(error => {
      console.log('ERROR FETCHING ORDERS BY USER', error)
      commit(UPDATE_INVENTORY)
    })
  },
  allOrders({commit, getters}) {
    console.log('USER FOR ALL ORDERS', getters.user.attributes.sub)
    API.graphql({
      query: listOrders,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      console.log('ALL ORDERS', response)
    })
    .catch(error => {
      console.log('ERROR FETCHING ALL ORDERS', error)
      commit(UPDATE_INVENTORY)
    })
  },
  emptyOrders({commit}) {
    commit(EMPTY_ORDERS)
  },
  ordersByStatus({commit}, payload) {
    
    API.graphql({
      query: ordersByStatusByUser,
      variables: {
        status: payload.status,
        sortDirection: 'DESC',
        nextToken: payload.nextToken,
        // limit: 1
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      console.log('ALL ORDERS', response)
      commit(NEXT_TOKEN, response.data.OrdersbyStatusByUser.nextToken)
      commit(LIST_ORDER_SUCCESS, response.data.OrdersbyStatusByUser)
      
    })
    .catch(error => {
      console.log('ERROR FETCHING ORDERS', error)
      commit(UPDATE_INVENTORY)
    })
  },
  getOrder ({commit}, payload) {
    return API.graphql({
      query: getOrder,
      variables: {id: payload},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      commit(GET_ORDER_SUCCESS, response.data.getOrder)
      return response.data.getOrder
    })
    .catch(error => console.log('ERROR FETCHING ORDER', error));
  },
  printOrdersByStatus({commit}, payload) {
    API.graphql({
      query: ordersByStatusByUser,
      variables: {
        status: payload
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      console.log('ALL ORDERS', response)
      commit(LIST_ORDER_SUCCESS, response.data.OrdersbyStatusByUser.items)
      
    })
    .catch(error => {
      console.log('ERROR FETCHING ORDERS', error)
      commit(UPDATE_INVENTORY)
    })
  },
  updateOrder ({commit}, payload) {
    commit(UPDATE_ORDER)
    API.graphql({
      query: updateOrder,
      variables: { input: payload },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then((response) => { 
      console.log('UPDATE ORDER SUCCESS', response.data.updateOrder)
      commit(UPDATE_ORDER_SUCCESS, response.data.updateOrder)
    })
    .catch(error => { 
      console.log('ERROR UPDATING ORDER', error)
      commit(UPDATE_ORDER_FAILURE)
    });
  },
}
