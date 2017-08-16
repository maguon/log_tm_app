import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableHighlight
} from 'react-native'
import { Button, Icon } from 'native-base'
import { file_host } from '../../../config/Host'

const window = Dimensions.get('window')
export default class PanelCustomItem extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 30) / 2
    }

    render() {
        return (
            <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.props.onShowPhoto}  >
                <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                    <Image source={{ uri: `${file_host}/image/${this.props.imageUrl}` }} style={{ width: this.props.width, height: this.props.width / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />
                </View>
            </TouchableHighlight>
        )
    }
}