import React from 'react'
import {StyleSheet} from 'react-native'
import Spinner from 'react-native-spinkit'
import {px2dp} from '../utils/px2dp'

export default class SpinnerLoading extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            spinner: true,
            size: 20
        }
    }
    render() {
        return <Spinner
            style={styles.spinerBox}
            isVisible={this.state.spinner}
            size={this.state.size}
            type={'FadingCircleAlt'}
            color={'#000000'}
        />
    }
}

// function SpinnerLoading() {
//     const [isSpinner, spinner] = useState(false);
//     const [setSize, size] = useState(0);

//     useEffect(() => {
//         setSize(20);
//         isSpinner(true);
//     }, []);
 
//     return <Spinner
//         style={styles.spinerBox}
//         isVisible={spinner}
//         size={size}
//         type={'FadingCircleAlt'}
//         color={'#000000'}
//     />
// }

const styles = StyleSheet.create({
    spinerBox: {
        alignSelf: 'center',
        marginTop: px2dp(20)
    }
})

// export default SpinnerLoading;