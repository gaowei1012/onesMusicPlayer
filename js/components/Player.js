import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Slider,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  flex,
  row,
  center,
  spaceBetween,
  fontSmallSize,
  defaultFontSize,
  defaultFontColor,
} from '../styles/constants';
import {screentWidth} from '../utils/screenUtil';
import {px2dp} from '../utils/px2dp';
import {GoBack} from '../utils/GoBack';
import TopNavigationBar from '../common/TopNavigationBar';
import actions from '../redux/actions/index';
import {connect} from 'react-redux';
import {songUrl, lyric} from '../expand/api';
import Video from 'react-native-video';
import AnimatedTabs from 'react-native-animated-tabs';

class Player extends React.Component {
  static propTypes = {
    data_list: PropTypes.array,
  };
  state = {
    id: null,
    name: null,
    al: {},
    activePanel: 0, //当前active的面板
    activeSong: 0, //正在播放的歌
    currentTime: 0.0, //当前播放的时间
    paused: 1.0, //播放
    sliderValue: 0, //进度条的进度
    duration: 0.0, //总时长
    ar: [], // 歌手信息
    repeat: false, // 是否重复播放
    checkPlayer: false, // 播放
  };

  componentDidMount() {
    this.getData();
    let id = this.props.navigation.state.params;
    console.log('idididid', id)
  }

  componentWillReceiveProps() {}

  //格式化音乐播放的时间为0：00
  formatMediaTime = duration => {
    let min = Math.floor(duration / 60);
    let second = duration - min * 60;
    min = min >= 10 ? min : '0' + min;
    second = second >= 10 ? second : '0' + second;
    return min + ':' + second;
  };

