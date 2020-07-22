import React, {PureComponent} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground, Platform} from 'react-native';

import {rakingOnesDetail} from '../../expand/api';
import {px2dp} from '../../utils/px2dp';
import TopNavigationBar from '../../common/TopNavigationBar';
import {GoBack} from '../../utils/GoBack';
import {screentWidth} from '../../utils/screenUtil'
import NavigationUtil from '../../utils/NavigationUtil'

import {connect} from 'react-redux';
import actions from '../../redux/actions';
import SpinnerLoading from '../../components/Spinner';

class RankingDetail extends PureComponent {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.getRankingDetailData()
  }
  getRankingDetailData() {
    const { onLoadListData } = this.props;
    const id = this.props.navigation.state.params.id;
    const url = `${rakingOnesDetail}?id=${id}`;
    onLoadListData(url);
  }
  _topBar() {
    const item = this.props.rankiglist.item;
    if (!item) {
      return <SpinnerLoading/>
    }
    const subscribers = item.subscribers;
    // console.log('subscribers', subscribers[0].backgroundUrl)
    return (
      <ImageBackground style={styles.background} source={{uri: subscribers[0].backgroundUrl}}>
        {/* top header */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              NavigationUtil.goBack(this.props.navigation)
            }}
          >
            <Image style={{width: px2dp(24), height: px2dp(24)}} source={require('../../images/back.png')}/>
          </TouchableOpacity>
          <Text style={styles.title}>排行榜</Text>
          <View>
            <Text>pl</Text>
          </View>
        </View>
      </ImageBackground>
     
    )
  }
  _allPlayper() {

  }
  _renderList() {

  }
  render() {
    const item = this.props.rankiglist;
    console.log('ietm ----item', item)
    const StatusBar = {
      backgroundColor: '#ffffff',
      barStyle: 'dark-content',
    };
    const renderTopBar = (
      <TopNavigationBar
        title={'详情'}
        statusBar={StatusBar}
        style={{backgroundColor: '#ffffff'}}
        leftButton={GoBack(this.props, 'dark')}
      />
    )
    return <View style={styles.container}>
      {this._topBar()}
      <View style={styles.contentBox}>
        {this._allPlayper()}
        {this._renderList()}
      </View>
    </View>
  }
}

export default connect(({rankiglist}) => 
  ({rankiglist}), (dispatch) => ({
    onLoadListData(url) {
      dispatch(actions.onLoadListData(url))
    }
}))(RankingDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    width: screentWidth, 
    height: px2dp(300),
  },
  topWarp: {
    width: px2dp(345),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? px2dp(44) : 0
  },
  contentBox: {
    backgroundColor: '#fff',
    borderRadius: px2dp(30),
    position: 'relative',
    top: px2dp(-30),
    left: 0,
    zIndex: 888,
    height: px2dp(530)
  },
  topHeader: {
    width: px2dp(345),
    alignSelf:'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? px2dp(44) : px2dp(10)
  },
  title: {
    color: '#fff',
    fontSize: px2dp(14)
  }
})