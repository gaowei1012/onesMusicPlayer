

import * as React from 'react'
import {View, Text, StyleSheet, SafeAreaView,ImageBackground,Image,TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {px2dp} from '../../utils/px2dp'
import actions from '../../redux/actions'
import {userInfo,userPlaylist} from '../../expand/api'
import {screentWidth} from '../../utils/screenUtil'
import NavigationUtil from '../../utils/NavigationUtil'
import SpinnerLoading from '../../components/Spinner'

class PersonalInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1,
      menu: [
        {id: 1, name: '主页', type: 1},
        {id: 2, name: '动态', type: 2},
      ]
    }
  }
  componentDidMount() {
    const uid = '430172280'
    const {onUserInfoData, onPlayListData} = this.props
    const url = `${userInfo}?uid=${uid}`;
    const personalUrl = `${userPlaylist}?uid=${uid}`;
    onUserInfoData(url)
    onPlayListData(personalUrl)
  }
  switchTab=(type)=> {
    this.setState({
      type: type
    })
  }
  _renderTopBar = () => {
    const userinfo = this.props.userinfo.item;
    if (!userinfo) {
      return <SpinnerLoading/>
    }
    const profile = userinfo.profile;
    console.log('profile', profile)
    return <ImageBackground
      style={styles.topHeaderBox}
      source={{uri: profile.backgroundUrl}}
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
      </View>
      {/* 用户信息 */}
      <View style={styles.nameBox}>
        <View style={styles.avatarBox}>
          <Image style={styles.avatarImage} source={{uri: profile.avatarUrl}}/>
        </View>
        <Text style={styles.nicknameText}>{profile.nickname}</Text>
        <View style={styles.userfollowBox}>
          <Text style={styles.followText}>关注 {profile.follows}</Text>  
          <Text style={styles.followLine}>|</Text> 
          <Text style={styles.followText}>粉丝 {profile.followeds}</Text>
        </View>
      </View>
    </ImageBackground>
  };
  playList=()=> {
    const playlist = this.props.playList.item;
    if (!playlist) {
      return <SpinnerLoading/>
    }
    return (
      <ScrollView>
        {playlist.map(p => {
          return (
            <TouchableOpacity
              onPress={this.goToPlayList}
              activeOpacity={1}
              style={styles.playItemBox}
            >
              <View style={styles.playImageBox}>
                <Image style={styles.playImage} source={{uri: p.coverImgUrl}}/>
              </View>
              <Text>{p.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
  _switchContent=()=> {
    const {menu} = this.state
    return (
      <View style={styles.contentBox}>
        <View style={styles.menuBox}>
          {menu.map(item => {
            return <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.switchTab(item.type)} 
              style={styles.itemBox} key={item.id}>
                <Text>{item.name}</Text>
                <View style={[this.state.type === item.type ? styles.actionLine : null]}/>
            </TouchableOpacity>
          })}
        </View>
        {/* content */}
        <View style={{height: px2dp(490)}}>
          {this.state.type === 1 ? <>{this.playList()}</> : null}
          {this.state.type === 2 ? <><Text>动态</Text></> : null}
        </View>
      </View>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderTopBar()}
        {this._switchContent()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeaderBox: {
    width: screentWidth,
    height: px2dp(300),
    marginTop: Platform.OS === 'ios' ? px2dp(-44): 0,
    zIndex: -100
  },
  topHeaderNavBox: {
    width: px2dp(345),
    alignSelf: 'center',
    marginTop: px2dp(44),
    height: px2dp(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentBox: {
    marginTop: px2dp(-26),
    backgroundColor: '#fff',
    height: px2dp(300),
    borderRadius: px2dp(26)
  },
  menuBox: {
    width: px2dp(345),
    height: px2dp(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: px2dp(2),
    alignItems: 'center'
  },
  itemBox: {
    width: px2dp(345/2),
    alignItems: 'center',
  },
  actionLine: {
    width: px2dp(20),
    height: px2dp(1),
    backgroundColor: 'red',
    borderRadius: px2dp(10),
    marginTop: px2dp(3)
  },
  nameBox: {
    position: 'absolute',
    bottom: px2dp(40),
    left: px2dp(30)
  },
  avatarBox: {
    width: px2dp(50),
    height: px2dp(50),
    borderRadius: px2dp(50/2),
    overflow: 'hidden',
    marginBottom: px2dp(6)
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  nicknameText: {
    color: '#fff',
    fontSize: px2dp(18),
    fontWeight: '700'
  },
  userfollowBox: {
    marginTop: px2dp(3),
    flexDirection: 'row'
  },
  followText: {
    color: '#ddd',
    fontSize: px2dp(12)
  },
  followLine: {
    marginLeft: px2dp(2),
    marginRight: px2dp(2),
    color: '#ddd'
  },
  playItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: px2dp(345),
    alignSelf: 'center',
    marginBottom: px2dp(6)
  },
  playImageBox: {
    width: px2dp(25),
    height: px2dp(25),
    borderRadius: px2dp(4),
    overflow: 'hidden',
    marginRight: px2dp(4)
  },
  playImage: {
    width: '100%',
    height: '100%'
  }
})


const mapStateToProps = state => ({
  userinfo: state.userinfo,
  playList: state.playList
})

const mapDispatchToProps = dispatch => ({
  onUserInfoData: url => dispatch(actions.onUserInfoData(url)),
  onPlayListData: url => dispatch(actions.onPlayListData(url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  PersonalInformation
);
