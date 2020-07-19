import * as React from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/actions/index';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {screentWidth} from '../../../utils/screenUtil';
import NavigationUtil from '../../../utils/NavigationUtil';
import {
  flex,
  row,
  center,
  iosFontFmily,
  defaultFontColor,
  defaultFontSize,
  spaceBetween,
  spaceAround,
  fontColor,
  fontSmallSize,
} from '../../../styles/constants';
import {personalizedNewsong} from '../../../expand/api';
import SpinnerLoading from '../../../components/Spinner';

class GuessLikePage extends React.Component {
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
        {/* <TouchableOpacity onPress={this.goToMore} style={styles.topMoreBox}>
          <Text style={styles.moreText}>更多</Text>
          <Image
            style={styles.arrow}
            source={require('../../../images/common/arrow.png')}
          />
        </TouchableOpacity> */}
      </View>
    );
  };
  /**
   * 跳转页面
   */
  goGuessLikePage = () => {
    NavigationUtil.goPage({title: '猜你喜欢'}, 'Player');
  };
  /**
   * 渲染推荐喜欢列表
   */
  renderGuessLikeItem = () => {
    const recommend = this.props.recommend.item;
    if (!recommend) {
      return <SpinnerLoading/>
    }
    return (
      <>
        {recommend  && recommend.map(item=> {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
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
          )
        })}
      </>
    );
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

const mapStateToProps = state => ({
  recommend: state.recommend,
});

const mapDispatchToProps = dispatch => ({
  onLoadRecommendData: url => dispatch(actions.onLoadRecommendData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuessLikePage);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  topBox: {
    marginLeft: 6,
    marginRight: 6,
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
    height: 120,
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
