import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {flex} from '../../styles/constants';

export default class SigninPage extends React.PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.signinBox}>
        <Text>签到</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  signinBox: {
    flex: flex,
  },
});
