import * as React from 'react';
import {GoBack} from '../../../utils/GoBack';
import TopNavigationBar from '../../../common/TopNavigationBar';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

// 个人中心菜单二级公共页面
export default class MyMessage extends React.Component {
  shouldComponentUpdate(preState, nextState) {
    if (this.props.color !== this.state.color) {
      return false;
    }
  }
  _renderTopBar = () => {
    let statusbar = {
      backgroundColor: '#ffffff',
      barStyle: 'dark-content',
    };
    const title = this.props.navigation.state.params.title;
    return (
      <TopNavigationBar
        title={title}
        statusBar={statusbar}
        style={{backgroundColor: '#ffffff'}}
        leftButton={GoBack(this.props, 'dark')}
      />
    );
  };

  render() {
    const name = this.props.navigation.state.params.title;
    return (
      <SafeAreaView style={styles.container}>
        {this._renderTopBar()}
        <Text style={{textAlign: 'center'}}>{name}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
