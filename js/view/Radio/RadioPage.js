import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Animated, Alert, ScrollView} from 'react-native';
import {flex, center, row} from '../../styles/constants';
import {connect} from 'react-redux';
import actions from '../../redux/actions/index';
import {radio, radioBanner, radioRaking} from '../../expand/api';
import TopNavigationBar from '../../common/TopNavigationBar';
import {screentWidth} from '../../utils/screenUtil';
import {GoBack} from '../../utils/GoBack';
import {px2dp} from '../../utils/px2dp';
import Swiper from 'react-native-swiper';
import NavigationUtil from '../../utils/NavigationUtil';
import SpinnerLoading from '../../components/Spinner';
import {Toast} from '../../utils/Toast';

class RaioPage extends PureComponent {
  state = {
    menu_data: [
      {id: 1, title: '分类', icon: require('../../images/common/user.png'), com: 'Classification'},
      {id: 2, title: '电台排行', icon: require('../../images/common/user.png'), com: 'Selected'},
      {id: 3, title: '主播学院', icon: require('../../images/common/user.png'), com: 'Anchors'}
    ]
  }
  componentDidMount() {
    this.getData();
  }
  /**
   * 获取数据
   */
  getData = () => {
    const {onLoadRadioData, onRadioBanner, onRadioRaking} = this.props;
    onLoadRadioData(radio);
    onRadioBanner(radioBanner);
    onRadioRaking(radioRaking);
  };
  /**
   * 跳转对应页
   */
  goToRadioDetail = () => {
    Alert.alert('hhh');
  };

  goToPage = (com) => {
    // NavigationUtil.goPage({}, com)
    Toast.showToast('功能开发中...')
  }

  goToMorePage = (id) => {
    console.log('id', id)
    NavigationUtil.goPage({id}, 'MoreRadio')
  }
  /**
   * 渲染头部
   */
  _renderTopBar = () => {
    let statusbar = {
      backgroundColor: '#ffffff',
      barStyle: 'dark-content',
    };
    const title = this.props.navigation.state.params.title;
    return (
      <TopNavigationBar
        title={title}
        statusBar={statusbar}
        style={{backgroundColor: '#ffffff'}}
        leftButton={GoBack(this.props, 'dark')}
      />
    );
  };

  // 电台 banner
  _rederRadioBanner = () => {
    const radioBanner = this.props.radioBanner.item;
    if (!radioBanner) {
      return <SpinnerLoading/>
    }
    return (
      <View style={styles.bannerBox}>
        <Swiper
          autoplay={true}
        >
          {radioBanner && radioBanner.map((item, index) => {
            return (
              <Image
                style={styles.bannerImage}
                key={index}
                source={{uri: item.pic}}
              />
            )
          })}
        </Swiper>
      </View>
    )
  }

  // 电台菜单
  _radioItem = () => {
    const {menu_data} = this.state;
    return (
      <View style={styles.radioItemBox}>
        {menu_data && menu_data.map(item => {
          return <TouchableOpacity activeOpacity={.8} onPress={() => this.goToPage(item.com)} style={{flexDirection: 'column', alignItems: center}}>
            <Image style={styles.radioItemIcon} source={item.icon} />
            <Text style={{marginTop: px2dp(6)}} key={item.id}>{item.title}</Text>
          </TouchableOpacity>
        })}
      </View>
    )
  }

  // 电台推荐
  _radioRaking = () => {
    const radioRaking = this.props.radioRaking.item;
    if (!radioRaking) {
      return <SpinnerLoading/>
    }
    return (
      <View style={styles.rakingBox}>
        <View style={styles.radioRakingBox}>
          <Text>电台推荐</Text>
          {/* <View>
            <Text>换一换</Text>
          </View> */}
        </View>
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {radioRaking && radioRaking.map(item => {
            return (
              <TouchableOpacity onPress={() => this.goToMorePage(item.id)} activeOpacity={.8} style={styles.rakingItemBox} key={item.id}>
                <Image style={styles.radioRakingImage} source={{uri: item.picUrl}}/>
                <Text numberOfLines={1} style={styles.radioText}>{item.rcmdtext}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  // 电台精选
  _radioSelect = () => {
    const radio = this.props.radio.item;
    if (!radio) {
      return <SpinnerLoading/>
    }
    return (
      <View style={styles.rakingBox}>
        <View style={styles.radioRakingBox}>
          <Text>电台精选</Text>
          {/* <View>
            <Text>换一换</Text>
          </View> */}
        </View>
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {radio && radio.map(item => {
            return (
              <TouchableOpacity onPress={() => this.goToMorePage(item.id)} activeOpacity={.8} style={styles.rakingItemBox} key={item.id}>
                <Image style={styles.radioRakingImage} source={{uri: item.picUrl}}/>
                <Text numberOfLines={1} style={styles.radioText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    ) 
  }
 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderTopBar()}
        <ScrollView>
          {this._rederRadioBanner()}
          {this._radioItem()}
          {this._radioRaking()}
          {this._radioSelect()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(({radio,radioBanner,radioRaking}) => ({radio,radioBanner,radioRaking}), (dispatch) => ({
  onLoadRadioData(url) {
    dispatch(actions.onLoadRadioData(url))
  },
  onRadioBanner(url) {
    dispatch(actions.onRadioBanner(url))
  },
  onRadioRaking(url) {
    dispatch(actions.onRadioRaking(url))
  }
}))(RaioPage)

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
  raioBox: {
    flexDirection: row,
    width: px2dp(345),
    height: px2dp(80),
    backgroundColor: '#eee',
    alignItems: center,
    marginBottom: px2dp(2),
    alignSelf: center,
    paddingLeft: px2dp(4),
  },
  imageBox: {
    width: px2dp(60),
    height: px2dp(60),
    overflow: 'hidden',
    borderRadius: px2dp(6),
  },
  image: {
    width: px2dp(60),
    height: px2dp(60),
  },
  text: {
    width: px2dp(200),
  },
  bannerBox: {
    marginTop: 10,
    width: px2dp(345),
    height: px2dp(120),
    alignSelf: center,
    borderRadius: px2dp(6),
    overflow: 'hidden',
  },
  bannerImage: {
    width: px2dp(345),
    height: px2dp(120),
    borderRadius: px2dp(6),
    overflow: 'hidden',
  },
  rakingBox: {
    width: px2dp(345),
    alignSelf: center,
  },
  radioRakingBox: {
    height: px2dp(20),
    marginTop: px2dp(20),
    flexDirection: row,
    justifyContent: 'space-between'
  },
  rakingItemBox: {
    flexDirection: 'column',
    width: px2dp(345/3),
    alignItems: center,
    marginTop: px2dp(10),
    
  },
  radioRakingImage: {
    width: px2dp(90),
    height: px2dp(90),
    borderRadius: px2dp(6),
    overflow: 'hidden',
    marginBottom: px2dp(4)
  },
  radioText: {
    width: px2dp(90),
  },
  radioItemBox: {
    width: px2dp(345),
    alignSelf: center,
    flexDirection: row,
    marginTop: px2dp(20),
    justifyContent: 'space-around'
  },
  radioItemIcon: {
    width: px2dp(30),
    height: px2dp(30)
  }
});
