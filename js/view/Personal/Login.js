import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput
} from 'react-native';
import {
  flex,
  center,
  fontColor,
  defaultFontSize,
  iosFontFmily,
} from '../../styles/constants';
// import { Input, Button } from 'react-native-elements';
import MusicButton from '../../components/Button';
import { connect } from 'react-redux';
import actions from '../../redux/actions/index';
// import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationUtil from '../../utils/NavigationUtil';
import { px2dp } from '../../utils/px2dp';

class LoginPage extends React.Component {
  state = {
    count: 60,
    liked: true,
    isLoading: false,
    isWXInstalled: '',
    code: 0, // 验证码
    phone: '13666683140', // 手机号
    password: 'qq12345..**' // 密码
  };
  // 验证码
  countDown() {
    const { count } = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }
  // 获取输入信息
  onChangeText(name, value) {
    console.log('name', value)
    name == '手机号' ? (this.setState({
      phone: value
    })) : (this.setState({
      password: value
    }))
  }

  // 登录
  getData() {
    const { onLoginData } = this.props;
    const { phone, password } = this.state;
    const url = `login/cellphone?phone=${phone}&password=${password}`;
    onLoginData(url);
    const item = this.props.token.item;
    if (!item) {
      // TODO: 弹框-->正在登录中
      return <div>正在登录中</div>;
    }
    AsyncStorage.setItem('token', item.token, err => {
      if (err) err;

      // 登录成功后跳转
      setTimeout(() => {
        // 带参跳转页面
        NavigationUtil.goPage({ item }, 'PersonalPage');
      }, 1000);
    });
  }
  // 发送验证码
  getCode = () => {
    this.countDown();
  };
  handleSubmit = () => {
    this.getData();
  };
  handleKeyPress = () => { };
  handleCodePress = () => { };
  renderTopTitle() {
    // const {liked, count} = this.state;
    return (
      <View style={styles.titleBox}>
        <Text style={styles.topTitle}>登录</Text>
        <View style={styles.textInputBox}>
          <View style={styles.phoneBox}>
            <TextInput
              style={{height: px2dp(40)}}
              onChangeText={value => this.onChangeText('手机号', value)}
              clearTextOnFocus={true}
              placeholder='手机号'
              placeholderTextColor='#fff'
            />
          </View>
          <View style={styles.codeBox}>
            <TextInput
              style={{height: px2dp(40)}}
              onChangeText={value => this.onChangeText('密码', value)}
              clearTextOnFocus={true}
              placeholder='密码'
              placeholderTextColor='#fff'
            />
            {/* <TouchableOpacity onPress={this.getCode} style={styles.codeNumBox}>
              <Text style={styles.textInput}>
                {liked ? '获取验证码' : `${count} 秒后重发`}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <TouchableOpacity
          style={styles.submitBox}
          onPress={this.handleSubmit}
          activeOpacity={1}
        >
          <Text style={{color: '#fff'}}>登录</Text>
        </TouchableOpacity> */}
        {/* <Button
          title="登录"
          onPress={this.handleSubmit}
          buttonStyle={styles.submitBox}
        /> */}
        <MusicButton text={'登录'}/>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderTopTitle()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.login,
  follow: state.follow,
});

const mapDiaptchToProps = dispacth => ({
  onLoginData: url => dispacth(actions.onLoginData(url)),
  onFollowsData: url => dispacth(actions.onFollowsData(url)),
});

export default connect(
  mapStateToProps,
  mapDiaptchToProps,
)(LoginPage);

const styles = StyleSheet.create({
  container: {
    flex: flex,
    backgroundColor: '#DA3A2F',
  },
  titleBox: {
    marginTop: px2dp(20),
  },
  topTitle: {
    alignSelf: center,
    fontFamily: iosFontFmily,
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  textInputBox: {
    marginTop: px2dp(50),
    alignSelf: center,
    width: px2dp(345),
    height: px2dp(140),
  },
  phoneBox: {
    height: px2dp(40),
    marginTop: px2dp(20),
    color: '#fff',
    borderBottomColor: '#d3d3d3d3',
    borderBottomWidth: px2dp(.5),
    paddingRight: px2dp(30)
  },
  codeBox: {
    height: px2dp(40),
    marginTop: px2dp(20),
    color: '#fff',
    borderBottomColor: '#d3d3d3d3',
    borderBottomWidth: px2dp(.5),
  },
  codeNumBox: {
    position: 'absolute',
    top: px2dp(0),
    right: px2dp(10),
    width: px2dp(96),
    height: px2dp(30),
    alignItems: center,
    justifyContent: center,
    borderRadius: px2dp(20),
    borderWidth: px2dp(1),
    borderStyle: 'solid',
    borderColor: '#d5d5d5d5',
  },
  textInput: {
    fontSize: defaultFontSize,
    color: fontColor,
  },
  submitBox: {
    marginTop: px2dp(30),
    alignSelf: center,
    width: px2dp(345),
    height: px2dp(42),
    alignItems: center,
    justifyContent: center,
    borderRadius: px2dp(20),
  },
});
