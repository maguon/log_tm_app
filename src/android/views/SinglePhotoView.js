import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Ion } from 'native-base'


export default class PhotoPageView extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        initParam: {
            onUpdateImage: (param) => { console.log(param)}
        }
    }

    render() {
        return (
            <View>
                <Text>PhotoPageView</Text>
            </View>
        )
    }
}