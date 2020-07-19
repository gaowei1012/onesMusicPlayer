'use strict'
import * as React from 'react'
import store from './redux/store/index'
import {Provider} from 'react-redux'
import {YellowBox} from 'react-native'
import AppNavigation from './navigation/AppNavigation'

export default class App extends React.Component {
  fixViewPagerAndroid = () => {
    // eslint-disable-next-line dot-notation
    YellowBox.ignoreWarnings['ViewPagerAndroid'];
  };
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}
