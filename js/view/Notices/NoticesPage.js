import React from 'react'
import {SafeAreaView, Text, View, StyleSheet} from 'react-native'

export default class NoticesPage extends React.PureComponent {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.notices}>
                    <Text>页面建设中</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notices: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})