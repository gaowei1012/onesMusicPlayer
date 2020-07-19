'use strict'
import * as React from 'react'
import {connect} from 'react-redux'
import actions from '../../redux/actions/index'
import {View,Text,StyleSheet} from 'react-native'
import {flex,center,row,spaceBetween,defaultFontColor,defaultFontSize,iosFontFmily} from '../../styles/constants'

class SingerDetailPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>歌手列表</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingerDetailPage)

const styles = StyleSheet.create({
  container: {

  }
})