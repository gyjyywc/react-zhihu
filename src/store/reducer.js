import * as actionTypes from './action-types'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  headerTitle: '首页'
})

export default (state = defaultState, action) => {
  if (action.type === actionTypes.HEAD_TITLE) {
    return state.set('headerTitle', action.data)
  }
  return state
} 