  //设置进度条和播放时间的变化
  setTime = data => {
    let sliderValue = parseInt(this.state.currentTime);
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime,
    });
  };

  //设置总时长
  setDuration = duration => {
    this.setState({duration: duration.duration});
  };
  // 获取数据
  getData = () => {
    const {onLoadSongUrl, onLoadLyricData} = this.props;
    let {id, name, al, ar} = this.props.navigation.state.params;
    let url = `${songUrl}?id=${id}`;
    const lyricUrl = `${lyric}?id=${id}`;
    onLoadSongUrl(url);
    onLoadLyricData(lyricUrl);
    this.setState({
      id,
      name,
      al,
      ar,
    });
  };

  // 分享
  handleShare = () => {
    Alert.alert('确定分享');
  };

  // 右边elm
  _rightElm = () => {
    return (
      <TouchableOpacity onPress={this.handleShare} style={styles.topRightBox}>
        <Image
          style={styles.shareIcon}
          source={require('../images/common/share.png')}
        />
      </TouchableOpacity>
    );
  };

  _player = () => {
    // 播放
  };

  _playerContent = () => {
    const picUrl = this.state.al.picUrl;
    const ar = this.state.ar;
    console.log('ar', ar);
    return (
      <View style={styles.playerImgBox}>
        <Image style={styles.image} source={{uri: picUrl}} />
        <View style={styles.muiscTitleBox}>
          <Text style={styles.songName}>{this.state.name}</Text>
          {this.state.ar.map(item => (
            <Text style={styles.username} key={item.id}>
              {item.name}
            </Text>
          ))}
        </View>
        {/* 歌词 */}
        <ScrollView style={{backgroundColor: 'red'}}>
          <Text>geci</Text>
          <Text>geci</Text>
          <Text>geci</Text>
          <Text>geci</Text>
        </ScrollView>
      </View>
    );
  };

  // 音乐播放
  _playerCom = () => {
    const url = this.props.songUrl.item;
    console.log('muisc url', url);
    return url ? (
      <Video
        source={{uri: url}} // 视频的URL地址，或者本地地址
        ref={ref => {
          this.palyer = ref;
        }}
        rate={this.state.isPlay ? 1 : 0} // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
        volume={1.0}
        // 声音的放声音的放大倍数大倍数，0 为静音  ，1 为正常音量 ，更大的数字表示放大的倍数
        muted={false} // true代表静音，默认为false.
        paused={false} // true代表暂停，默认为false
        resizeMode="contain" // 视频的自适应伸缩铺放行为，contain、stretch、cover
        repeat={this.state.repeat} // 是否重复播放
        playInBackground={true} // 当app转到后台运行的时候，播放是否暂停
        playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
        onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
        onLoad={this.setDuration} // 当视频加载完毕时的回调函数
        onProgress={this.setTime} //  进度控制，每250ms调用一次，以获取视频播放的进度
        onEnd={this.onEnd} // 当视频播放完毕后的回调函数
        onError={this.videoError} // 当视频不能加载，或出错后的回调函数
        style={{width: 0, height: 0}}
      />
    ) : null;
  };

  // 进度条
  _slider = () => {
    return (
      <Slider
        style={styles.slider}
        value={this.state.slideValue}
        maximumValue={this.state.duration}
        step={1}
        onValueChange={value => this.setState({currentTime: value})}
      />
    );
  };

  // 暂停播放
  handleCheck = () => {};

  // 切换
  _switch = () => {
    return (
      <View style={styles.switchBox}>
        <TouchableOpacity>
          <Image
            style={styles.likeIcon}
            source={require('../images/common/like.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.nextIcon}
            source={require('../images/common/on.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleCheck} style={styles.onOfoFF}>
          {this.state.checkPlayer ? (
            <Image
              style={styles.muiscPlayer}
              source={require('../images/common/music_player.png')}
            />
          ) : (
            <Image
              style={styles.muiscPlayer}
              source={require('../images/common/stop.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.nextIcon}
            source={require('../images/common/next.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.nextIcon}
            source={require('../images/common/list.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  _renderTopBar = () => {
    let statusbar = {
      backgroundColor: '#ffffff',
      barStyle: 'dark-content',
    };
    return (
      <TopNavigationBar
        title={this.state.name}
        statusBar={statusbar}
        style={{backgroundColor: '#ffffff'}}
        leftButton={GoBack(this.props, 'dark')}
        rightButton={this._rightElm()}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.playerBox}>
        {this._renderTopBar()}
        {/* {this._playerContent()}
        {this._slider()}
        {this._switch()} */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  songUrl: state.songUrl,
  lyric: state.lyric,
});

const mapDispatchToProps = dispatch => ({
  onLoadSongUrl: url => dispatch(actions.onLoadSongUrl(url)),
  onLoadLyricData: url => dispatch(actions.onLoadLyricData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

const styles = StyleSheet.create({
  playerBox: {
    flex: flex,
  },
  topRightBox: {
    width: px2dp(30),
    height: px2dp(30),
    justifyContent: center,
    alignItems: center,
    borderRadius: px2dp(15),
  },
  shareIcon: {
    width: px2dp(30),
    height: px2dp(30),
  },
  playerImgBox: {
    alignSelf: center,
    marginTop: px2dp(20),
    marginBottom: px2dp(20),
    width: px2dp(345),
  },
  likeIcon: {
    width: px2dp(30),
    height: px2dp(30),
  },
  image: {
    width: px2dp(345),
    height: px2dp(300),
    borderRadius: px2dp(10),
    overflow: 'hidden',
  },
  username: {
    marginTop: px2dp(10),
    fontSize: defaultFontSize,
  },
  muiscTitleBox: {
    width: px2dp(345),
    marginTop: px2dp(20),
    height: px2dp(120),
    // backgroundColor: 'red',
  },
  songName: {
    fontSize: px2dp(18),
  },
  switchBox: {
    marginTop: px2dp(10),
    width: px2dp(345),
    height: px2dp(60),
    flexDirection: row,
    justifyContent: spaceBetween,
    alignSelf: center,
    alignItems: center,
  },
  nextIcon: {
    width: px2dp(30),
    height: px2dp(30),
  },
  onOfoFF: {},
  muiscPlayer: {
    width: px2dp(40),
    height: px2dp(40),
  },
  slider: {
    marginTop: px2dp(30),
    width: px2dp(345),
    height: px2dp(20),
    alignSelf: center,
    marginBottom: px2dp(40),
  },
});
