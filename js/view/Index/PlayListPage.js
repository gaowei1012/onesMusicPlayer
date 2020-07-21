import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {flex, center, row} from '../../styles/constants';
import {screentWidth} from '../../utils/screenUtil';
import {connect} from 'react-redux';
import actions from '../../redux/actions/index';
import {topPlaylistHigh} from '../../expand/api';
import FlatItems from '../../wdiget/FlatItem';
import TopNavigationBar from '../../common/TopNavigationBar';
import {GoBack} from '../../utils/GoBack'
import {playCatlist} from '../../expand/api'

// 歌单页面
class PlayListPage extends React.PureComponent {
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
  _render = () => {
    return <View>
      <Text>hhhhh</Text>
    </View>
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderTopBar()}
        {this._render()}
      </SafeAreaView>
    );
  }
}

export default connect(({catlisttype}) => ({
  catlisttype,
}), (dispatch) => ({
  getCatlistData(url) {
    dispatch(actions.getCatlistData(url))
  },
}))(PlayListPage)

// const mapStateToProps = state => ({
//   catlisttype: state.catlisttype,
// });

// const mapDispatchToProps = dispatch => ({
//   getCatlistData: url => dispatch(actions.getCatlistData(url))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(PlayListPage);

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
});
