import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {flex, row, center} from '../../../styles/constants';

export default class GuessLikeMore extends React.PureComponent {
  constructor() {
    super();
  }
  async componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.moreBox}>
        <Text>more page</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  moreBox: {
    flex: flex,
  },
});
