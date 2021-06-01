import { API } from 'aws-amplify';

// import { ordersbyStatusByUserByTime } from '@/graphql/queries'
import { ordersbyStatusByUser } from '@/graphql/queries'
import { updateOrder } from '@/graphql/mutations'

const PUSH_ORDERS = 'PUSH_ORDERS'
// const PUSH_ORDER = 'PUSH_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

const NEXT_TOKEN = 'NEXT_TOKEN'
const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'
const SET_ERROR = 'SET_ERROR'

const actions = {
  listOrdersbyStatusByUser({ commit, getters }, { status, limit }) {
    console.log('LIMIT NEXT TOKEN', limit, getters.nextToken)
    commit(SHOW_LOADER)
    API.graphql({
      query: ordersbyStatusByUser,
      variables: {
        status: status,
        sortDirection: 'DESC',
        limit: limit,
        nextToken: getters.nextToken,
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
      .then(response => {
        console.log('ALL ORDERS ', response)
        commit(HIDE_LOADER)
        commit(NEXT_TOKEN, response.data.OrdersbyStatusByUser.nextToken)
        commit(PUSH_ORDERS, response.data.OrdersbyStatusByUser.items)
        // return response.data.ordersbyStatusByUserByTime.items
      })
      .catch(error => {
        commit(HIDE_LOADER)
        commit(SET_ERROR, error)
        console.log('ERROR FETCHING ORDERS', error)
      });
  },
  // listOrdersByStatusByUser({ commit, getters }, { status, limit }) {
  //   commit(SHOW_LOADER)
  //   API.graphql({
  //     query: ordersbyStatusByUser,
  //     variables: {
  //       status: status,
  //       sortDirection: 'DESC',
  //       limit: limit,
  //       nextToken: getters.nextToken,
  //     },
  //     authMode: 'AMAZON_COGNITO_USER_POOLS'
  //   })
  //     .then(response => {
  //       console.log('ALL ORDERS', response)
  //       commit(NEXT_TOKEN, response.data.OrdersbyStatusByUser.nextToken)
  //       commit(PUSH_ORDERS, response.data.OrdersbyStatusByUser.items)
  //       commit(HIDE_LOADER)
  //     })
  //     .catch(error => {
  //       console.log('ERROR FETCHING ORDERS', error)
  //       commit(HIDE_LOADER)
  //       commit(SET_ERROR, error)
  //       throw Error('ERROR FETCHING ORDERS')
  //     })
  // },
  // listOrdersByStatusWithOwner({ commit, dispatch, getters }, payload) {
  //   commit(SHOW_LOADER)
  //   return API.graphql({
  //     query: ordersByStatusByUser,
  //     variables: {
  //       status: payload.status,
  //       sortDirection: 'DESC',
  //       nextToken: payload.nextToken,
  //       // limit: 100
  //       limit: 10
  //     },
  //     authMode: 'AMAZON_COGNITO_USER_POOLS'
  //   })
  //     .then((response) => {
  //       console.log('ALL ORDERS', response)
  //       commit(NEXT_TOKEN, response.data.OrdersbyStatusByUser.nextToken)
  //       let customer
  //       response.data.OrdersbyStatusByUser.items.forEach(async order => {
  //         customer = getters.customerById(order.owner)
  //         console.log('CUSTOMER FROM STORE', customer)
  //         if (customer === undefined)
  //           customer = await dispatch('getCustomer', order.owner)
  //         order.customer = customer
  //         commit(PUSH_ORDER, order)
  //       });
  //       commit(HIDE_LOADER)
  //     })
  //     .catch(error => {
  //       console.log('ERROR FETCHING ORDERS', error)
  //       commit(HIDE_LOADER)
  //       commit(SET_ERROR, error)
  //       throw Error('ERROR FETCHING ORDERS')
  //     })
  // },
  updateOrder({ commit }, payload) {
    API.graphql({
      query: updateOrder,
      variables: { input: payload },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
      .then((response) => {
        console.log('UPDATE ORDER SUCCESS', response.data.updateOrder)
        commit(UPDATE_ORDER, response.data.updateOrder)
      })
      .catch(error => {
        console.log('ERROR UPDATING ORDER', error)
      });
  }
}

export default actions
