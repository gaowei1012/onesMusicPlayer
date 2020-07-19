import React, {useState, useEffect} from 'react';
import {screentWidth} from '../../../utils/screenUtil';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  spaceBetween,
  fontColor,
  defaultFontColor,
  defaultFontSize,
  fontSmallSize,
  iosFontFmily,
  row,
  center,
} from '../../../styles/constants';
import NavigationUtil from '../../../utils/NavigationUtil';
import { px2dp } from '../../../utils/px2dp';

const listArr = [
  {
    id: 1,
    icon: require('../../../images/common/bofang.png'),
    text: '我的私信',
    arrow: require('../../../images/common/arrow.png'),
    com: 'MyMessage',
  },
  {
    id: 2,
    icon: require('../../../images/common/bofang.png'),
    text: '我的收藏',
    arrow: require('../../../images/common/arrow.png'),
    com: 'MyMessage',
  },
  {
    id: 5,
    icon: require('../../../images/common/bofang.png'),
    text: '夜间模式',
    arrow: require('../../../images/common/arrow.png'),
    com: 'MyMessage',
  },
  {
    id: 6,
    icon: require('../../../images/common/bofang.png'),
    text: '清除缓存',
    arrow: require('../../../images/common/arrow.png'),
    com: 'MyMessage',
  },
  {
    id: 7,
    icon: require('../../../images/common/bofang.png'),
    text: '隐私条款',
    arrow: require('../../../images/common/arrow.png'),
    com: 'MyMessage',
  },
];

export default class PersonalItem extends React.Component {
  state = {
    list: [
      {
        id: 1,
        icon: require('../../../images/common/bofang.png'),
        text: '我的私信',
        arrow: require('../../../images/common/arrow.png'),
        com: 'MyMessage',
      },
      {
        id: 2,
        icon: require('../../../images/common/bofang.png'),
        text: '我的收藏',
        arrow: require('../../../images/common/arrow.png'),
        com: 'MyMessage',
      },
      {
        id: 5,
        icon: require('../../../images/common/bofang.png'),
        text: '夜间模式',
        arrow: require('../../../images/common/arrow.png'),
        com: 'MyMessage',
      },
      {
        id: 6,
        icon: require('../../../images/common/bofang.png'),
        text: '清除缓存',
        arrow: require('../../../images/common/arrow.png'),
        com: 'MyMessage',
      },
      {
        id: 7,
        icon: require('../../../images/common/bofang.png'),
        text: '隐私条款',
        arrow: require('../../../images/common/arrow.png'),
        com: 'MyMessage',
      },
    ],
  };
  componentDidMount() {}
  goToPage(text, com) {
    console.log('com', com);
    NavigationUtil.goPage({title: text}, com);
  }
  _list() {
    const {list} = this.state;
    return (
      <View style={{
        width: px2dp(345),
        alignSelf: 'center'
      }}>
        {list == null
          ? null
          : list.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => this.goToPage(item.text, item.com)}
                  activeOpacity={0.8}
                  style={styles.listBox}>
                  <View style={styles.titleBox}>
                    <Image style={styles.icon} source={item.icon} />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                  <View style={styles.arrowBox}>
                    <Image style={styles.arrow} source={item.arrow} />
                  </View>
                </TouchableOpacity>
              );
            })}
      </View>
    );
  }
  render() {
    return <View style={styles.container}>{this._list()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  listBox: {
    height: 56,
    //width: screentWidth,
    flexDirection: row,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: center,
    justifyContent: spaceBetween,
  },
  titleBox: {
    marginLeft: 10,
    flexDirection: row,
    alignItems: center,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    marginLeft: 8,
    fontFamily: iosFontFmily,
    color: fontColor,
  },
  arrowBox: {
    marginRight: 10,
  },
  arrow: {
    width: 20,
    height: 20,
  },
});
