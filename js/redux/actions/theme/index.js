/*
 * @Author: your name
 * @Date: 2020-01-19 11:02:19
 * @LastEditTime: 2020-01-19 11:02:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /music_app/js/redux/actions/theme/index.js
 */

'use strict';

import types from '../../actionTypes/index';

export function onThemeChange(theme) {
  return {type: types.THEME_CHANGE, theme: theme};
}
