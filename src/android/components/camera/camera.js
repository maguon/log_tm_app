import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions
} from 'react-native'
import { Button, Icon } from 'native-base'

const window = Dimensions.get('window')

export default class Camera extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 15) / 2,
        title: '上传驾驶证照片'
    }

    render() {
        return (
            <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button rounded style={{ width: 50, borderRadius: 25, height: 50, backgroundColor: '#00cade', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                        <Icon name='camera' style={{ fontSize: 24 }} />
                    </Button>
                    <Text style={{ fontSize: 10, color: '#bfbfbf', paddingTop: 5 }}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}