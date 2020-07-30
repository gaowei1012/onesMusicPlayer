import * as React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import {flex, center} from '../../styles/constants';
import SearchItem from './SearchItem';
import MenuItem from './components/MenuItem';
import {screentWidth} from '../../utils/screenUtil';
import DailyMood from './components/DailyMood';
import GuessLikePage from './components/GuessLike';
import SelectedPlaylist from './components/SelectedPlaylist';
import Swiper from 'react-native-swiper';
import {px2dp} from '../../utils/px2dp';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  FlatList,
  Image,
  View,
  Text,
} from 'react-native';
import {
  banner_url,
  WeatherUrl,
  topPlaylistHigh,
  personalizedNewsong,
} from '../../expand/api';
import SpinnerLoading from '../../components/Spinner'
import { Toast } from '../../utils/Toast';

class IndexPage extends React.PureComponent {
  state = {
    daily_data: [],
    banner: []
  };
  componentDidMount() {
    this.getData();
  }
  // 获取数据
  getData = () => {
    const {
      onLoadBannerData,
      onLoadWeatherData,
      onLoadTopPlayListHigh,
      onLoadRecommendData
    } = this.props;
    onLoadBannerData(banner_url);
    onLoadWeatherData(WeatherUrl);
    const player_list_url = topPlaylistHigh + '?' + 'limit=10&order=new';
    onLoadTopPlayListHigh(player_list_url);
    onLoadRecommendData(personalizedNewsong);
  };
  renderBanner = () => {
    const banner = this.props.banner.item;
    if (!banner) {
      return <SpinnerLoading/>
    }
    return (
      <Animated.View style={styles.bannerBox}>
        <Swiper autoplay={true}>
          {banner.map(item => {
            return <Image
              style={styles.bannerImage}
              key={item.id}
              source={{uri: item.imageUrl}}
           />
          })}
        </Swiper>
      </Animated.View>
    );
  };
  renderMenuItem = () => {
    return <MenuItem />;
  };
  renderDailyMood = () => {
    return <DailyMood data={this.props.weather} />;
  };
  renderSelectedPlaylists = () => {
    return <SelectedPlaylist play_list={this.props.playHigh} />;
  };
  _renderItem(data) {
    const item = data.item;
    console.log('data', data)
    return <TouchableOpacity
      activeOpacity={1}
      onPress={() => {Toast.showToast('功能开发中')}}
      style={styles.guessContentWrap}
    >
      <Image style={styles.imageBox} source={{uri: item.picUrl}}/>
      <View style={styles.guessContentBox}>
        <Text style={styles.guessContenText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  }
  // 今日推荐
  renderGuessLike = () => {
    const recommend = this.props.recommend.item;
    if (!recommend) {
      return <SpinnerLoading/>
    }
    console.log('recommend', recommend)
    return <View style={styles.guessLikeBox}>
      <View style={styles.topLikeBox}>
        <Text style={styles.likeTitle}>今日推荐</Text>
      </View>
      <FlatList data={recommend} renderItem={this._renderItem}/>
    </View>
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchItem />
        <ScrollView>
          {this.renderBanner()}
          {this.renderMenuItem()}
          {/* {this.renderDailyMood()} */}
          {this.renderSelectedPlaylists()}
          {this.renderGuessLike()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(({banner, weather, playHigh,recommend}) => ({
  banner, weather, playHigh,recommend
}), (dispatch) => ({
  onLoadBannerData(url) {
    dispatch(actions.onLoadBannerData(url))
  },
  onLoadWeatherData(url) {
    dispatch(actions.onLoadWeatherData(url))
  },
  onLoadTopPlayListHigh(url) {
    dispatch(actions.onLoadTopPlayListHigh(url))
  },
  onLoadRecommendData(url) {
    dispatch(actions.onLoadRecommendData(url))
  },
}))(IndexPage)

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
  bannerBox: {
    marginTop: 10,
    width: px2dp(345),
    height: px2dp(120),
    alignSelf: center,
    borderRadius: px2dp(6),
    overflow: 'hidden',
  },
  bannerImage: {
    width: px2dp(345),
    height: px2dp(120),
    borderRadius: px2dp(6),
    overflow: 'hidden',
  },
  shopSwiperBox: {
    width: screentWidth,
    height: px2dp(99),
  },
  // 今日推荐
  guessLikeBox: {
    width: px2dp(365),
    alignSelf: 'center',
    marginVertical: px2dp(6)
  },
  likeTitle: {
    color: '#333',
    fontSize: px2dp(14)
  },
  guessContentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: px2dp(6),
    marginVertical: px2dp(6)
  },
  imageBox: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(4)
  },
  guessContentBox: {
    marginHorizontal: px2dp(16),
    alignItems: 'flex-start'
  },
  guessContenText: {
    fontSize: px2dp(14),
    color: '#333'
  }
});
