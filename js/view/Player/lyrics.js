import React from 'react'
import {SafeAreaView,Text,StyleSheet,View,ScrollView} from 'react-native'
import {px2dp} from '../../utils/px2dp'
import {connect} from 'react-redux'
import actions from './redux/action'
import {lyric} from '../../expand/api'
import Spinner from '../../components/Spinner'
import TopNavigationBar from '../../common/TopNavigationBar'
import {GoBack} from '../../utils/GoBack'

class Lyric extends React.PureComponent {
    state={
        name: '歌词'
    }
    componentDidMount() {
        let id = this.props.navigation.state.params.id
        const {getLyricData} = this.props
        let url = `${lyric}?id=${id}`
        getLyricData(url)
    }
    _renderLyric() {
        const lyrics = this.props.lyric.item;
        if (!lyrics) {
            return <Spinner/>
        }
        let data = lyrics.lyric;
        return <ScrollView>
            <View style={styles.lyricContentBox}>
                <Text>{data}</Text>
            </View>
        </ScrollView>
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
    }
})