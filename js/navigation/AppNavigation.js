import * as React from 'react';
import {connect} from 'react-redux';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';

import WeclomePage from '../view/Welcome/WelcomePage';
import IndexPage from '../view/Index/IndexPage';
import PersonalPage from '../view/Personal/PersonalPage';
import RecommendPage from '../view/Recommend/RecommendPage';
import HomePage from '../view/Home/HomePage';
import LoginPage from '../view/Personal/Login';
import VideoPage from '../view/Video/VideoPage';
import PersonalInformation from '../view/Personal/PersonalInformation';
import MyFriend from '../view/Personal/MyFriend';
import MyPersoanl from '../view/Personal/MyPersoanl';
import DressedUp from '../view/Personal/DressedUp';
import SingerPage from '../view/Index/SingerPage';
import SingerDetailPage from '../view/Index/SingerDetail';
import MorePlayPage from '../view/Index/MoreSinger';
import GuessLikePage from '../view/Index/GuessLikePage';
import RankingPage from '../view/Index/RankingPage';
import RadioPage from '../view/Radio/RadioPage';
import RecommenPage from '../view/Index/RecommenPage';
import PlayListPage from '../view/Index/PlayListPage';
import GuessLikeMore from '../view/Index/components/GuessLikeMore';
import SigninPage from '../view/Personal/Signin';
import RankingDetail from '../view/Index/RankingDetail';
import Player from '../view/Player/Player';
import MyMessage from '../view/Personal/Widget/MyMessage';
import SearchPage from '../view/Index/SerachPage';
import Anchors from '../view/Radio/Anchor';
import Classification from '../view/Radio/Classification';
import Selected from '../view/Radio/Selected';
import MoreRadio from '../view/Radio/MoreRadio';
import NoticesPage from '../view/Notices/NoticesPage';
import VideoPalyer from '../view/Video/VideoPalyer';
import SelectMorePage from '../view/Index/SelectMorePage';
import Lyric from '../view/Player/lyrics'

export const rootCom = 'Init';

const InitNavigator = createStackNavigator({
  WeclomePage: {
    screen: WeclomePage,
    navigationOptions: {
      header: null,
    },
  },
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    },
  },
  IndexPage: {
    screen: IndexPage,
    navigationOptions: {
      header: null,
    },
  },
  PersonalPage: {
    screen: PersonalPage,
    navigationOptions: {
      header: null,
    },
  },
  RecommendPage: {
    screen: RecommendPage,
    navigationOptions: {
      header: null,
    },
  },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null,
    },
  },
  VideoPage: {
    screen: VideoPage,
    navigationOptions: {
      header: null,
    },
  },
  PersonalInformation: {
    screen: PersonalInformation,
    navigationOptions: {
      header: null,
    },
  },
  MyFriend: {
    screen: MyFriend,
    navigationOptions: {
      header: null,
    },
  },
  MyPersoanl: {
    screen: MyPersoanl,
    navigationOptions: {
      header: null,
    },
  },
  DressedUp: {
    screen: DressedUp,
    navigationOptions: {
      header: null,
    },
  },
  SingerPage: {
    screen: SingerPage,
    navigationOptions: {
      header: null,
    },
  },
  SingerDetailPage: {
    screen: SingerDetailPage,
    navigationOptions: {
      header: null,
    },
  },
  MorePlayPage: {
    screen: MorePlayPage,
    navigationOptions: {
      header: null,
    },
  },
  GuessLikePage: {
    screen: GuessLikePage,
    navigationOptions: {
      header: null,
    },
  },
  RadioPage: {
    screen: RadioPage,
    navigationOptions: {
      header: null,
    },
  },
  RankingPage: {
    screen: RankingPage,
    navigationOptions: {
      header: null,
    },
  },
  RecommenPage: {
    screen: RecommenPage,
    navigationOptions: {
      header: null,
    },
  },
  PlayListPage: {
    screen: PlayListPage,
    navigationOptions: {
      header: null,
    },
  },
  GuessLikeMore: {
    screen: GuessLikeMore,
    navigationOptions: {
      header: null,
    },
  },
  SigninPage: {
    screen: SigninPage,
    navigationOptions: {
      header: null,
    },
  },
  RankingDetail: {
    screen: RankingDetail,
    navigationOptions: {
      header: null,
    },
  },
  Player: {
    screen: Player,
    navigationOptions: {
      header: null,
    },
  },
  MyMessage: {
    screen: MyMessage,
    navigationOptions: {
      header: null,
    },
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      header: null
    }
  },
  Anchors: {
    screen: Anchors,
    navigationOptions: {
      header: null
    }
  },
  Classification: {
    screen: Classification,
    navigationOptions: {
      header: null
    }
  },
  Selected: {
    screen: Selected,
    navigationOptions: {
      header: null
    }
  },
  MoreRadio: {
    screen: MoreRadio,
    navigationOptions: {
      header: null
    }
  },
  NoticesPage: {
    screen: NoticesPage,
    navigationOptions: {
      header: null
    }
  },
  VideoPalyer: {
    screen: VideoPalyer,
    navigationOptions: {
      header: null
    }
  },
  SelectMorePage: {
    screen: SelectMorePage,
    navigationOptions: {
      header: null
    }
  },
  Lyric: {
    screen: Lyric,
    navigationOptions: {
      header: null
    }
  }
});

export const RootNavigation = createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator,
    },
    {
      navigationOptions: {
        header: null,
      },
    },
  ),
);

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const AppWithNavigationState = reduxifyNavigator(RootNavigation, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
