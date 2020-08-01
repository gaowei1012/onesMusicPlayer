import React from 'react'
import {px2dp} from '../../utils/px2dp'
import Slider from '@react-native-community/slider'
import Video from 'react-native-video'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native'
import NavigationUtil from '../../utils/NavigationUtil'

import {connect} from 'react-redux'
import actions from '../../redux/actions'
import {Toast} from '../../utils/Toast'
import PlayerItems from './components/PlayerItems'
import RNFS from 'react-native-fs'

import LikeIcon from '../../images/svg/like.svg'
import DowloadIcon from '../../images/svg/dowload.svg'
import HuaIcon from '../../images/svg/hua.svg'
import MessageIcon from '../../images/svg/message.svg'
import MoreIcon  from '../../images/svg/more.svg'
import ShuaIcon from '../../images/svg/shua.svg'
import PrevIcon from '../../images/svg/prev.svg'
import MIcon from '../../images/svg/m.svg'
import NextIcon from '../../images/svg/next.svg'
import ZanIcon from '../../images/svg/zan.svg'
import PlayerIcon from '../../images/svg/player.svg'

class Player extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            iconItem: [
                {id: 1, icon: require('../../images/player/like.png')},
                {id: 2, icon: require('../../images/player/dowload.png')},
                {id: 3, icon: require('../../images/player/sing.png')},
                {id: 4, icon: require('../../images/player/comment.png')},
                {id: 5, icon: require('../../images/player/more.png')},
            ],
            iconFotter: [
                {id: 11, icon: require('../../images/player/cycle.png'), className: 'icon'},
                {id: 22, icon: require('../../images/player/prev.png'), className: 'icon'},
                {id: 33, icon: require('../../images/player/player.png'), className: 'icon'},
                {id: 44, icon: require('../../images/player/next.png'), className: 'icon'},
                {id: 55, icon: require('../../images/player/moreIocn.png'), className: 'icon'}
            ],
            url: 'http://m8.music.126.net/20200528094608/8aed0cf62a533d298f057f130d6c87e5/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
            rate: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0, // 总时长
            currentTime: 0.0, // 当前播放时长
            silderValue: 0, // 当前进度条长度
            paused: true, // 播放暂停
            isFullScreen: false,
            item: {}, // 保存上级传过来的数据
            name: null,
            ar: [],
            id: null, // 歌曲id
            backgroundUrl: null,
            isPlayer: true
        }
    }

    componentDidMount() {
        // song/url?id=33894312
        let item = this.props.navigation.state.params.item;
        let name = item.name;
        let ar = item.ar;
        let id = item.id;
        let backgroundUrl = item.al.picUrl;
        this.setState({
            name,ar,id,backgroundUrl
        });
        this.getSongData(id)
    }

    // 歌词
    goToLyrics=()=> {
        let id = this.props.navigation.state.params.item.id;
        const {name} = this.state
        // console.log('iiisis', id)
        NavigationUtil.goPage({id,name}, 'Lyric')
    }

    getSongData(id) {
        // const {id} = this.state
        const {onLoadSongUrl} = this.props
        let url = `song/url?id=${id}`
        onLoadSongUrl(url)
    }

    // 格式化时间
    formatMediaTime(time) {
        let minute = Math.floor(time / 60);
        let second = parseInt(time - minute * 60);
        minute = minute >= 10 ? minute : "0" + minute;
        second = second >= 10 ? second : "0" + second;
        return minute + ":" + second;
    }

    // 获取当前播放时间
    customerOnprogress(e) {
        let time = e.currentTime;
        this.setState({
          currentTime: time,
          silderValue: time,
        })
      };

    // 处理总时长 并进行格式化
    customerOnload(e) {
        let time = e.duration;
        this.setState({
            duration: time
        })
    }

    // 改变滑块 改变音乐播放进度
    customerSliderValue(value) {
        this.player.seek(value)
      };

    _player=()=> {
        const url = this.props.songUrl.item
        if (!url) {
            return <>{Toast.showToast('加载中')}</>
        }
        return <Video
            ref={(ref) => {
                this.player = ref
            }}
            source={{uri: url[0].url}}
            rate={this.state.rate}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={(e) => this.customerOnload(e)}
            onProgress={(e) => this.customerOnprogress(e)}
            repeat={false}
        />
    }

    /**
     * 切换是否播放 暂停
     */
    switchPlayer=()=> {
        this.setState({
            isPlayer: !this.state.isPlayer
        })
    }
    
    /**
     * 下载歌曲
     */
    _dowladMuisc=()=> {
        const url = this.props.songUrl.item;
        const _dowladUrl = url[0].url;

        const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp3`;
 
        const options = {
            fromUrl: _dowladUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                Toast.showToast('下载成功', res.contentLength)
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {
 
                let pro = res.bytesWritten / res.contentLength;
 
                this.setState({
                    progressNum: pro,
                });
            }
        }

        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);
 
                console.log('file://' + downloadDest)
 
            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }
    }

    render() {
        const topHeader = (
            <View style={styles.topHeader}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        NavigationUtil.goBack(this.props.navigation)
                    }}
                >
                    <Image style={{width: px2dp(24), height: px2dp(24)}} source={require('../../images/back.png')}/>
                </TouchableOpacity>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{this.state.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {
                            this.state.ar.map(d => (
                                <Text style={styles.name} numberOfLines={1} key={d.id}>{d.name}</Text>
                            ))
                        }
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {Toast.showToast('功能开发中')}}
                >
                    <Text style={styles.sharge}>分享</Text>
                </TouchableOpacity>
            </View>
        )
        /**
         * 动画:
         *   播放图片， 顺时针旋转
         */
        const playerAndmin = (
            <TouchableOpacity activeOpacity={1} onPress={this.goToLyrics} style={styles.playerAndminWrap}>
                <View style={styles.playerAndminBox}>
                    <View style={styles.playerAndminBorder}>
                        {/* <Text>播放</Text> */}
                        <Image style={styles.playerAndminImageBox} source={{uri: this.state.backgroundUrl}}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
        // 播放喜欢列表
        const likeMeunItem = (
            <View style={styles.likeItemBox}>
                <PlayerItems
                    icon={<LikeIcon width={px2dp(26)} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
                <PlayerItems
                    icon={<DowloadIcon width={px2dp(26)} height={26}/>}
                    handleFunc={this._dowladMuisc}
                />
                <PlayerItems
                    icon={<HuaIcon width={px2dp(26)} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
                <PlayerItems
                    icon={<MessageIcon width={px2dp(26)} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
                <PlayerItems
                    icon={<MoreIcon width={px2dp(26)} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
            </View>
        );
        // 进度条
        const playerSilder = (
            <View style={styles.playerSilderBox}>
                <Text style={styles.playerStart}>{this.formatMediaTime(this.state.currentTime)}</Text>
                <Slider 
                    style={{width: px2dp(240)}}
                    maximumTrackTintColor={'#d5d5d5'}
                    value={this.state.silderValue}
                    maximumValue={this.state.duration}
                    thumbTintColor='#fff'
                    //thumbImage={require('../../images/player/player.png')}
                    step={1}
                    onValueChange={() => {
                        this.customerSliderValue
                    }}
                />
                <Text style={styles.playerEnd}>{this.formatMediaTime(this.state.duration)}</Text>
            </View>
        );
        // 底部播放
        const playerFotter = (
            <View style={styles.playerFooterBox}>
                {/* {iconFotter && iconFotter.map(item => (
                    <TouchableOpacity onPress={this.switchPlayer} activeOpacity={.9} key={item.id} style={styles.fotterImgBox}>
                        {
                            item.className == 'icon' ? 
                                <Image style={{width: px2dp(30), height: px2dp(30)}} source={item.icon}/> 
                                :
                                <Image style={{width: px2dp(50), height: px2dp(50)}} source={item.icon}/>
                        }
                    </TouchableOpacity>
                ))} */}
                <PlayerItems
                    icon={<ShuaIcon width={26} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
                 <PlayerItems
                    icon={<PrevIcon width={26} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
                <PlayerItems
                    icon={this.state.isPlayer ? <ZanIcon width={26} height={26}/> : <PlayerIcon width={26} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
                <PlayerItems
                    icon={<NextIcon width={26} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
                <PlayerItems
                    icon={<MIcon width={26} height={26}/>}
                    handleFunc={() => {Toast.showToast('功能开发中')}}
                />
            </View>
        );
        return (
            <SafeAreaView style={styles.container}>
                {this._player()}
                {topHeader}
                {playerAndmin}
                {likeMeunItem}
                {playerSilder}
                {playerFotter}
            </SafeAreaView>
        );
    }
}

export default connect(({songUrl}) => ({songUrl}), 
    (dispatch) => ({
        onLoadSongUrl(url) {
            dispatch(actions.onLoadSongUrl(url))
        }
}))(Player)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5A5464',
    },
    // 音乐播放
    playerAndminWrap: {
        marginTop: px2dp(100),
        alignItems: 'center',
    },
    playerAndminBox: {
        width: px2dp(320),
        height: px2dp(320),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: px2dp(320/2),
        backgroundColor: '#606373'
    },
    playerAndminBorder: {
        width: px2dp(320 - 46),
        height: px2dp(320 - 46),
        borderRadius: px2dp(320/2),
        alignItems: 'center',
        borderColor: '#ddd',
        backgroundColor: '#5A5464'
    },
    playerAndminImageBox: {
        width: '100%',
        height: '100%',
        borderRadius: px2dp(274/2)
    },
    // 播放icon菜单
    likeItemBox: {
        marginTop: px2dp(100),
        width: px2dp(316),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    imgBox: {
        width: px2dp(30),
        height: px2dp(30)
    },
    // 进度条
    playerSilderBox: {
        marginTop: px2dp(40),
        width: px2dp(320),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    playerStart: {
        color: '#d5d5d5'
    },
    playerEnd: {
        color: '#d5d5d5'
    },
    // 底部播放区域
    playerFooterBox: {
        width: px2dp(320),
        marginTop: px2dp(40),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    fotterImgBox: {
        width: px2dp(30),
        height: px2dp(60),
    },
    topHeader: {
        width: px2dp(345),
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? px2dp(6) : px2dp(12), // fix android 顶部距离
    },
    name: {
        color: '#ddd',
        fontSize: px2dp(12),
        marginTop: px2dp(3),
        marginRight: px2dp(3),
    },
    titleBox: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: px2dp(16),
        fontWeight: '600',
        color: '#fff'
    },
    svgStyles: {
        width: px2dp(22),
        height: px2dp(22),
        backgroundColor: 'red',
    },
    // 分享
    sharge: {
        color: '#fff',
        fontSize: px2dp(12)
    }
})