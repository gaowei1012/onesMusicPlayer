import React, {PureComponent} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {rakingList} from '../../expand/api';
import {px2dp} from '../../utils/px2dp';
import TopNavigationBar from '../../common/TopNavigationBar';
import {GoBack} from '../../utils/GoBack';

import {connect} from 'react-redux';
import actions from '../../redux/actions';

class RankingDetail extends PureComponent {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { onLoadListData } = this.props;
    let idx = this.props.navigation.state.params.idx;
    console.log('idx', idx)
    const url = `${rakingList}?idx=${idx}`;
    console.log('url', url)
    onLoadListData(url);
  }
  render() {
    const item = this.props.rankiglist;
    console.log('ietn ----iten', item)
    const StatusBar = {
      backgroundColor: '#ffffff',
      barStyle: 'dark-content',
    };
    const renderTopBar = (
      <TopNavigationBar
        title={'详情'}
        statusBar={StatusBar}
        style={{backgroundColor: '#ffffff'}}
        leftButton={GoBack(this.props, 'dark')}
      />
    )
    return <SafeAreaView style={styles.container}>
      {renderTopBar}
      <Text>raking detail</Text>
    </SafeAreaView>
  }
}

const mapStateToProps = state => ({
  rankiglist: state.rankiglist,
});

const mapDispatchToProps = dispatch => ({
  onLoadListData: url => dispatch(actions.onLoadListData(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RankingDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})