import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import actions from '../../redux/actions';
import {connect} from 'react-redux';
import {radioDetail} from '../../expand/api';
import {screentWidth} from '../../utils/screenUtil';
import {px2dp} from '../../utils/px2dp';
import List from './components/list/List';

class MoreRadio extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 获取到params的id
    const {onRadioDetail} = this.props;
    const id = this.props.navigation.state.params.id;
    const url = `${radioDetail}?rid=${id}`;
    onRadioDetail(url);
  }
  _renderMoreBac = () => {
    const radioDetail = this.props.radioDetail.item;
    if (!radioDetail) return;
    const backgroundUrl = radioDetail.dj.backgroundUrl;
    const desc = radioDetail.desc;
    return (
      <View style={{width: screentWidth, height: 300}}>
        <Image
          style={{width: screentWidth, height: 300}}
          source={{uri: backgroundUrl}}
        />
        <Text style={styles.desc}>{desc}</Text>
      </View>
    );
  };
  _renderContent = () => {
    const radioDetail = this.props.radioDetail.item;
    const str = radioDetail.dj;
    if (!radioDetail) return;
    const content = radioDetail.commentDatas;
    if (!content) return;
    console.log('commentDatas', content);
    return (
      <View style={styles.contentBox}>
        <List str={str} goPlayer={() => null} />
        {/* {content && content.map(item => {
        const url = item.userProfile.backgroundUrl
        return <View style={styles.contentText}>
          <Text>{item.content}</Text>
          <Image style={{width: px2dp(50), height: px2dp(50), borderRadius: px2dp(25)}} source={{uri: url}}/>
        </View>
      })} */}
      </View>
    );
  };
  render() {
    return (
      <View>
        {this._renderMoreBac()}
        {this._renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  radioDetail: state.radioDetail,
});

const mapDispatchToProps = dispatch => ({
  onRadioDetail: url => dispatch(actions.onRadioDetail(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoreRadio);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  desc: {
    position: 'absolute',
    lineHeight: px2dp(22),
    bottom: px2dp(16),
    left: 0,
    padding: px2dp(6),
    color: '#fff',
  },
  contentBox: {
    width: screentWidth,
    height: px2dp(400),
    position: 'relative',
    top: px2dp(-16),
    left: 0,
    zIndex: 99,
    backgroundColor: '#eee',
    borderTopLeftRadius: px2dp(20),
    borderTopRightRadius: px2dp(20),
  },
  contentText: {
    marginTop: px2dp(20),
  },
});
