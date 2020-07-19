import * as React from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {connect} from 'react-redux';
import actions from '../../redux/actions/index';
import {mvAll, personalizedMv} from '../../expand/api';
import {px2dp} from '../../utils/px2dp';
import {screentWidth} from '../../utils/screenUtil';
import NavigationUtil from '../../utils/NavigationUtil';
import SpinnerLoading from '../../components/Spinner';

const initRoutres = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];

class VideoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '视频',
      top_menu: 1,
      // mv 类型
      area: [
        {id: 1, type: 1, name: '推荐'},
        {id: 2, type: 2, name: '全部'},
        {id: 3, type: 3, name: '官方版'},
        {id: 4, type: 4, name: '原生'},
        {id: 5, type: 5, name: '现场版'},
        {id: 6, type: 6, name: '网易出品'}
      ]
    }
  }
  componentDidMount() {
    this.getData();
  }
  switchTab=(type, name)=> {
    this.setState({
      top_menu: type
    })
    //console.log('name', name)
    this.getData(name)
  }
  getData = (name = '全部') => {
    const {onLoadMv, onPersonalizedData} = this.props;
    const url = mvAll + name;
    onLoadMv(url);
    onPersonalizedData(personalizedMv)
  };
  handleIndexChange=()=> {
    this.setState({
      index: 2,
    })
  }
  _renderHeader=()=> {
    const {area} = this.state
    return (
      <View style={styles.topBarBox}>
        {area.map(a => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.switchTab(a.type, a.name)}
              key={a.id}
            >
              <Text style={[this.state.top_menu === a.type ? styles.actionText : styles.noActionText]}>{a.name}</Text>
              <View style={[this.state.top_menu === a.type ? styles.actionLine : styles.noActionLine]}/>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  // go to player
  goToPlayer = id => {
    NavigationUtil.goPage({id}, 'VideoPalyer')
  }

  // 推进mv
  _personalMv=()=> {
    const personal = this.props.personalMv.item;
    if (!personal) {
      return <SpinnerLoading/>
    }
    return (
      <>
        {personal.map(item => {
          return <TouchableOpacity 
              activeOpacity={1}
              onPress={() => this.goToPlayer(item.id)} 
              key={item.id} 
              style={{marginBottom: px2dp(10)}}
            >
                <View style={styles.videoBox}>
                  <Image style={{width: '100%', height: '100%'}} source={{uri: item.picUrl}}/>
                  <View style={styles.paleryBox}>
                    <Image style={{width: px2dp(30), height: px2dp(30)}} source={require('../../images/common/player.png')}/>
                  </View>
                </View>
                <View style={styles.videoBtnBox}>
                  <Text style={{marginRight: px2dp(4), fontSize: 16}}>{item.name}</Text>
                  <Text>-</Text>
                  <Text style={{marginLeft: px2dp(4), fontSize: 12,}}>{item.copywriter}</Text>
                </View>
          </TouchableOpacity>
        })}
      </>
    )
  }

  // mv
  _renderVideoContent=()=> {
    const mv = this.props.mv.item;
    if (!mv) {
      return <SpinnerLoading/>
    }
    return (
      <>
        {mv.map(item => {
          return <TouchableOpacity 
              activeOpacity={1}
              onPress={() => this.goToPlayer(item.id)} 
              key={item.id} 
              style={{marginBottom: px2dp(10)}}
            >
                <View style={styles.videoBox}>
                  <Image style={{width: '100%', height: '100%'}} source={{uri: item.cover}}/>
                  <View style={styles.paleryBox}>
                    <Image style={{width: px2dp(30), height: px2dp(30)}} source={require('../../images/common/player.png')}/>
                  </View>
                </View>
                <View style={styles.videoBtnBox}>
                  <Text style={{marginRight: px2dp(4), fontSize: 16}}>{item.name}</Text>
                  <Text>-</Text>
                  <Text numberOfLines={1} style={{marginLeft: px2dp(4), fontSize: 12, width: px2dp(325)}}>{item.artistName}</Text>
                </View>
          </TouchableOpacity>
        })}
      </>
    )
  }
  _switchContent=()=> {
    const {top_menu} = this.state;
    return (
      <>
        {top_menu === 1 ? <>{this._personalMv()}</> : null}
        {top_menu === 2 ? <>{this._renderVideoContent()}</> : null}
        {top_menu === 3 ? <>{this._renderVideoContent()}</> : null}
        {top_menu === 4 ? <>{this._renderVideoContent()}</> : null}
        {top_menu === 5 ? <>{this._renderVideoContent()}</> : null}
        {top_menu === 6 ? <>{this._renderVideoContent()}</> : null}
      </>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* {this._renderTopBar()} */}
        {this._renderHeader()}
        <ScrollView style={{marginTop: px2dp(10)}}>
          {this._switchContent()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  mv: state.mv,
  mvDetail: state.mvDetail,
  personalMv: state.personalMv
});

const mapDispatchToProps = dispatch => ({
  onLoadMv: url => dispatch(actions.onLoadMv(url)),
  onLoadMvDetail: url => dispatch(actions.onLoadMvDetail(url)),
  onPersonalizedData: url => dispatch(actions.onPersonalizedData(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoBox: {
    width: px2dp(345),
    height: px2dp(160),
    backgroundColor: '#eee',
    alignSelf: 'center',
    borderTopLeftRadius: px2dp(6),
    borderTopRightRadius: px2dp(6),
    overflow: 'hidden'
  },
  videoBtnBox: {
    width: px2dp(345),
    height: px2dp(40),
    paddingLeft: px2dp(3),
    paddingTop: px2dp(6),
    alignSelf: 'center',
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabBox: {
    width: screentWidth,
    height: px2dp(40)
  },
  videoPlayer: {

  },
  paleryBox: {
    position: 'absolute',
    left: '50%',
    top: '45%'
  },
  topBarBox: {
    width: px2dp(345),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(30),
    justifyContent: 'space-between'
  },
  actionLine: {
    width: px2dp(16),
    height: px2dp(1),
    borderRadius: px2dp(10),
    backgroundColor: 'red',
    marginTop: px2dp(6),
    alignSelf: 'center'
  },
  actionText: {
    color: 'red'
  },
  noActionText: {
    color: '#333'
  },
  noActionLine: {
    width: px2dp(16),
    height: px2dp(1),
    borderRadius: px2dp(10),
    backgroundColor: '#fff',
    marginTop: px2dp(6),
    alignSelf: 'center'
  }
});
