'use strict';

import * as React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  row,
  center,
  spaceBetween,
  iosFontFmily,
  fontColor,
} from '../../../styles/constants';
import {screentWidth} from '../../../utils/screenUtil';
import NavigationUtil from '../../../utils/NavigationUtil';
import {px2dp} from '../../../utils/px2dp';
import {Toast} from '../../../utils/Toast';

export default class MenuItem extends React.Component {
  state = {
    list: [
      {
        id: 1,
        text: '每日推荐',
        icon: require('../../../images/common/user.png'),
        com: 'SingerPage',
      },
      {
        id: 2,
        text: '排行榜',
        icon: require('../../../images/common/ranking.png'),
        com: 'RankingPage',
      },
      {
        id: 3,
        text: '歌单',
        icon: require('../../../images/common/singerList.png'),
        // com: 'PlayListPage',
        com: ''
      },
      {
        id: 4,
        text: '电台',
        icon: require('../../../images/common/radio.png'),
        com: 'RadioPage',
      },
      // {
      //   id: 5,
      //   text: '推荐',
      //   icon: require('../../../images/common/recommen.png'),
      //   com: 'RecommenPage',
      // },
    ],
  };
  goToPage(text, com) {
    if (com == '') {
      Toast.showToast('功能开发中')
    } else {
      NavigationUtil.goPage({title: text}, com);
    }
  }
  renderMenuItem() {
    const {list} = this.state;
    return (
      <View style={styles.menuBox}>
        {list.map(item => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={item.id}
              style={styles.itemBox}
              onPress={() => this.goToPage(item.text, item.com)}>
              <Image style={styles.image} source={item.icon} />
              <Text style={styles.text}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  render() {
    return <View style={styles.container}>{this.renderMenuItem()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: px2dp(20),
  },
  menuBox: {
    width: px2dp(345),
    flexDirection: row,
    justifyContent: spaceBetween,
    alignSelf: center,
  },
  itemBox: {
    width: px2dp(50),
    height: px2dp(60),
    //backgroundColor: 'red',
    alignItems: center,
  },
  image: {
    width: px2dp(25),
    height: px2dp(25),
  },
  text: {
    marginTop: px2dp(8),
    fontFamily: iosFontFmily,
    fontSize: px2dp(12),
    color: fontColor,
  },
});
