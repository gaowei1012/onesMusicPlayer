/*
 * @Author: your name
 * @Date: 2020-01-21 08:48:48
 * @LastEditTime : 2020-01-28 20:56:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /music_app/js/utils/asyncActionHandle.js
 */
/**
 * 处理异步函数
 * @param {dispatch} dispatch 
 * @param {data} data 
 */

export function handleData(dispatch, data, type) {
  dispatch({
    type: type,
    item: data,
  });
} 

export function handleErrorData(dispatch, err, type) {
  dispatch({
    type: type,
    err,
  })
}

/**
 * 初始化 state
 */
export const initState = {}