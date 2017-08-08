import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import Camera from '../../components/camera/Camera'
import PanelSingleItem from '../../components/camera/PanelSingleItem'
import PanelCustomItem from '../../components/camera/PanelCustomItem'

export default class Third extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }, { step: '3', title: '车保信息' }]} current={1} />
                <FlatList showsVerticalScrollIndicator={false}
                    data={[<View style={{ flexDirection: 'row' }}>
                        <PanelSingleItem title='行驶证' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelSingleItem title='营运证' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    </View>, <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>, <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <Camera title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    </View>]}
                    renderItem={({ item }) => item}
                />
            </View>
        )
    }
}