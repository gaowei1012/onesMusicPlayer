'use strict'
import * as React from 'react'
import {connect} from 'react-redux'
import actions from '../../redux/actions'
import {View, StyleSheet, Text, SafeAreaView} from 'react-native'
import {flex} from '../../styles/constants'

class RecommendPage extends React.Component {
  render() {
    return (
      <SafeAreaView style={styls.container}>
        <Text>热门推荐</Text>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToPrpps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToPrpps
)(RecommendPage)

const styls = StyleSheet.create({
  container: {
    flex:flex
  }
})