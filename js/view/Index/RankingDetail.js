import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground, Platform, Alert} from 'react-native';

import {rakingOnesDetail} from '../../expand/api';
import {px2dp} from '../../utils/px2dp';
import {screentWidth} from '../../utils/screenUtil'
import NavigationUtil from '../../utils/NavigationUtil'

import {connect} from 'react-redux';
import actions from '../../redux/actions';
import SpinnerLoading from '../../components/Spinner';
import { FlatList } from 'react-native-gesture-handler';
import {Toast} from '../../utils/Toast'

class RankingDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: null
    }
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
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.shard}>分享</Text>
        </View>
        <View style={styles.nameWrap}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </ImageBackground>
    )
  }
  _allPlayper() {
    return (
      <View style={styles.contentTopBox}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flexDirection: 'row',alignItems: 'center'}}
          onPress={() => Toast.showToast('功能开发中')}
          >
          <Image style={{width: px2dp(18), height: px2dp(18), marginRight: px2dp(3)}} source={require('../../images/player.png')}/>
          <Text style={styles.textall}>全部播放</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Toast.showToast('功能开发中')}
        >
          <Text style={styles.textall}>添加收藏</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderItem(data){
    const item = data.item;
    return <TouchableOpacity style={styles.renderItemBox} 
      onPress={() => {
        NavigationUtil.goPage({item}, 'Player')
      }}
      activeOpacity={1}>
      <Image style={styles.itemImage} source={{uri: item.al.picUrl}}/>
      <View style={styles.descBox}>
        <Text style={styles.muiscName}>{item.name}</Text>
        <View style={styles.muiscDescBox}>
          {item.ar.map(item => (
            <View key={item.id}>
              <Text style={[styles.textSmal, {marginLeft: px2dp(2)}]}>{item.name}</Text>
            </View>
          ))}
          <Text style={styles.textSmal}>-</Text>
          <Text style={styles.textSmal}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  }
  _renderList() {
    const item = this.props.rankiglist.item;
    if (!item) {
      return <SpinnerLoading/>
    }
    const tracks = item.tracks;
    console.log('tracks', tracks)
    return <FlatList
      data={tracks}
      renderItem={this._renderItem}
    />
  }
  render() {
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
  },
  nameWrap: {
    width: px2dp(345),
    alignSelf: 'center',
    marginTop: px2dp(30),
  },
  name: {
    color: '#fff',
    fontSize: px2dp(24),
    fontWeight: '800'
  },
  contentTopBox: {
    width: px2dp(345),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: px2dp(10),
    marginBottom: px2dp(8)
  },
  itemImage: {
    width: px2dp(30),
    height: px2dp(30),
    borderRadius: px2dp(15),
    marginRight: px2dp(6)
  },
  renderItemBox: {
    width: px2dp(345),
    flexDirection: 'row',
    alignItems:'center',
    alignSelf: 'center',
    marginVertical: px2dp(6)
  },
  muiscDescBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px2dp(6),
  },
  textSmal: {
    color: '#333',
    fontSize: px2dp(10)
  },
  textall: {
    color: '#333',
    fontSize: px2dp(12)
  },
  shard: {
    fontSize: px2dp(12),
    color: '#fff'
  }
})