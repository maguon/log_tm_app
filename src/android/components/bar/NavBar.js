import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Header, Title, Button, Icon, Right, Left, Body } from 'native-base'
// import Icon from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        rightType: 0, //0：不显示right 1:status
        onPressRight: () => { },
        truckStatus:1
    }

    render() {
        let { title, layout } = this.props
        return (
            <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
                <StatusBar hidden={false} />
                <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                    <Title>{title}</Title>
                    <View style={{ position: 'absolute', left: 0 }}>
                        <Button transparent onPress={Actions.pop}>
                            <Icon name="ios-arrow-back" size={30} color='#ffffff' />
                        </Button>
                    </View>
                    {this.props.rightType == 1 && <View style={{ position: 'absolute', right: 10 }}>
                        <Button transparent onPress={this.props.onPressRight}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>{this.props.truckStatus==1&&'停用'}{this.props.truckStatus==0&&'启用'}</Text>
                        </Button>
                    </View>}
                </Header>
            </View>
        )
    }
}


