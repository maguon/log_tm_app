import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableHighlight
} from 'react-native'
import { Button, Icon } from 'native-base'

const window = Dimensions.get('window')
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false
        }
        this.onPressPanel = this.onPressPanel.bind(this)
        this.onPressEdit = this.onPressEdit.bind(this)
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 15) / 2,
        title: '上传驾驶证照片'
    }

    onPressPanel() {
        if (this.state.isEdit)
            this.setState({ isEdit: false })
        else
            this.setState({ isEdit: true })
    }

    onPressEdit() {
        console.log('onPressEdit')
    }

    render() {
        let cc = 'http://stg.myxxjs.com:9002/api/image/596f21de100f67405a122ded'
        return (
            <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.onPressPanel}>
                <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                    {/*<Image source={{ uri: 'http://stg.myxxjs.com:9002/api/image/596f21de100f67405a122ded' }} style={{ width: this.props.width, height: this.props.width / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />*/}
                    <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.onPressEdit}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: this.props.width, position: 'absolute', bottom: 0 }}>
                            <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>{this.props.title}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, right: 0, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='md-create' style={{ color: '#fff', fontSize: 18 }} />
                    </View>
                </View>
            </TouchableHighlight>

        )
    }
}