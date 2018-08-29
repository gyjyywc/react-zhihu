import * as actionTypes from './action-types';

const defaultState = {
  headerTitle: '首页'
};
export default (state = defaultState, action) => {
  if (action.type === actionTypes.HEAD_TITLE) {

  }
  return state
} 