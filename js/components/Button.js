import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,StyleProp} from 'react-native'
import PropTypes from 'prop-types'
import { px2dp } from '../utils/px2dp'

export default class MusicButton extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        style: PropTypes.object,
        function: PropTypes.func
    }

    render() {
        return (<TouchableOpacity activeOpacity={1} onPress={this.props.function} 
            style={[styles.btn, this.props.style]}>
            <Text style={styles.text}>{this.props.text}</Text>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    btn: {
        position: 'relative',
        top: px2dp(60),
        left: 0,
        backgroundColor: 'blue',
        width: px2dp(345),
        height: px2dp(42),
        borderRadius: px2dp(12),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: px2dp(16),
        color: '#fff',
        fontWeight: '500'
    }
})
