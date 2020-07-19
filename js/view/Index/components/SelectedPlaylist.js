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
    NavigationUtil.goPage({id}, 'SelectMorePage')
  }
  /**
   * 跳转更多页面
   */
  goToMorePage = () => {
    //const list = this.props.play_list.item;
    NavigationUtil.goPage({}, 'MorePlayPage');
  };
  renderItem() {
    const result = this.props.play_list.item;
    if(!result) {
      return <SpinnerLoading/>
    }
    return (
      <View style={{flexDirection: row, height: px2dp(130), paddingLeft: px2dp(6), marginRight: px2dp(6)}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {result.map(item => (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => this.goToPage(item.userId)}
                    style={styles.itemBox}
                    activeOpacity={0.8}>
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
                      <Text>{item.trackCount}</Text>
                    </View>
                    {/* 播放icon */}
                    <View style={styles.palyerBox}>
                      <Image
                        style={styles.palyerBtn}
                        source={require('../../../images/common/bofang.png')}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.itemText} numberOfLines={1}>
                    {item.name}
                  </Text>
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
          <TouchableOpacity
            style={styles.moreBox}
            onPress={this.goToMorePage}
            activeOpacity={0.8}>
            <Text style={styles.topMore}>更多</Text>
            <Image
              style={styles.arrow}
              source={require('../../../images/common/arrow.png')}
            />
          </TouchableOpacity>
        </View>
        {this.renderItem()}
      </View>
    );
  }
}

export default SelectedPlaylist;

const styles = StyleSheet.create({
  conatainer: {
    marginTop: px2dp(20),
    width: screentWidth,
    backgroundColor: '#eee',
    height: px2dp(170),
  },
  topBox: {
    flexDirection: row,
    justifyContent: spaceBetween,
    padding: px2dp(6),
  },
  topTitle: {
    fontFamily: iosFontFmily,
    color: fontColor,
    fontSize: px2dp(16),
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
    marginLeft: px2dp(4),
    width: px2dp(100),
    height: px2dp(100),
    backgroundColor: '#fff',
    borderRadius: px2dp(6),
    overflow: 'hidden',
    justifyContent: center,
  },
  playImage: {
    width: px2dp(100),
    height: px2dp(100),
  },
  itemText: {
    width: px2dp(90),
    textAlign: center,
    marginTop: px2dp(6),
    marginLeft: px2dp(10),
    fontFamily: iosFontFmily,
    fontSize: defaultFontSize,
    color: fontColor,
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
});
