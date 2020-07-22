'use strict';

module.exports = {
  // 线下默认地址
  base_url: 'http://143.92.46.73/',
  // 首页
  banner_url: 'banner',
  // 登录 发送手机验证码
  captcha: 'captcha/sent',
  // 验证验证码
  verify: 'captcha/verify',
  // 刷新登录
  refresh: 'login/refresh',
  // 注册
  register: 'register/cellphone',
  // 检查手机好是否已注册
  checkot_register: 'cellphone/existence/check',
  // 退出登录
  logout: 'logout',
  // 获取热门歌手
  artist: 'artist/sublist',
  // 搜索歌曲
  search: 'search?keywords=',
  // 点赞收藏
  subscribe: 'playlist/subscribe',
  // 歌词
  lyric: 'lyric',
  // 新歌速递
  top: 'top/song',
  // 评论
  comment: 'comment/music',
  // 获取歌曲详情
  songDetail: 'song/detail',
  // 获取专辑内容
  album: 'album',
  // 签到
  dailySignin: 'daily_signin',
  // 喜欢音乐
  like: 'like?id=',
  // 喜欢音乐列表
  likelist: 'likelist?uid=',
  // 新碟上架
  topAlbum: 'top/album',
  // 最新专辑
  albumNewest: 'album/newest',
  // 热门歌手
  topArtists: 'top/artists',
  // mv 排行
  topMv: 'top/mv?area=',
  // 获取mv数据
  mvDetail: 'mv/detail?mvid=',
  // 全部mv
  mvAll: 'mv/all?type=',
  // 网易出品mv
  mvExclusiveRcmd: 'mv/exclusive/rcmd',
  // 推荐mv
  personalizedMv: 'personalized/mv',
  // 推荐歌单
  personalized: 'personalized?limit=',
  // 推荐新音乐
  personalizedNewsong: 'personalized/newsong',
  // 推荐电台
  personalizedDjprogram: 'personalized/djprogram',
  // 排行榜
  rakingList: 'top/list',
  // 所有排行榜
  topAllList: 'toplist',
  // 所有榜单内容摘要
  rakingListDeatil: 'toplist/detail',
  // 排行榜详情 使用歌曲想详情
  rakingOnesDetail: 'playlist/detail',
  // 歌手榜
  toplistArtist: 'toplist/artist',
  // 热门电台
  djHot: 'dj/hot',
  // 电台 - 24小时节目榜
  djProgramToplist: 'dj/program/toplist/hours',
  // 私人FM
  persoanlFm: 'personal_fm',
  // 电台
  radio: 'personalized/djprogram',
  // 电台 banner
  radioBanner: 'dj/banner',
  // 热门电台
  radioHot: 'dj/hot',
  // 推荐 电台
  radioRaking: 'dj/recommend',
  // 电台详情
  radioDetail: 'dj/detail',
  // 精选歌单
  topPlaylistHigh: '/top/playlist/highquality',
  // 视频菜单
  videoList: 'video/group/list',
  // 标签下的视频
  videoTagList: 'video/group?id=',
  // 相关视频
  relate: 'related/allvideo?id=',
  // 视频详情
  videoDetail: 'video/detail?id=',
  // 视频播放地址
  videoPalyer: 'video/url?id=',
  // 登录
  login: 'login/cellphone',
  // 获取用户列表
  userList: 'user/follows',
  // 获取用户信息
  // userInfo: 'user/subcount',
  // 通知 信息
  priate: 'msg/private',
  // 获取歌单详情
  playlist: 'playlist/detail',
  // 获取音乐url
  songUrl: 'song/url',
  // 获取每日推荐歌单
  resource: 'recommend/resource',
  // 喜欢音乐
  likeL: 'like',
  // 喜欢音乐列表
  likelist: 'likelist',
  // 歌单
  recommend: 'recommend/resource',
  // 设置
  setting: 'setting',
  // MV 视频
  mvUrl: 'mv/url',
  // 用户详情
  userInfo: 'user/detail',
  // 用户歌单
  userPlaylist: 'user/playlist',
  // 歌单分类
  playCatlist: 'playlist/hot',
  // 歌单详情
  playCatListDetail: 'playlist/detail',


  // 首页天气
  WeatherUrl:
    'https://free-api.heweather.net/s6/weather/now?location=109.36645,34.07863&key=a54b1c81d8e343929a3a79659040a51a',
};
