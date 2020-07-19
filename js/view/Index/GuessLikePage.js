'use strict'
import * as React from 'react'
import {connect} from 'react-redux'
import actions from '../../redux/actions/index'
import {View,Text,StyleSheet,SafeAreaView} from 'react-native'
import {flex,center} from '../../styles/constants'
import {screentWidth} from '../../utils/screenUtil'

class GuessLikePage extends React.Component {
  render() {
    return <SafeAreaView style={styles.container}>
      <Text>你喜欢的歌曲</Text>
    </SafeAreaView>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuessLikePage)

const styles = StyleSheet.create({
  container: {
    flex: flex
  }
})
