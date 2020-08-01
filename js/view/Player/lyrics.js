import React from 'react'
import {SafeAreaView,Text,StyleSheet,View,FlatList} from 'react-native'
import {px2dp} from '../../utils/px2dp'
import {connect} from 'react-redux'
import actions from './redux/action'
import {lyric} from '../../expand/api'
import Spinner from '../../components/Spinner'
import TopNavigationBar from '../../common/TopNavigationBar'
import {GoBack} from '../../utils/GoBack'

class Lyric extends React.PureComponent {
    state={
        name: '歌词',
        lyric: null,
    }
    componentDidMount() {
        let id = this.props.navigation.state.params.id
        const {getLyricData} = this.props
        let url = `${lyric}?id=${id}`
        getLyricData(url)
    }
    // 处理歌词
    getLyric() {
        const {lyric} = this.state;
        let lyricList = []
        lyric.split(/[\n]/).forEach(item => {
            let temp = item.split(/\[(.+?)\]/)
            lyricList.push({
                item: temp[1],
                lyc: temp[2]
            })
        })
        lyricList = lyricList.filter(v => v['lyc'])
        console.log('lyricList', lyricList)
    }
    _renderItem(data) {
        const item = data.item
        console.log('item', item)
        return <View style={styles.lycBox}>
            <Text style={styles.lycText}>{item.lyc}</Text>
        </View>
    }
    _renderLyric() {
        const lyrics = this.props.lyric.item;
        
        if (!lyrics) {
            return <Spinner/>
        }
        let lyric = lyrics.lyric;
        // console.log('歌词 -- 歌词', lyric)
        let lyricList = []
        lyric.split(/[\n]/).forEach(item => {
            let temp = item.split(/\[(.+?)\]/)
            lyricList.push({
                item: temp[1],
                lyc: temp[2]
            })
        })
        lyricList = lyricList.filter(v => v['lyc'])

        // console.log('lyricList', lyricList)
        
        return <FlatList
            data={lyricList}
            renderItem={this._renderItem}
        />
    }
    /**
   * 渲染头部
   */
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
      />
    );
  };
    render() {
        return (
            <SafeAreaView style={styles.lyricContainer}>
                {this._renderTopBar()}
                {this._renderLyric()}
            </SafeAreaView>
        )
    }
}

export default connect(({lyric}) => ({lyric}), (dispatch) => ({
    getLyricData(url) {
        dispatch(actions.getLyricData(url))
    }
}))(Lyric)


const styles = StyleSheet.create({
    lyricContainer: {
        flex: 1,
    },
    lyricContentBox: {
        width: px2dp(345),
        alignSelf: 'center'
    },
    lycBox: {
        alignItems:'center',
        marginVertical: px2dp(3)
    },
    lycText: {
        color: '#333',
        fontSize: px2dp(14)
    }
})