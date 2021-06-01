import { API } from 'aws-amplify'

const SET_CUSTOMER = 'SET_CUSTOMER'

const actions = {
	getCustomer({ commit, getters }, customerId) {
    console.log('USER ID', customerId)
    // commit(SHOW_LOADER)
    return API.get(
      'AdminQueries', 
      '/getUser', 
      {
        queryStringParameters: {
          "username": customerId
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: getters.user.signInUserSession.getAccessToken().getJwtToken()
        }
      })
      .then(customer => {
        // commit(HIDE_LOADER)
				console.log('USER', customer)
        commit(SET_CUSTOMER, customer)
        return customer
      })
      .catch(error => {
        // commit(HIDE_LOADER)
				console.log('ERROR FETCHING USER ATTRIBUTES', error)
      })
  }
}

export default actions