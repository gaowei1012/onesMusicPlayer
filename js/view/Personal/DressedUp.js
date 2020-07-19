import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {flex, center} from '../../styles/constants';

export default class DressedUp extends React.Component {
  render() {
    return (
      <SafeAreaView style={sytles.container}>
        <Text>个性装扮</Text>
      </SafeAreaView>
    );
  }
}

const sytles = StyleSheet.create({
  container: {
    flex: flex,
    alignItems: center,
  },
});
