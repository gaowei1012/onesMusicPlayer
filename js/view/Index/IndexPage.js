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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  View,
  Text,
} from 'react-native';
import {
  banner_url,
  WeatherUrl,
  search,
  topPlaylistHigh,
} from '../../expand/api';
import Spinner from 'react-native-spinkit'
import SpinnerLoading from '../../components/Spinner'

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
    } = this.props;
    onLoadBannerData(banner_url);
    onLoadWeatherData(WeatherUrl);
    const player_list_url = topPlaylistHigh + '?' + 'limit=10&order=new';
    onLoadTopPlayListHigh(player_list_url);
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
  renderGuessLike = () => {
    return <GuessLikePage />;
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

const mapStateToProps = state => ({
  banner: state.banner,
  weather: state.weather,
  playHigh: state.playHigh,
});
const mapDispatchToProps = dispatch => ({
  onLoadBannerData: url => dispatch(actions.onLoadBannerData(url)),
  onLoadWeatherData: url => dispatch(actions.onLoadWeatherData(url)),
  onLoadTopPlayListHigh: url => dispatch(actions.onLoadTopPlayListHigh(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

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
});
