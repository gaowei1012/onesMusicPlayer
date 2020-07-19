import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {flex, center, row, spaceBetween} from '../../styles/constants';
import THEME from '../../common/THEME_DEFAULT';

class MorePlayPage extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    let data = this.props.navigation.state.params.list;
    this.setState({
      data,
    });
  }

  _renderList=()=> {
    const {data} = this.state;
    return (
      <>
        {data && data.map(item => {
          return (
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
                  source={require('../../images/common/playerIcon.png')}
                />
              </View>
            </TouchableOpacity>
          )
        })}
      </>
    )
  }
  
  render() {
    const data = this.state;
    // console.log('data', data);
    if (!data) {
      return <Text style={{justifyContent: center}}>加载中...</Text>;
    }
    const isLoading = false;
    return (
      <SafeAreaView style={styles.container}>
        {this._renderList()}
      </SafeAreaView>
    );
  }
}

export default MorePlayPage;

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
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
