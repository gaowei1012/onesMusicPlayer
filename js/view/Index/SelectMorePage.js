import React from 'react'
import {GoBack} from '../../utils/GoBack'
import TopNavigationBar from '../../common/TopNavigationBar'
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class SelectMorePage extends React.Component {

    componentDidMount() {
        // const id = this.props.navigation.params.id
    }
  
    render() {
        const StatusBar = {
            backgroundColor: '#ffffff',
            barStyle: 'dark-content', 
        }
        const renderTopBar = (
            <TopNavigationBar
            title="排行榜"
            statusBar={StatusBar}
            style={{backgroundColor: '#ffffff'}}
            leftButton={GoBack(this.props, 'dark')}
          />
        )
        return (
            <SafeAreaView>
                {renderTopBar}
                <Text>更多歌曲</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})