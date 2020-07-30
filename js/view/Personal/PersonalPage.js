import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {
  iosFontFmily,
} from '../../styles/constants';
import PersonalItem from './components/PersonlItem';
import { screentWidth } from '../../utils/screenUtil';
import { px2dp } from '../../utils/px2dp';
import NavigationUtil from '../../utils/NavigationUtil';
import SettingItem from './components/SettingItem';
import {Toast} from '../../utils/Toast';
import DeviceStorage from '../../utils/DeviceStorage'

class PersonalPage extends React.PureComponent {
  state = {
    item:{},
    isLogin: false,
    user_menu: [
      {
        id: 1,
        title: '我的信息',
        icon: require('../../images/personal/message.png'),
        com: 'PersonalInformation',
      },
      {
        id: 2,
        title: '我的好友',
        icon: require('../../images/personal/home.png'),
        // com: 'MyFriend',
        com: ''
      },
      {
        id: 3,
        title: '个人主页',
        icon: require('../../images/personal/hor.png'),
        // com: 'MyPersoanl',
        com: ''
      },
      {
        id: 4,
        title: '个性装扮',
        icon: require('../../images/personal/personalized.png'),
        // com: 'DressedUp',
        com: ''
      },
    ],
    avatar_url: 'https://iph.href.lu/60x60',
    cache: 0,
  }
  async componentDidMount() {
    let { item } = this.props.navigation.state.params;
    this.setState({
      item:item.profile
    })
   let token = await DeviceStorage.get('token')
   console.log('token', token)
  }

  goToPage=(com)=> {
    if (com == '') {
      Toast.showToast('功能开发中，请稍后!')
    } else {
      NavigationUtil.goPage({}, com)
    }
  }

  goLoginPage=()=> {
    NavigationUtil.goPage({}, 'LoginPage')
  }

  _userInfo() {
    return <View style={styles.loginWrap}>
      {this.state.isLogin ? <View style={styles.loginBox}>
        <Image style={styles.avatar} source={{uri: this.state.avatar_url}}/>
        <Text style={styles.loginText}>执念</Text>
      </View> : <TouchableOpacity activeOpacity={1} onPress={this.goLoginPage} style={styles.notLoginBox}>
        <Image style={styles.avatar} source={{uri: this.state.avatar_url}}/>
        <View style={styles.loginBtn}>
          <Text style={styles.nowLoginText}>立即登录</Text>
        </View>
      </TouchableOpacity>}
      <View style={styles.userMenuBox}>
        {this.state.user_menu.map(item => (
          <TouchableOpacity activeOpacity={1}  onPress={() => this.goToPage(item.com)} style={styles.menuItemBox} key={item.id}>
            <Image style={styles.menuImage} source={item.icon}/>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  }

  _setting() {
    return (
      <View style={styles.settingBox}>
        <SettingItem
          arrow={require('../../images/common/arrow.png')}
          icon={require('../../images/common/bofang.png')}
          text={'我的收藏'}
          handleFunc={() => Toast.showToast('功能开发中')}
        />
        <SettingItem
          arrow={require('../../images/common/arrow.png')}
          icon={require('../../images/common/bofang.png')}
          text={'清除缓存'}
          handleFunc={() => Toast.showToast('功能开发中')}
          isShowNum={true}
          number={this.state.cache}
        />
        <SettingItem
          arrow={require('../../images/common/arrow.png')}
          icon={require('../../images/common/bofang.png')}
          text={'关于我们'}
          handleFunc={() => Toast.showToast('功能开发中')}
          isBorder={true}
        />
      </View>
    )
  }
  
  // 退出
  _exit = () => {
    return (
      <TouchableOpacity
        onPress={this.handleExit}
        activeOpacity={0.8}
        style={styles.exitBox}>
        <Text style={styles.exitText}>退出登录</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._userInfo()}
        {this._setting()}
      </SafeAreaView>
    );
  }
}

export default connect(({}) => ({}), 
(dispatch) => ({}))(PersonalPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  exitBox: {
    marginTop: px2dp(30),
    width: screentWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exitText: {
    fontFamily: iosFontFmily,
    fontSize: 20,
    color: 'red',
  },
  loginWrap: {
    width: px2dp(345),
    height: px2dp(120),
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingVertical: px2dp(6),
    borderRadius: px2dp(6),
    marginVertical: px2dp(20),
  },
  userMenuBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: px2dp(16)
  },
  menuImage: {
    width: px2dp(24),
    height: px2dp(24)
  },
  menuItemBox: {
    alignItems: 'center',
  },
  menuText: {
    marginVertical: px2dp(6),
    fontSize: px2dp(12),
    color: '#333'
  },
  loginBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px2dp(15)
  },
  loginText: {
    color: '#333',
    fontSize: px2dp(12),
    marginLeft: px2dp(16)
  },
  notLoginBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px2dp(15)
  },
  avatar: {
    width: px2dp(45),
    height: px2dp(45),
    borderRadius:px2dp(45/2)
  },
  loginBtn: {
    width: px2dp(60),
    height: px2dp(20),
    borderRadius: px2dp(10),
    borderWidth: px2dp(1),
    borderColor: '#ddd',
    marginLeft: px2dp(16),
    alignItems: 'center',
    justifyContent: 'center'
  },
  nowLoginText: {
    color: '#333',
    fontSize: px2dp(12),
  },
  // setting
  settingBox: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: px2dp(345),
    borderRadius: px2dp(6)
  }
});
