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
export default class PanelSingleItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false
        }
        this.onPressPanel = this.onPressPanel.bind(this)
        // this.onPressEdit = this.onPressEdit.bind(this)
        this.renderIsEdit = this.renderIsEdit.bind(this)
        this.renderIsCustom = this.renderIsCustom.bind(this)
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 30) / 2,
        title: '身份证',
        onUpdateImage: () => { },
        onShowPhoto: () => { }
    }

    onPressPanel() {
        if (this.state.isEdit)
            this.setState({ isEdit: false })
        else
            this.setState({ isEdit: true })
    }

    // onPressEdit() {
    //     console.log('onPressEdit')
    // }

    renderIsEdit() {
        return (
            <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.props.onShowPhoto} onLongPress={this.onPressPanel} >
                <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                    <Image source={{ uri: `${file_host}/image/${this.props.imageUrl}` }} style={{ width: this.props.width, height: this.props.width / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: this.props.width, position: 'absolute', bottom: 0 }}>
                        <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>{this.props.title}</Text>
                    </View>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.props.onUpdateImage} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='camera' style={{ color: '#fff', fontSize: 20 }} />
                        </View>
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        )
    }

    renderIsCustom() {
        return (
            <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.props.onShowPhoto} onLongPress={this.onPressPanel}>
                <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                    <Image source={{ uri: `${file_host}/image/${this.props.imageUrl}` }} style={{ width: this.props.width, height: this.props.width / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View>
                {!this.state.isEdit && this.props.imageUrl && this.renderIsCustom()}
                {this.state.isEdit && this.props.imageUrl && this.renderIsEdit()}
            </View>
        )
    }
}