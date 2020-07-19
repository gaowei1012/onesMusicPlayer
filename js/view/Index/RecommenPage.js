import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {flex, center, row} from '../../styles/constants';
import {screentWidth} from '../../utils/screenUtil';
import {connect} from 'react-redux';
import actions from '../../redux/actions/index';
import {personalized} from '../../expand/api';

class RecommenPage extends React.Component {
  // componentDidMount() {
  //   this.getData();
  // }
  getData() {
    const {onLoadPersonalizData} = this.props;
    onLoadPersonalizData(personalized);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>推荐</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  personaliz: state.personaliz,
});

const mapDispatchToProps = dispatch => ({
  onLoadPersonalizData: url => dispatch(actions.onLoadPersonalizData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommenPage);

const styles = StyleSheet.create({
  container: {
    flex: flex,
  },
});
