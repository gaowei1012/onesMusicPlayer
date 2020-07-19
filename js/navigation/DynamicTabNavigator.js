/* eslint-disable no-shadow */
'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  createAppContainer,
  BottomTabBar,
  createBottomTabNavigator,
} from 'react-navigation';

import IndexPage from '../view/Index/IndexPage';
import PersonalPage from '../view/Personal/PersonalPage';
// import RecommendPage from '../view/Recommend/RecommendPage'
import VideoPage from '../view/Video/VideoPage';

const TABS = {
  IndexPage: {
    screen: IndexPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => {
        return (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../images/tab/homepage.png')}
            selectedImage={require('../images/tab/homepage_fill.png')}
          />
        );
      },
    },
  },
  // RecommendPage: {
  //   screen: RecommendPage,
  //   navigationOptions: {
  //     tabBarLabel: '最新',
  //     tabBarIcon: ({tintColor, focused}) => {
  //       return (
  //         <TabBarItem
  //           tintColor={tintColor}
  //           focused={focused}
  //           normalImage={require('../images/tab/play.png')}
  //           selectedImage={require('../images/tab/play_fill.png')}
  //         />
  //       );
  //     },
  //   },
  // },
  VideoPage: {
    screen: VideoPage,
    navigationOptions: {
      tabBarLabel: '视频',
      tabBarIcon: ({tintColor, focused}) => {
        return (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../images/tab/live.png')}
            selectedImage={require('../images/tab/live_fill.png')}
          />
        );
      },
    },
  },
  PersonalPage: {
    screen: PersonalPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => {
        return (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../images/tab/addressbook.png')}
            selectedImage={require('../images/tab/addressbook_fill.png')}
          />
        );
      },
    },
  },
};

class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavgator() {
    /// 如果有当前Tabs
    if (this.Tabs) {
      return this.Tabs;
    }
    const {IndexPage, VideoPage, PersonalPage} = TABS;
    const tabs = {IndexPage, VideoPage, PersonalPage};
    // V2exPage.navigationOptions.tabBarLabel = '最热';
    return (this.Tabs = createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarComponent {...props} theme={this.props.theme} />;
      },
    }));
  }

  render() {
    // 保存navigation为了后面调用
    //console.log(this.props.navigation);
    const Tab = createAppContainer(this._tabNavgator());
    return <Tab />;
  }
}

class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
  }
}

class TabBarItem extends React.Component {
  render() {
    return (
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={{tintColor: this.props.tintColor, width: 25, height: 25}}
        source={
          this.props.focused ? this.props.selectedImage : this.props.normalImage
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
