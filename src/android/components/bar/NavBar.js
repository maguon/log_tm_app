import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Header, Title, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { title, layout } = this.props
        return (
            <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
                <StatusBar hidden={false} />
                <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                    <Title>{title}</Title>
                    <View style={{ position: 'absolute', left: 0 }}>
                        <Button transparent onPress={ Actions.pop}>
                            <Icon name="chevron-left" size={30} color='#ffffff' />
                        </Button>
                    </View>
                </Header>
            </View>
        )
    }
}


