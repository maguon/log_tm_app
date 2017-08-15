import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Ion } from 'native-base'
import { connect } from 'react-redux'

// import {

// } from '../../actions/CustomPhotoViewAction'

class CustomPhotoView extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        initParam: {
            onDelImage: (param) => { console.log(param)}
        }
    }

    render() {
        return (
            <View>
                <Text>CustomPhotoView</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customPhotoViewReducer: state.customPhotoViewReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({


})

export default connect(mapStateToProps, mapDispatchToProps)(CustomPhotoView)