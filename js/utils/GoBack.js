import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {Icon} from '../icon/index';

function GoBack(props) {
  return (
    <View style={styles.leftWrapContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => NavigationUtil.goBack(props.navigation)}>
        <View style={styles.leftGoBackIcon}>
          <Image
            style={styles.leftImage}
            source={require('../images/common/back.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  leftWrapContainer: {},
  leftGoBackIcon: {
    padding: 5,
    marginRight: 10,
  },
  leftImage: {
    width: 18,
    height: 18,
  },
});

export default GoBack;
export {GoBack};
