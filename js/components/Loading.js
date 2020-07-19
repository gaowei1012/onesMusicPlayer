import * as React from 'react';
import PropTyeps from 'prop-types';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {
  flex,
  center,
  row,
  spaceBetween,
  defaultBackgroundColor,
  defaultFontSize,
  defaultFontColor,
} from '../styles/constants';
import {px2dp} from '../utils/px2dp';

export default class Loading extends React.Component {
  static propTypes = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
});
