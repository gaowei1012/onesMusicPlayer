import React from 'react'
import {TouchableOpacity,StyleSheet,Image} from 'react-native'
import {px2dp} from '../../../utils/px2dp'
import PropTypes from 'prop-types'

/**
 * 
 * @param {*} param0 
 */
function PlayerItems({icon, handleFunc}) {
    return (
        <TouchableOpacity
            style={styles.playerItemBox}
            onPress={handleFunc}
        >
            <Image style={styles.image} source={require(icon)}/>
        </TouchableOpacity>
    )
}

PlayerItems.propTypes = {
    icon: PropTypes.string,
    handleFunc: PropTypes.func
}

export default PlayerItems

const styles = StyleSheet.create({
    playerItemBox: {
        flexDirection: 'column'
    },
    image: {
        width: px2dp(24),
        height: px2dp(24)
    }
})