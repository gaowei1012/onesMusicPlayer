import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  row,
  flex,
  center,
  defaultFontColor,
  defaultFontSize,
  defaultBackgroundColor,
} from '../styles/constants';

const THEME_COLOR = 'red';

export default class FlatItems extends React.Component {
  static defaultProps = {
    loadingText: '数据加载中...',
    loadErrorText: '点击重新加载...',
    loadEndText: '已经加载全部',
    isLoading: true,
    footerContainer: {},
    footerText: {},
    data: [],
    id: 'falt_list',
    onRequest: isRefresh => {},
  };

  static propTypes = {};

  loadData = () => {};

  constructor(props) {
    super(props);
    this.state = {
      enableLoadMore: true,
      enableRefresh: true,
      fadeOutOpacity: new Animated.Value(0), // 初始化动画
      list: [
        {
          id: 1,
          desc: '你好',
          img_url: '',
        },
        {
          id: 2,
          desc: '我好',
          img_url: '',
        },
        {
          id: 3,
          desc: '大家好',
          img_url: '',
        },
      ],
    };
  }

  componentDidMount() {
    // this.startAnimated();
    console.log('this state', this.state);
  }

  // 动画执行
  startAnimated = () => {
    this.state.fadeOutOpacity.setValue(1);
    Animated.timing(this.state.fadeOutOpacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear, // 线性渐变函数
    }).start();
  };

  _renderItem = data => {
    console.log('data', data);
    return (
      <View>
        <Text>{data.desc}</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.list}
          renderItem={data => this._renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={THEME_COLOR}
              refreshing={this.state.isLoading}
              onRefresh={this.loadData}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
});
