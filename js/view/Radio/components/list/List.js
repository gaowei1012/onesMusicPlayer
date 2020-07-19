import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {px2dp} from '../../../../utils/px2dp';
export default class List extends React.PureComponent {
  componentDidMount() {}
  static defaultProps = {
    title: '标题',
    desc: 'desc',
  };
  static propTypes = {
    str: PropTypes.object.isRequired,
    goPlayer: PropTypes.func,
  };
  render() {
    const {str, goPlayer} = this.props;
    const desc = str.str.signature;
    const title = str.str.nickname;
    console.log('哈哈哈哈--str', str.str);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={goPlayer} style={styles.contentBox}>
          <View style={styles.leftBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
          </View>
          <View style={styles.rightBox}>
            <Text>hhh</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: px2dp(40),
  },
  contentBox: {
    width: px2dp(345),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: px2dp(55),
    backgroundColor: 'red',
    marginTop: px2dp(6),
    paddingLeft: px2dp(6),
    paddingRight: px2dp(6),
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
  },
});
