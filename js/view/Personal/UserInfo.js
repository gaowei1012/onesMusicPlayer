import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import actions from '../../redux/actions/index';
import NavigationUtil from '../../utils/NavigationUtil';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {
  row,
  flex,
  defaultFontSize,
  iosFontFmily,
  fontColor,
  center,
  defaultBackgroundColor,
  spaceBetween,
  spaceAround,
  fontSmallSize,
} from '../../styles/constants';
import { dailySignin, setting } from '../../expand/api';
import PropTypes from 'prop-types';
import { px2dp } from '../../utils/px2dp'

class UserInfo extends React.Component {
  state = {
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
        com: 'MyFriend',
      },
      {
        id: 3,
        title: '个人主页',
        icon: require('../../images/personal/hor.png'),
        com: 'MyPersoanl',
      },
      {
        id: 4,
        title: '个性装扮',
        icon: require('../../images/personal/personalized.png'),
        com: 'DressedUp',
      },
    ],
  };
  static defaultProps = {
    avatar_url: 'https://iph.href.lu/60x60',
    username: '执念',
  };
  static propTypes = {
    avatar_url: PropTypes.string,
    username: PropTypes.string.isRequired, //.isRequired 必传
  };
  // props
  componentDidMount() {
    const token = AsyncStorage.getItem('token')

    if (token) {
      console.log('登录成功啦')
      const { username } = this.props;
      console.log('username', username)
    } else {
      console.log('请检查是否登录')
    }
  }
  // 签到
  getDailyData() {
    const { onDailySinger, onSettingData } = this.props;
    onDailySinger(dailySignin);
    onSettingData(setting);
  }
  // 跳转
  handleUserInfo = () => {
    const token = AsyncStorage.getItem('token')
    if (!token) {
      // 跳转页面
      NavigationUtil.goPage({ title: '登录页' }, 'LoginPage',);
    } else {
      
      NavigationUtil.goPage({ title: '登录页' }, 'LoginPage',);
    }

  };
  goToPage = (item, title) => {
    NavigationUtil.goPage(
      {
        title: title,
      },
      item,
    );
  };
  // 签到
  handeSignin = () => {
    NavigationUtil.goPage({ title: '签到' }, 'SigninPage');
  };
  /* 顶部用户信息栏 */
  renderUserInfoTab() {
    const { user_menu } = this.state;
    const { username, avatar_url } = this.props
    return (
      <View style={styles.topUserInfoBox}>
        {/* userinfo 头部 */}
        <View style={styles.userTopBox}>
          <View style={styles.avatarBox}>
            <TouchableOpacity
              onPress={this.handleUserInfo}
              style={styles.avatarImageBox}
              activeOpacity={1}>
              <Image
                style={styles.image}
                source={{ uri: avatar_url }}
              />
            </TouchableOpacity>
            <View style={styles.usernameBox}>
              <Text>{username}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.handeSignin}
            style={styles.signBox}
            activeOpacity={1}>
            <Text style={styles.signText}>签到</Text>
          </TouchableOpacity>
        </View>
        {/* 菜单 */}
        <View style={styles.userMenuBox}>
          {user_menu == null
            ? null
            : user_menu.map(item => (
              <TouchableOpacity
                onPress={() => this.goToPage(item.com, item.title)}
                key={item.id}
                style={styles.menuInfo}>
                <Image style={styles.menuImage} source={item.icon} />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
  render() {
    return <View style={styles.container}>{this.renderUserInfoTab()}</View>;
  }
}

const mapStateToProps = state => ({
  daily: state.daily,
  setting: state.setting,
});

const mapDispatchToProps = dispatch => ({
  onDailySinger: url => dispatch(actions.onDailySinger(url)),
  onSettingData: url => dispatch(actions.onSettingData(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);

const styles = StyleSheet.create({
  container: {
    flex: flex,
    backgroundColor: defaultBackgroundColor,
  },
  topUserInfoBox: {
    marginTop: px2dp(20),
    width: px2dp(345),
    backgroundColor: '#eee',
    height: px2dp(120),
    alignSelf: center,
    borderRadius: px2dp(10),
  },
  userTopBox: {
    height: px2dp(60),
    width: px2dp(345),
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    borderBottomWidth: px2dp(0.5),
    flexDirection: row,
    justifyContent: spaceBetween,
  },
  avatarBox: {
    flexDirection: row,
    marginLeft: px2dp(10),
    marginTop: px2dp(5),
  },
  avatarImageBox: {
    width: px2dp(48),
    height: px2dp(48),
    overflow: 'hidden',
    borderRadius: px2dp(25),
  },
  image: {
    width: px2dp(50),
    height: px2dp(50),
  },
  usernameBox: {
    justifyContent: center,
    marginLeft: px2dp(10),
  },
  text: {
    fontSize: defaultFontSize,
    fontFamily: iosFontFmily,
    color: fontColor,
  },
  signBox: {
    marginRight: px2dp(10),
    height: px2dp(30),
    alignItems: center,
    alignSelf: center,
    justifyContent: center,
    width: px2dp(60),
    borderRadius: px2dp(15),
    borderWidth: px2dp(1),
    borderStyle: 'solid',
    borderColor: '#d5d5d5d5',
  },
  signText: {
    fontFamily: iosFontFmily,
    color: fontColor,
    fontSize: defaultFontSize,
  },
  userMenuBox: {
    // backgroundColor: 'red',
    flexDirection: row,
    justifyContent: spaceAround,
    marginTop: px2dp(10),
  },
  menuInfo: {
    // width: px2dp(345),
    // alignSelf:center
  },
  menuImage: {
    width: px2dp(24),
    height: px2dp(24),
    alignSelf: center,
    marginBottom: px2dp(6),
  },
  menuText: {
    fontFamily: iosFontFmily,
    color: fontColor,
    fontSize: fontSmallSize,
  },
});
