import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Dimensions,
    StatusBar
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import PanelSingleItem from '../../components/camera/PanelSingleItem'
import PanelCustomItem from '../../components/camera/PanelCustomItem'
import Camera from '../../components/camera/Camera'


const window = Dimensions.get('window')

export default class Second extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {

    }

    render() {
        let btnPaddingTop = window.height - (((window.width - 30) / 32 * 9 + 10) * 5) - 54 - StatusBar.currentHeight - 60 - 40
        btnPaddingTop = btnPaddingTop > 10 ? btnPaddingTop : 10
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }]} current={1} />
                <FlatList showsVerticalScrollIndicator={false}
                    data={[<View style={{ flexDirection: 'row' }}>
                        <PanelSingleItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <Camera containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    </View>,
                    <View style={{ paddingTop: btnPaddingTop,paddingBottom:10, paddingHorizontal: 10 }}>
                        <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>完成</Text>
                        </Button>
                    </View>]}
                    renderItem={({ item }) => item}
                />

            </View>
        )
    }
}