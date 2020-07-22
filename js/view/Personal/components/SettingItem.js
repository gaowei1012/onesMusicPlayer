import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import PropTypes from 'prop-types'
import { px2dp } from '../../../utils/px2dp'

export default SettingItem = ({icon, text, arrow, handleFunc, isBorder, number, isShowNum}) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={handleFunc} style={[styles.menuWrap, isBorder ? '' : styles.notBorderBottom]}>
           <View style={styles.titleBox}>
                <Image style={styles.icon} source={icon} />
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.arrowBox}>
                {isShowNum ? <Text style={styles.number}>{number}</Text>:null}
                <Image style={styles.arrow} source={arrow} />
            </View>
        </TouchableOpacity>
    )
}

SettingItem.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    arrow: PropTypes.string,
    handleFunc: PropTypes.func,
    number: PropTypes.number,
    isShowNum: PropTypes.bool
}


const styles = StyleSheet.create({
    menuWrap: {
        width: px2dp(335),
        height: px2dp(44),
        marginBottom: px2dp(3),
        paddingVertical: px2dp(8),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notBorderBottom: {
        borderBottomColor: '#ddd',
        borderBottomWidth: .5,
    },
    titleBox: {
        marginLeft: px2dp(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: px2dp(20),
        height: px2dp(20),
    },
    text: {
        marginLeft: px2dp(8),
        color: '#333',
    },
    arrowBox: {
        marginRight: px2dp(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    number: {
        color: '#333',
        fontSize: px2dp(12)
    },
    arrow: {
        width: px2dp(20),
        height: px2dp(20),
    },
})


