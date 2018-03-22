import React, { Component } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content } from 'native-base'
import globalStyles from '../GlobalStyles'
import moment from 'moment'

const padding = 15

const RepairInfo = props => {
    const { initParam: { id, repair_type, repair_date, end_date, accident_id, repair_reason, repair_station_name, remark, repair_money, accident_address } } = props
    return (
        <Container>
            <Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f2f2f2', padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <Text allowFontScaling={false} style={globalStyles.styleColor}>维修编号：{id ? `${id}` : ''}</Text>
                    {repair_type == 1 && <Text allowFontScaling={false}>事故维修</Text>}
                    {repair_type == 2 && <Text allowFontScaling={false}>非事故维修</Text>}
                </View>
                <View style={{ padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 }}>{repair_date ? `${moment(repair_date).format('YYYY-MM-DD HH:mm:ss')}` : ''} 至 {end_date ? `${moment(end_date).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                </View>
                {repair_type == 1 && <View style={{ padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 }}>事故编号：{accident_id ? `${accident_id}` : ''}</Text>
                    <Text allowFontScaling={false} style={{ fontSize: 12 }}>{accident_address ? `${accident_address}` : ''}</Text>
                </View>}
                <View style={{ padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 }}>申报描述：{repair_reason ? `${repair_reason}` : ''}</Text>
                </View>
                <View style={{ padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 }}>维修站：{repair_station_name ? `${repair_station_name}` : ''}</Text>
                </View>
                <View style={{ padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 }}>维修描述：{remark ? `${remark}` : ''}</Text>
                </View>
                <View style={{ padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 }}>金额：<Text style={{ color: 'red' }}>{repair_money ? `${repair_money}` : ''}</Text>元</Text>
                </View>
            </Content>
        </Container>
    )
}

export default RepairInfo 
