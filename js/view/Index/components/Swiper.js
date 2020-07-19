import * as React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Swipe from 'react-native-swiper';
import {screentWidth} from '../../../utils/screenUtil';

export default class SwiperItem extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };
  state = {
    horizontal: true,
    autoplay: true,
  };
  async componentDidMount() {
    console.log('this props data', this.props.data);
  }
  render() {
    const data = this.props.data;
    return (
      <Swipe
        horizontal={this.state.horizontal}
        autoplay={true}
        style={{width: 375, height: 90, backgroundColor: '#eee'}}>
        {data == null
          ? null
          : data.map(item => (
              <View style={{height: 90, width: 375}} key={item.targetId}>
                <Image
                  resizeMode="cover"
                  styles={styles.image}
                  source={{
                    uri:
                      'http://p1.music.126.net/qB1yVi1DL_xy-0qgF-sosQ==/109951164796751497.jpg',
                  }}
                />
              </View>
            ))}
      </Swipe>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 345,
    height: 90,
  },
});
