
import React from 'react'
import {View,StyleSheet,Text,Platform} from 'react-native'
import RootToast from 'react-native-root-toast'

const Toast = {
    toast: null,

    showToast: (msg) => {
        this.toast = RootToast.show(msg, {
            position: 0,
            duration: 1000
        })
        setTimeout(() => {
            RootToast.hide(toast)
        }, 1000)
    },

    showLog: (msg) => {
        this.toast = RootToast.show(msg, {
            position: 0,
            duration: 2000
        })
        setTimeout(() => {
            RootToast.hide(toast)
        }, 2000)
    },

    showSuccess: (msg, option) => {
        let toast = RootToast.show(Platform.OS === 'ios' ? <View>
            <Text>ios</Text>
        </View> : msg, {
            duration: 1500,
            position: RootToast.positions.CENTER,
            ...option
        })
        setTimeout(function() {
            RootToast.hide(toast)
            typeof option === 'function' ? option && option() : null
        }, 2000)
    },

    showLogSuccess: (msg, option) => {
        let toast = RootToast.show(
            Platform.OS === 'ios' ?
            <View style={styles.container}>
                <Text style={styles.message}>show log success</Text>
            </View>
            : msg, {
                duration: 2000,
                position: RootToast.positions.CENTER,
                ...option
            }
        )
        setTimeout(function() {
            RootToast.hide(toast)
            typeof option === 'function' ? option && option() : null
        }, 2500)
    },

    showWaring: (msg, option) => {
        let toast = RootToast.show(
            Platform.OS === 'ios' ?
            <View style={styles.container}>
                <Text style={styles.message}>waring</Text>
            </View>
            : msg, {
                duration: RootToast.durations.SHORT,
                position: RootToast.positions.CENTER,
                ...option
            }
        )
        setTimeout(function() {
            RootToast.hide(toast)
        }, RootToast.durations.SHORT + 500)
    }

}

const styles = StyleSheet.create({
    container: {
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 20,
    }
})

export {Toast}