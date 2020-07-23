import React from 'react'
import {Text,TouchableOpacity,StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import { px2dp } from '../utils/px2dp'

function MusicButton({text, style, handleFunctuin}) {
    return (
        <TouchableOpacity activeOpacity={1} onPress={handleFunctuin} 
            style={[styles.btn, style]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

MusicButton.propTypes = {
    text: PropTypes.string,
    style: PropTypes.object,
    function: PropTypes.func
}

export default MusicButton

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
