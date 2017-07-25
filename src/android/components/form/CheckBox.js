import React, { Component } from 'react'
import {
    Text,
    View,
    Modal,
    TouchableHighlight
} from 'react-native'
import { Button, Icon } from 'native-base'



export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
        this.renderItem = this.renderItem.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    static defaultProps = {
        title: '性别：',
        value: '男',
        listTitle: 'list标题',
        itemList: [{ id: 0, value: '男' }, { id: 1, value: '女' }],
        onCheck: (item) => { console.log(item) }
    }

    renderItem() {
        return this.props.itemList.map((item, i) => {
            return (
                <TouchableHighlight
                    key={i}
                    underlayColor='rgba(0,0,0,0.1)'
                    onPress={() => this.onCheck(item)}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>{item.value}</Text>
                    </View>
                </TouchableHighlight>
            )
        })
    }

    onCheck(item) {
        this.props.onCheck(item)
        this.setState({ modalVisible: false })
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    underlayColor='rgba(0,0,0,0.1)'
                    onPress={() => this.setState({ modalVisible: true })}>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12 }}>{this.props.title}<Text>{this.props.value}</Text></Text>
                        <Icon
                            name='md-arrow-dropdown'
                            style={{ fontSize: 18, color: '#7a7a7a' }} />
                    </View>
                </TouchableHighlight>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: 1
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            borderWidth: 0.5,
                            borderColor: '#ccc',
                        }}>
                            <View style={{ borderBottomWidth: 1, borderColor: '#00cade' }}>
                                <Text style={{ paddingVertical: 10, color: '#00cade', textAlign: 'center' }}>{this.props.listTitle}</Text>
                            </View>
                            {this.renderItem()}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}