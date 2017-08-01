import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    Image
} from 'react-native'
import { Button, Icon } from 'native-base'


const window = Dimensions.get('window')
export default class PanelCustomItem extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 30) / 2,
        imageUrl: 'http://stg.myxxjs.com:9002/api/image/596f21de100f67405a122ded',
    }

    render() {
        return (
            <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                <Image source={{ uri: this.props.imageUrl }} style={{ width: this.props.width, height: this.props.width / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />
            </View>
        )
    }
}