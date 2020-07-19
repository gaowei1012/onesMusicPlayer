import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Swipe from 'react-native-swiper';
import PropTypes from 'prop-types';
import {flex} from '../styles/constants';

export default class MySwipe extends React.Component {
  static propTypes = {
    swipe_data: PropTypes.array,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
  };
  render() {
    const data = this.props.swipe_data;
    return (
      <View style={styles.container}>
        <Swipe autoplay={true} loop={true} horizontal={true}>
          {data == null
            ? null
            : data.map(item => {
                return (
                  <Image
                    style={[
                      {width: this.props.imageWidth},
                      {height: this.props.imageHeight},
                    ]}
                    key={item.id}
                    source={item.url}
                  />
                );
              })}
        </Swipe>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
});
