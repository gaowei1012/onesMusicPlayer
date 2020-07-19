import * as React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {flex, center, row} from '../../styles/constants';
import {connect} from 'react-redux';
import actions from '../../redux/actions/index';
import {rakingListDeatil} from '../../expand/api';
import TopNavigationBar from '../../common/TopNavigationBar';
import {GoBack} from '../../utils/GoBack';
import {px2dp} from '../../utils/px2dp';
import NavigationUtil from '../../utils/NavigationUtil';
import SpinnerLoading from '../../components/Spinner';
import {width} from '../../utils/screenUtil'

// 排行榜
class RankingPage extends React.Component {
  state = {
    loadingTitle: '加载中...',
  };
  componentDidMount() {
    this.getData();
  }
  /**
   * 获取数据
   */
  getData() {
    const {onLoadTopListData} = this.props;
    onLoadTopListData(rakingListDeatil);
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
        title="排行榜"
        statusBar={statusbar}
        style={{backgroundColor: '#ffffff'}}
        leftButton={GoBack(this.props, 'dark')}
      />
    );
  };
  /**
   * 跳转对应详情页
   */
  goToPage(idx) {
    NavigationUtil.goPage({idx}, 'RankingDetail');
  }

  _renderContent = () => {
    const toplist = this.props.topList.item;
    if (!toplist) {
      return <SpinnerLoading/>
    }
    return (
      <>
        {toplist && toplist.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.goToPage(item.id)}
              style={styles.rankingBox}>
              <View style={styles.leftBox}>
                <Image style={styles.image} source={{uri: item.coverImgUrl}} />
                {/* <LazyloadImage
                  style={styles.image}
                  source={{uri: item.coverImgUrl}}
                /> */}
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderTopBar()}
        <ScrollView>
          {this._renderContent()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  topList: state.topList,
});

const mapDispatchToProps = dispatch => ({
  onLoadTopListData: url => dispatch(actions.onLoadTopListData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingPage);

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
  rankingBox: {
    width: px2dp(345),
    height: px2dp(120),
    alignSelf: center,
    // backgroundColor: '#eee',
    alignItems: center,
    flexDirection: row,
    marginBottom: px2dp(2),
  },
  leftBox: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(10),
    overflow: 'hidden',
    // backgroundColor: 'red',
  },
  image: {
    width: px2dp(100),
    height: px2dp(100),
  },
  rightBox: {
    marginLeft: px2dp(20),
    height: px2dp(100),
    width: px2dp(200),
    alignItems: center,
    justifyContent: center,
    padding: px2dp(2),
  },
  text: {
    lineHeight: px2dp(26),
  },
});
