/*
 * @Author: your name
 * @Date: 2019-12-21 16:54:18
 * @LastEditTime : 2020-01-20 14:30:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /v2ex/js/reducer/theme/index.js
 */
'use strict';

import types from '../../actionTypes/index';

const defauleState = {
  theme: '#141212',
};

export default function onAction(state = defauleState, action) {
  switch (action.type) {
    case types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
}
