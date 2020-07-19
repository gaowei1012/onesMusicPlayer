'use strict'

import * as React from 'react'
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import {flex, center, iosFontFmily} from '../../styles/constants'

export default class MyPersoanl extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.conatiner}>
        <Text>个人主页</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: flex,
  }
})
