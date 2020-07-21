import {onThemeChange} from '../actions/theme/index';
import {onLoadBannerData} from '../actions/index/banner';
import {onLoadRadioData, onRadioBanner, onRadioRaking, onRadioDetail} from '../actions/index/radio';
import {onLoadTopListData, onLoadListData} from './index/toplist';
import {onLoadTopPlayListHigh} from '../actions/index/topPlaylistHigh';
import {
  onGetCodeData,
  onLoginData,
  onFollowsData,
  onUserInfoData,
  onSettingData,
  onPlayListData,
} from '../actions/personal/user';
import {onDailySinger} from '../actions/personal/daily';
import {onLoadWeatherData} from '../actions/index/weather';
import {onLoadSearchData} from '../actions/index/search';
import {onLoadRecommendData, onLoadPersonalizData} from './index/personalized';
import {onLoadMv, onLoadMvDetail, onLoadMvUrl, onPersonalizedData} from './video/mv';
import {
  onLoadVideoGroupData,
  onLoadVideoRelateData,
  onLoadVideoDetailData,
} from './video/video';
import {onLoadPrivateData} from './personal/message';
import {
  onLoadSongUrl,
  onCheckMusic,
  onLikeMusic,
  onLikeListMusic,
  onLoadPlayListData,
  onLoadLyricData,
} from './index/song/song';
import {onLoadResourceData} from './index/resource';
import {onLoadDjprogramData} from './index/djprogram';
import {
  getCatlistData
} from './index/catlist'

export default {
  onThemeChange,
  onLoadBannerData,
  onGetCodeData,
  onLoginData,
  onLoadRadioData,
  onLoadTopListData,
  onLoadTopPlayListHigh,
  onDailySinger,
  onLoadWeatherData,
  onLoadSearchData,
  onLoadRecommendData,
  onLoadMv,
  onLoadMvDetail,
  onLoadVideoGroupData,
  onLoadVideoDetailData,
  onLoadVideoRelateData,
  onFollowsData,
  onUserInfoData,
  onLoadPrivateData,
  onLoadSongUrl,
  onCheckMusic,
  onLikeMusic,
  onLikeListMusic,
  onLoadPlayListData,
  onLoadResourceData,
  onLoadListData,
  onLoadLyricData,
  onLoadDjprogramData,
  onLoadPersonalizData,
  onRadioBanner,
  onRadioRaking,
  onRadioDetail,
  onLoadMvUrl,
  onPersonalizedData,
  onPlayListData,
  getCatlistData,
};
