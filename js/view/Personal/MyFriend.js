'use strict'
import * as React from 'react'
import {View,Text,StyleSheet,SafeAreaView} from 'react-native'
import {flex,center,iosFontFmily} from '../../styles/constants'

export default class MyFriend extends React.Component {
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <Text>我的好友</Text>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: flex
  }
})