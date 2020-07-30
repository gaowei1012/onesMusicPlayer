import React from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/actions/index';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {screentWidth} from '../../../utils/screenUtil';
import NavigationUtil from '../../../utils/NavigationUtil';
import {
  row,
  center,
  iosFontFmily,
  defaultFontColor,
  defaultFontSize,
  spaceBetween,
  fontColor,
  fontSmallSize,
} from '../../../styles/constants';
import {personalizedNewsong} from '../../../expand/api';
import SpinnerLoading from '../../../components/Spinner';
import { px2dp } from '../../../utils/px2dp';
import {Toast} from '../../../utils/Toast'


// 今日推荐
class GuessLikePage extends React.PureComponent {
  async componentDidMount() {
    this.getData();
  }
  getData = () => {
    const {onLoadRecommendData} = this.props;
    onLoadRecommendData(personalizedNewsong);
  };
  // 更多
  goToMore = () => {
    NavigationUtil.goPage({}, 'GuessLikeMore');
  };
  renderTopCom = () => {
    return (
      <View style={styles.topBox}>
        <Text style={styles.topTitle}>今日推荐</Text>
      </View>
    );
  };
  /**
   * 跳转页面
   */
  goGuessLikePage = () => {
    //NavigationUtil.goPage({title: '猜你喜欢'}, 'Player');
    Toast.showToast('功能开发中')
  };
  _renderItem(data) {
    const item = data.item;
    // console.log('item--##__##', item)
    return <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.goGuessLikePage(item)}
        key={item.id}
        style={styles.guessBox}>
          <View style={styles.guessImageBox}>
            <Image source={{uri: item.picUrl}} style={styles.guessImage} />
          </View>
          <View style={styles.guessDesBox}>
            <Text style={styles.guessTitle}>{item.name}</Text>
            <Text style={styles.guessDes}>{item.des}</Text>
          </View>
      </TouchableOpacity>
  }
  /**
   * 渲染推荐喜欢列表
   */
  renderGuessLikeItem = () => {
    const recommend = this.props.recommend.item;
    if (!recommend) {
      return <SpinnerLoading/>
    }
    return <FlatList
          data={recommend}
          renderItem={this._renderItem}
        />
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderTopCom()}
        {this.renderGuessLikeItem()}
      </View>
    );
  }
}

export default connect(({recommend}) => ({recommend}), (dispatch) => ({
  onLoadRecommendData(url) {
    dispatch(actions.onLoadRecommendData(url))
  }
}))(GuessLikePage)

const styles = StyleSheet.create({
  container: {
    marginTop: px2dp(10),
  },
  topBox: {
    width: px2dp(360),
    alignSelf: 'center',
    flexDirection: row,
    justifyContent: spaceBetween,
  },
  topTitle: {
    fontFamily: iosFontFmily,
    color: fontColor,
    fontSize: 16,
  },
  topMoreBox: {
    flexDirection: row,
    alignItems: center,
  },
  moreText: {
    fontFamily: iosFontFmily,
    color: defaultFontColor,
    fontSize: fontSmallSize,
  },
  arrow: {
    width: 16,
    height: 16,
  },
  guessBox: {
    width: screentWidth,
    height: px2dp(120),
    //backgroundColor: '#eee',
    flexDirection: row,
  },
  guessImageBox: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  guessImage: {
    width: '100%',
    height: '100%',
  },
  guessDesBox: {
    marginLeft: 10,
    alignSelf: center,
  },
  guessTitle: {
    fontFamily: iosFontFmily,
    fontSize: 16,
    color: fontColor,
  },
  guessDes: {
    fontFamily: iosFontFmily,
    fontSize: defaultFontSize,
    color: defaultFontColor,
  },
});
