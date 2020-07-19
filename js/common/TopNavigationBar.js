import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  StatusBar,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import THEME_DEFAULT from './THEME_DEFAULT';
import {
  flexRowCenter,
  flexRowEnd,
  flexRowSpaceBtween,
  flexRowStart,
} from '../styles/flex';
import {STATUS_BAR_H, NAV_BAR_H} from '../utils/navBar_StatusBar_Height';
import {px2dp} from '../utils/px2dp';
import {center} from '../styles/constants';
const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default class NavigationBar extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
    translucent: PropTypes.bool, // 是否将状态栏设为透明
    color: PropTypes.string,
    fontSize: PropTypes.number,
    animated: PropTypes.bool, // 状态栏动画
  };

  static defaultProps = {
    // transparent: false
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
      translucent: false,
      animated: true,
    },
    color: '#333333',
    fontSize: 16,
  };

  render() {
    let {fontSize, color} = this.props;
    let statusBar = !this.props.statusBar.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View>
    ) : null;
    let titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text
        //ellipsizeMode="head"
        numberOfLines={1}
        style={[styles.title, {color: color, fontSize: fontSize}]}>
        {this.props.title}
      </Text>
    );
    let content = this.props.hide ? null : (
      <View style={styles.navBar}>
        <View style={styles.leftBtnBox}>
          {this.getButtonElement(this.props.leftButton)}
        </View>
        <View
          style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        <View style={styles.rightBtnBox}>
          {this.getButtonElement(this.props.rightButton)}
        </View>
      </View>
    );
    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    );
  }

  /**
   * @param ele element 元素节点
   * @returns {*}
   */
  getButtonElement(ele) {
    return <View style={styles.navBarButton}>{ele ? ele : null}</View>;
  }
}

const styles = StyleSheet.create({
  navBar: {
    ...flexRowSpaceBtween,
    height: NAV_BAR_H, // 根据平台设置高度
    paddingHorizontal: 15,
  },
  navBarTitleContainer: {
    ...flexRowCenter,
  },
  navBarButton: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: THEME_DEFAULT.THEME_DEFAULT,
  },
  title: {
    width: px2dp(200),
    fontWeight: 'bold',
    textAlign: center,
  },
  statusBar: {
    //height: STATUS_BAR_H,
  },
  leftBtnBox: {
    ...flexRowStart,
    width: 50,
    // height: NAV_BAR_H, // 根据平台设置高度
  },
  rightBtnBox: {
    ...flexRowEnd,
    width: 50,
    // height: NAV_BAR_H, // 根据平台设置高度
  },
});
