import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../redux/actions/index';
import TopNavigationBar from '../../common/TopNavigationBar';
import {GoBack} from '../../utils/GoBack'
import {playCatlist,playCatListDetail} from '../../expand/api'
import TabBar from '../../utils/TabBar'
import SpinnerLoading from '../../components/Spinner';

// 歌单页面
class PlayListPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  componentDidMount() {
    this.getCatlistType();
  }
  getCatlistType() {
    const {getCatlistData} = this.props
    getCatlistData(playCatlist)
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
        title="歌单广场"
        statusBar={statusbar}
        style={{backgroundColor: '#ffffff'}}
        leftButton={GoBack(this.props, 'dark')}
      />
    );
  };
  getCatListDetail(obj) {
    console.log('--------idididid', obj)
    const id = obj.usedCount;
    const {getCatlistDetailData} = this.props
    const url = `${playCatListDetail}?id=${id}`
    getCatlistDetailData(url)
  }
  onChangeTab(index, id) {
    // todo
    this.getCatListDetail(id)
    this.setState({index})
  }
  _render = () => {
    const catlisttype = this.props.catlisttype.item;
    if (!catlisttype) {
      return <SpinnerLoading/>
    }
    const data = catlisttype.tags;
    console.log('catlisttype', data)
    return <View>
      <TabBar
        ref={e => this.tabs = e}
        index={this.state.index}
        data={data}
        onChange={(index, id) => this.onChangeTab(index, id)}
      />
    </View>
  };
  _renderContent=()=> {
    const catlistdetail = this.props.catlistdetail;
    console.log('catlistdetail', catlistdetail)
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderTopBar()}
        {this._render()}
        {this._renderContent()}
      </SafeAreaView>
    );
  }
}

export default connect(({catlisttype,catlistdetail}) => ({
  catlisttype,
  catlistdetail
}), (dispatch) => ({
  getCatlistData(url) {
    dispatch(actions.getCatlistData(url))
  },
  getCatlistDetailData(url) {
    dispatch(actions.getCatlistDetailData(url))
  }
}))(PlayListPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
