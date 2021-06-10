import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const AUTH_STATE = 'AUTH_STATE'
export const SET_USER = 'SET_USER'
export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const SET_ERROR = 'SET_ERROR'


export default {
	state,
	actions,
	mutations,
	getters
}