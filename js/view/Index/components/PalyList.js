'use strict';

import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {row, center, spaceBetween} from '../../../styles/constants';
export default class PlayList extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired, // 渲染数据
  };
  goPage(userId) {
    console.log('userId', userId);
  }
  _renderItem = () => {
    return (
      <View>
        {this.props.data.map(item => (
          <TouchableOpacity
            onPress={() => this.goPage(item.userId)}
            style={styles.playBox}
            key={item.id}>
            <View style={styles.leftBox}>
              <View style={styles.imageBox}>
                <Image style={styles.image} source={{uri: item.coverImgUrl}} />
              </View>
              <View style={styles.nameBox}>
                <Text numberOfLines={1}>{item.name}</Text>
              </View>
            </View>
            <View style={styles.bofanBox}>
              <Image
                style={styles.player}
                source={require('../../../images/common/playerIcon.png')}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.playListBox}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {this._renderItem()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playListBox: {
    padding: 10,
  },
  playBox: {
    flexDirection: row,
    justifyContent: spaceBetween,
    alignItems: center,
  },
  leftBox: {
    flexDirection: row,
    marginTop: 10,
  },
  imageBox: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 10,
  },
  nameBox: {
    marginLeft: 6,
    marginBottom: 10,
    alignSelf: center,
    width: 180,
  },
  image: {
    width: 60,
    height: 60,
  },
  bofanBox: {
    flexDirection: row,
    width: 60,
    justifyContent: center,
  },
  player: {
    width: 20,
    height: 20,
  },
});
