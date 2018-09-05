import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MenuForHeader from '../share/MenuForHeader'
import { Actions } from 'react-native-router-flux'

class AccidentToolButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuModalIsVisible: false
        }
        this.changeMenuModalIsVisible = this.changeMenuModalIsVisible.bind(this)
    }

    changeMenuModalIsVisible(menuModalState) {
        this.setState({ menuModalIsVisible: menuModalState })
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => this.setState({ menuModalIsVisible: true })}>
                    <EntypoIcon name="dots-three-vertical" style={{ fontSize: 20, color: '#fff' }} />
                </Button>
                <MenuForHeader
                    menuList={[
                        { icon: () => <Icon name='ios-add' style={{ fontSize: 20, color: '#777' }} />, title: '增加事故', route:  Actions.createAccident },
                        { icon: () => <Icon name='ios-search' style={{ fontSize: 20, color: '#777' }} />, title: '搜索', route: Actions.accidentSearch }
                    ]}
                    menuModalIsVisible={this.state.menuModalIsVisible}
                    changeMenuModalIsVisible={this.changeMenuModalIsVisible}
                />
            </View>
        )
    }
}



export default AccidentToolButton