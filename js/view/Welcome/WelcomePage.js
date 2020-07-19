import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import NavigationUtil from '../../utils/NavigationUtil'
import {flex, flexDirectionRow, center} from '../../styles/constants'
import { px2dp } from '../../utils/px2dp'

export default class WeclomePage extends React.PureComponent {
  
  componentDidMount() {
    this.init();
  }

  // 加载首页初始化
  init() {
    this.timer = setTimeout(() => {
      NavigationUtil.restToHomePage({
        navigation: this.props.navigation,
      });
    }, 1000);
  }
  componentWillMount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerBox}>
          <Text style={styles.musicTitle}>音乐的力量</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: flex,
    backgroundColor: 'red'
  },
  containerBox: {
    flexDirection: flexDirectionRow,
    alignItems: center,
    justifyContent: center,
    width: '100%',
    height: '100%',
  },
  musicTitle: {
    fontSize: px2dp(36),
    color: '#fff',
  }
});
