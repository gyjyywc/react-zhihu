import * as actionTypes from './action-types'

export const changeHeadTitle = function (data) {
  return {
    type: actionTypes.HEAD_TITLE,
    data
  }
}