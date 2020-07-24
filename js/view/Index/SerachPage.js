import React, {PureComponent} from 'react'
import TopNavigationBar from '../../common/TopNavigationBar'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'
import actions from '../../redux/actions'
import {connect} from 'react-redux'
import {search} from '../../expand/api'

import {px2dp} from '../../utils/px2dp'
import {GoBack} from '../../utils/GoBack'

class SearchPage extends PureComponent {
    state = {
        data: [
            {id: 112, title: '天堂'},{id: 221, title: '天堂'},{id: 213, title: '天堂'}
        ],
        value: '',
        data: null,
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.search !== nextProps.search) {
            return false
        }
        return true
    }

    _renderTopBar =()=> {
        return (
            <View style={styles.topWrap}>
                <TouchableOpacity>
                    <Image style={styles.back} source={require('../../images/common/back.png')} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    onChangeText={value => this.onChangeText(value)}
                    clearTextOnFocus={true}
                    placeholder='搜索'
                    onKeyPress={this.handleSearch}
                    blurOnSubmit={false}
                />
                <TouchableOpacity>
                    <Text style={styles.colse}>取消</Text>
                </TouchableOpacity>
            </View>
        )
    }

    topnavigationbar = () => {
        const statusbar = {
            backgroundColor: '#ffffff',
            barStyle: 'dark-content',
          };
          return (
            <TopNavigationBar
              title={'搜索'}
              statusBar={statusbar}
              style={{backgroundColor: '#ffffff'}}
              leftButton={GoBack(this.props, 'dark')}
            />
        );
    }

    // 搜索
    onChangeText(value) {
        this.setState({
            value
        })
    }

    handleSubmit=()=> {
        const {value} = this.state
        const {onLoadSearchData} = this.props;
        const url = search + value;
        onLoadSearchData(url);
    }

    _renderItem=(data)=> {
        const item = data.item;
        return <TouchableOpacity 
                style={styles.searchItemBox} 
                key={item.id}
                activeOpacity={1}
                onPress={() => this.goToPalyer(item.id)}
            >  
                <Image style={styles.img1v1Url} source={{uri: item.artists[0].img1v1Url}}/>
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
    }

    _flatlist=()=> {
        const search = this.props.search.item;
        if (!search) {
            return <View/>
        }
        return <FlatList
            data={search}
            renderItem={this._renderItem}
        />
    }

    render() {
        const {data} = this.state;
        const searchSubmit = (
            <TouchableOpacity
                style={styles.searchSubmit}
                activeOpacity={1}
                onPress={this.handleSubmit}
            >
                <Text style={styles.searchText}>🔍</Text>
            </TouchableOpacity>
        )
        const searchInput = (
            <View style={styles.searchInputBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={value => this.onChangeText(value)}
                    clearTextOnFocus={true}
                    placeholder='搜索'
                    onKeyPress={this.handleSearch}
                    blurOnSubmit={false}
                />
                {searchSubmit}
            </View>
        )
        // 搜索历史记录
        const searchHistory = (
            <View style={styles.searchHistory}>
                <Text>搜索历史</Text>
                <View style={styles.itemBox}>
                    {data && data.map(item => {
                        return <Text style={styles.item} key={item.id}>{item.title}</Text>
                    })}
                </View>
            </View>
        );

        return (
            <SafeAreaView style={styles.container}>
                {this._renderTopBar()}
                {this._flatlist()}
            </SafeAreaView>
        )
    }
}

export default connect(({search}) => ({search}), (dispatch) => ({
    onLoadSearchData(url) {
        dispatch(actions.onLoadSearchData(url))
    }
}))(SearchPage)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        width: px2dp(280),
        alignSelf: 'center',
        height: px2dp(30),
        borderWidth: px2dp(.5),
        borderColor: '#ddd',
        paddingHorizontal: px2dp(8),
        marginHorizontal: px2dp(6),
        borderRadius: px2dp(15)
    },
    searchHistory: {
        marginTop: px2dp(10),
        marginLeft:  px2dp(24),
        marginRight: px2dp(24),
    },
    itemBox: {
        marginTop: px2dp(3),
        flexDirection: 'row',
    },
    item: {
        width: px2dp(60),
        height: px2dp(26),
        borderRadius: 3,
        marginLeft: px2dp(6),
        borderWidth:1,
        borderColor: '#eee',
        borderStyle: "solid",
        textAlign: 'center',
        lineHeight: px2dp(26)
    },
    searchContentBox: {
        width: px2dp(345),
        paddingTop: px2dp(12),
        alignSelf: 'center'
    },
    searchItemBox: {
        width: px2dp(345),
        alignSelf: 'center',
        marginTop: px2dp(10),
        flexDirection: 'row',
        paddingVertical: px2dp(6),
        alignItems: 'center',
    },
    img1v1Url: {
        width: px2dp(60),
        height: px2dp(60),
        borderRadius: px2dp(6)
    },
    name: {
        marginHorizontal: px2dp(6)
    },
    searchInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth:px2dp(1),
        borderColor: '#eee',
        borderStyle: "solid",
        borderRadius: px2dp(6)
    },
    searchSubmit: {
        width: px2dp(48),
        height: px2dp(36),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: px2dp(6),
        borderBottomEndRadius: px2dp(6),
    },
    searchText: {

    },
    topWrap: {
        marginTop: px2dp(10),
        width: px2dp(345),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    back: {
        width: px2dp(18),
        height: px2dp(18),
    },
    colse: {
        color: '#d3d3d3',
        fontSize: px2dp(14)
    }

})