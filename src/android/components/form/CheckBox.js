import React, { Component } from 'react'
import {
    Text,
    View,
    Modal
} from 'react-native'
import { Button, Ion } from 'native-base'



export default class CheckBox extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>CheckBox</Text>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={true}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View>
                        <Text>Hello World!</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}