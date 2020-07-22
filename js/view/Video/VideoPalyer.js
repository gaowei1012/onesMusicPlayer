import React from 'react';
import {View, Image, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import {mvUrl} from '../../expand/api';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import {screentWidth, screentHeight} from '../../utils/screenUtil';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import { px2dp } from '../../utils/px2dp';

class VideoPalyer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.changePausedState   = this.changePausedState.bind(this);
    this.customerSliderValue = this.customerSliderValue.bind(this);
    this.enterFullScreen     = this.enterFullScreen.bind(this);
    this._changePauseSliderFullState = this._changePauseSliderFullState.bind(this);
    this._onStartShouldSetResponder = this._onStartShouldSetResponder.bind(this);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0, // 总时长
      currentTime: 0.0, // 当前播放时间
      sliderValue: 0, // 当前进化条的长度
      paused: true, // 播放暂停
      // 用来控制进入全屏
      videoWidth: screentWidth,
      videoHight: 226,
      isFullScreen: false,
      isVisiblePausedSliderFullScreen: false
  }
  }

    componentDidMount() {
        const {onLoadMvUrl} = this.props;
        const id = this.props.navigation.state.params.id;
        const url = `${mvUrl}?id=${id}`;
        onLoadMvUrl(url);

        // 处理播放事项
        let initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
          console.log('竖屏')
        } else {
          console.log('横屏')
          Orientation.lockToPortrait();
        }
    }
    // 拿到总时长 并格式化时长
    customerOnload(e) {
      let time = e.duration;
      this.setState({
        duration: time,
      });
    }
    //控制按钮显示播放，要显示进度条3秒钟，之后关闭显示 
    changePausedState() {
      this.setState({
        paused: this.state.paused?false:true,
        isVisiblePausedSliderFullScreen: true,
      });

      let that = this;
      setTimeout(function() {
        that.setState({
          isVisiblePausedSliderFullScreen: false,
        })
      }, 3000)
    }
    // 单击事件，是否显示 “暂停、进度条、全屏按钮 盒子”
    _changePauseSliderFullState() {
      let flag = this.state.isVisiblePausedSliderFullScreen?false:true;
      this.setState({
        isVisiblePausedSliderFullScreen: flag
      });
      let that = this;
      setTimeout(function() {
        that.setState({
          isVisiblePausedSliderFullScreen: false
        })
      }, 3000)
    }
    // 格式化时间
    formatMediaTime(time) {
      let minute = Math.floor(time / 60);
      let second = parseInt(time - minute * 60);
      minute = minute >= 10 ? minute : "0" + minute;
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
    }


    // 获取当前的 播放时间 
    customerOnprogress(e) {
      let time = e.currentTime;
      this.setState({
        currentTime: time,
        sliderValue: time,
      })
    };

    // 移动滑块 改变视频播放进度
    customerSliderValue(value) {
      this.player.seek(value)
    };

    // 进入全屏， 改变高度 如何配置旋转屏幕，不需要改变进度条盒子的显示和隐藏
    enterFullScreen=()=> {
      this.setState({
        videoHight: screentHeight,
        videoWidth: screentWidth,
        isFullScreen: true,
      });
      Orientation.lockToLandscape();
    };

    _onStartShouldSetResponder(e) {
      console.log(e)
    }

    render() {
      const videoUrl = this.props.mvUrl.item;
      if (!videoUrl) {
        return <View/>
      };
      const url = videoUrl.url;
      const {rate, muted, resizeMode} = this.state;
      // 播放按钮组件 是否显示
      let playButtonComponent = (
        <TouchableWithoutFeedback
          onPress={this.changePausedState}
        >
          {/* 显示播放按钮 */}
          <View style={styles.playBtn}>
            <Image style={{width: px2dp(50), height: px2dp(50)}} source={require('../../images/player_action.png')}/>
          </View>
        </TouchableWithoutFeedback>
      );
      let pausedBtn = this.state.paused ? playButtonComponent : null;

      // 暂停按钮、进度条、全屏按钮 是否显示
      let pausedSliderFullComponent = (
          <View style={styles.sliderWrap}>
            {/* 进度条 */}
            <View style={styles.sliderBox}>
              <Text style={{color: '#fff'}}>{this.formatMediaTime(this.state.currentTime)}</Text>
              <Slider
                style={{width: px2dp(260), height: px2dp(40), alignItems: 'center'}}
                value={this.state.sliderValue}
                maximumValue={this.state.duration}
                thumbTintColor='#fff'
                minimumTrackTintColor="red"
                maximumTrackTintColor="#ccc"
                step={1}
                onValueChange={this.customerSliderValue}
              />
              <Text style={{color: '#fff'}}>{this.formatMediaTime(this.state.duration)}</Text>
            </View>
            {/* 全屏 */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.enterFullScreen}
              style={styles.allWrap}
            >
              <Text style={styles.all}>全屏</Text>
            </TouchableOpacity>
          </View>
      );

      let pausedSliderFull = this.state.isVisiblePausedSliderFullScreen ? pausedSliderFullComponent : null;

      return (
        <View style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
          <TouchableWithoutFeedback
            onPress={this._changePauseSliderFullState}
            onResponderMove={this._onStartShouldSetResponder}
          >
            <Video
                ref={(ref) => {
                  this.player = ref
                }}
                style={{width: screentWidth, height: screentHeight}}
                source={{uri: url}}
                rate={rate}
                muted={muted}
                resizeMode={resizeMode}
                onLoad={(e)=>this.customerOnload(e)}
                // onEnd={this.onEnd}
                fullscreen={this.state.isFullScreen}
                onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                onAudioFocusChanged={this.onAudioFocusChanged}
                onProgress={(e) => this.customerOnprogress(e)}
                repeat={false}
            />
          </TouchableWithoutFeedback>
          {pausedBtn}
          {pausedSliderFull}
        </View>
      )
    }
}

export default connect(
  ({mvUrl})=> ({mvUrl}),
  (dispatch) => ({
    onLoadMvUrl(url) {
      dispatch(actions.onLoadMvUrl(url))
    }
  })
)(VideoPalyer)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    playBtn: {
      width: px2dp(50),
      height: px2dp(50),
      // backgroundColor:'#fff',
      borderRadius: 50,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -25,
      marginTop:-25,
      zIndex:999
    },
    sliderWrap: {
      position: 'absolute',
      bottom: px2dp(30),
      width: px2dp(345),
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    sliderBox: {
      flexDirection:'row',
      alignSelf:'center',
      alignItems: 'center',
      // marginBottom: px2dp(80),
      // backgroundColor: '#fff',
    },
    allWrap: {
      alignItems: 'center'
    },
    all: {
      color: '#fff',
      paddingHorizontal: px2dp(4),
      fontSize: px2dp(12)
    }
})