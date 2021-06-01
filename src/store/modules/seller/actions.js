// import { Auth } from 'aws-amplify'
// import { AuthState } from '@aws-amplify/ui-components'

// import {
// 	AUTH_STATE,
// } from './index.js'

const actions = {
	// authenticate({ commit }) {
	// 	Auth.currentAuthenticatedUser()
	// 		.then((user) => {
	// 			console.log('USER', user)
	// 			commit('SET_USER', user)
	// 			const userRoles = user.signInUserSession.accessToken.payload['cognito:groups']
	// 			if(userRoles.length > 0){
	// 				commit('SET_ROLE', userRoles)
	// 				commit('SET_SELLER', user.username)
	// 			}
	// 			if(user.signInUserSession.authstate === AuthState.SignedIn)
	// 				commit('AUTH_STATE', true)
	// 		}).catch(err => {
	// 			commit('AUTH_STATE', false)
	// 			console.log(err)
				
	// 		})
	// }
}

export default actions