import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {flex, row, center} from '../../../styles/constants';

export default class VideoTabBar extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {}

  render() {
    return (
      <>
        <Text>video tab bar</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  videoBox: {
    flex: flex,
  },
});
