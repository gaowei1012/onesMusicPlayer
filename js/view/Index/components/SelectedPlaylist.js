'use strict';

import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {screentWidth} from '../../../utils/screenUtil';
import NavigationUtil from '../../../utils/NavigationUtil';
import {
  row,
  center,
  spaceBetween,
  iosFontFmily,
  fontColor,
  defaultFontSize,
  defaultFontColor,
  fontSmallSize,
} from '../../../styles/constants';
import {px2dp} from '../../../utils/px2dp';
import SpinnerLoading from '../../../components/Spinner';
import {Toast} from '../../../utils/Toast';
// 精选歌单
class SelectedPlaylist extends React.Component {
  static propTypes = {
    play_list: PropTypes.object,
  };
  _mapData = () => {
    const {play_list} = this.props;
    let result = play_list.item;
  };
  goToPage(id) {
    Toast.showToast('功能开发中')
  }
  /**
   * 跳转更多页面
   */
  goToMorePage = () => {
    //const list = this.props.play_list.item;
    //NavigationUtil.goPage({}, 'MorePlayPage');
    Toast.showToast('功能开发中')
  };
  renderItem() {
    const result = this.props.play_list.item;
    if(!result) {
      return <SpinnerLoading/>
    }
    return (
      <View style={{flexDirection: row, paddingHorizontal: px2dp(6)}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {result.map(item => (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => this.goToPage(item.userId)}
                    style={styles.itemBox}
                    activeOpacity={1}>
                    <Image
                      source={{uri: item.coverImgUrl}}
                      style={styles.playImage}
                      resizeMode="contain"
                    />
                    {/* 播放数量 */}
                    <View style={styles.palyerNumBox}>
                      <Image
                        source={require('../../../images/common/player.png')}
                        style={{width: 10, height: 10}}
                      />
                      <Text style={styles.playCount}>{item.trackCount}</Text>
                    </View>
                    <Text style={styles.itemText} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                 
                </View>
              ))}
        </ScrollView>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.conatainer}>
        <View style={styles.topBox}>
          <Text style={styles.topTitle}>精选歌单</Text>
        </View>
        {this.renderItem()}
      </View>
    );
  }
}

export default SelectedPlaylist;

const styles = StyleSheet.create({
  conatainer: {
    marginTop: px2dp(8),
    width: screentWidth,
    paddingBottom: px2dp(6)
  },
  topBox: {
    flexDirection: row,
    justifyContent: spaceBetween,
    padding: px2dp(6),
  },
  topTitle: {
    fontFamily: iosFontFmily,
    color: '#333',
    fontSize: px2dp(14),
  },
  moreBox: {
    flexDirection: row,
    alignItems: center,
  },
  topMore: {
    fontFamily: iosFontFmily,
    color: defaultFontColor,
    fontSize: fontSmallSize,
  },
  arrow: {
    width: px2dp(15),
    height: px2dp(15),
  },
  itemBox: {
    marginTop: px2dp(4),
    marginHorizontal: px2dp(4),
    width: px2dp(80),
  },
  playImage: {
    width: px2dp(80),
    height: px2dp(80),
    borderRadius: px2dp(6),
  },
  itemText: {
    // width: px2dp(80),
    marginTop: px2dp(6),
    fontFamily: iosFontFmily,
    fontSize: px2dp(12),
    color: fontColor,
    marginHorizontal: px2dp(3)
  },
  // 播放量
  palyerNumBox: {
    position: 'absolute',
    top: px2dp(2),
    marginLeft: px2dp(2),
    flexDirection: row,
    alignItems: center,
  },
  // 播放
  palyerBox: {
    position: 'absolute',
    height: px2dp(25),
    width: px2dp(25),
    borderRadius: px2dp(4),
    //backgroundColor: 'red',
    alignSelf: center,
  },
  palyerBtn: {
    height: px2dp(25),
    width: px2dp(25),
  },
  playCount: {
    fontSize: px2dp(12),
    color: '#fff',
    marginHorizontal: px2dp(3)
  }
});
