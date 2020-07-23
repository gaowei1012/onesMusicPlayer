import * as React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Animated,
  ScrollView,
  FlatList,
  ImageBackground,
  Platform,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../redux/actions/index';
import {personalized} from '../../expand/api';
import {px2dp} from '../../utils/px2dp';
import {width} from '../../utils/screenUtil';
import SpinnerLoading from '../../components/Spinner';
import NavigationUtil  from '../../utils/NavigationUtil'
import {Toast} from '../../utils/Toast'

// 每日推荐
class SingerPage extends React.Component {
  state = {
    loading: false,
    title: null,
  };
  componentDidMount() {
    this.getPeraonaliz();
    this.getRouterParams();
    this.animated();
  }
  /**
   * 获取数据
   */
  getPeraonaliz = () => {
    const {onLoadPersonalizData} = this.props;
    onLoadPersonalizData(personalized);
  };
  /**
   * 获取上级传参
   */
  getRouterParams = () => {
    const title = this.props.navigation.state.params.title;
    this.setState({title});
  };
  /**
   * 渲染动画
   */
  animated = () => {};
  /**
   * 渲染头部
   */
  _renderTopBar = () => {
    return <ImageBackground
      style={styles.topHeaderBox}
      source={require('../../images/common/bg.jpg')}
    >
      <View style={styles.topHeaderNavBox}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            NavigationUtil.goBack(this.props.navigation)
          }}
        >
          <Image style={{width: px2dp(24), height: px2dp(24)}}  source={require('../../images/back.png')}/>
        </TouchableOpacity>
        {/* <Text>right</Text> */}
      </View>
    </ImageBackground>
  };
  _renderItem(data) {
    const item = data.item;
    return   <Animated.View style={styles.personalBox}>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={{uri: item.picUrl}} />
        </View>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
      </Animated.View>
  }
  /* 渲染列表 */
  _renderList = () => {
    const personaliz = this.props.personaliz.item;
    if (!personaliz) {
      return <SpinnerLoading/>
    }
    return (
      <FlatList
        data={personaliz}
        renderItem={this._renderItem}
      />
    )
  }
  // 全部播放
  allPlayper=()=> {
    return (
      <View style={styles.contentTopBox}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flexDirection: 'row',alignItems: 'center'}}
          onPress={() => Toast.showToast('功能开发中')}
          >
          <Image style={{width: px2dp(18), height: px2dp(18), marginRight: px2dp(3)}} source={require('../../images/player.png')}/>
          <Text style={styles.textDesc}>全部播放</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Toast.showToast('功能开发中')}
        >
          <Text style={styles.textDesc}>多选</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderTopBar()}
        <View style={styles.contentBox}>
          {this.allPlayper()}
          {this._renderList()}
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(({personaliz}) => ({personaliz}), (dispatch) => ({
  onLoadPersonalizData(url) {
    dispatch(actions.onLoadPersonalizData(url))
  }
}))(SingerPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  personalBox: {
    width: px2dp(345),
    height: px2dp(45),
    alignSelf: 'center',
    marginTop: px2dp(4),
    // backgroundColor: defaultBackgroundColor,
    marginBottom: px2dp(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: px2dp(6),
  },
  imageBox: {
    width: px2dp(40),
    height: px2dp(40),
    borderRadius: px2dp(6),
    overflow: 'hidden',
    alignItems: 'center',
    marginLeft: px2dp(4)
  },
  image: {
    width: px2dp(60),
    height: px2dp(60),
  },
  name: {
    marginLeft: px2dp(10),
    width: px2dp(260),
  },
  topHeaderBox: {
    width: width,
    height: px2dp(300),
    marginTop: Platform.OS === 'ios' ? px2dp(-44): 0,
    zIndex: -100
  },
  topHeaderNavBox: {
    width: px2dp(345),
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? px2dp(44) : px2dp(10),
    height: px2dp(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  contentBox: {
    backgroundColor: '#fff',
    borderRadius: px2dp(30),
    position: 'relative',
    top: px2dp(-30),
    left: 0,
    zIndex: 888,
    height: px2dp(530)
  },
  textDesc: {
    fontSize: px2dp(12),
    color: '#333'
  }
});
