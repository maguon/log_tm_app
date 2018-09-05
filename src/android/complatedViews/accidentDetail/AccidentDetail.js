import React from 'react'
import { View, Text } from 'react-native'
import { Container, Content, ListItem } from 'native-base'
import globalStyles from '../../GlobalStyles'
import moment from 'moment'

const AccidentDetail = props => {
    const { accident, accident: { id = '', accident_status, accident_date, drive_name = '', declare_user_name = '', truck_num = '',
        dp_route_task_id = '', city_route_end = '', city_route_start = '', address = '', end_date = '', accident_explain = '' } } = props
    return (
        <Container>
            <Content>
                <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>事故编号：{id}</Text>
                        {accident_status == 2 && <Text style={[globalStyles.midText, globalStyles.styleColor]}>处理中</Text>}
                        {accident_status == 3 && <Text style={[globalStyles.midText]}>已处理</Text>}
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.smallText]}>申请人：{declare_user_name}</Text>
                        <Text style={[globalStyles.smallText]}>{end_date ? `${moment(end_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                </View>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>司机</Text>
                    <Text style={globalStyles.midText}>{drive_name}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>车辆类型</Text>
                    <Text style={globalStyles.midText}>{accident.truck_type == 1 && '车头'}{accident.truck_type == 2 && '挂车'} {truck_num}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>调度编号</Text>
                    <Text style={globalStyles.midText}>{dp_route_task_id}   {city_route_start}->{city_route_end}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>事故地点</Text>
                    <Text style={[globalStyles.midText, { flex: 1, paddingLeft: 15, textAlign: 'right' }]}>{address}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>发生时间</Text>
                    <Text style={globalStyles.midText}>{accident_date ? `${moment(accident_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                </ListItem>
                <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={globalStyles.midText}>事故描述</Text>
                    <Text style={globalStyles.midText}>{accident_explain}</Text>
                </ListItem>
            </Content>
        </Container>
    )
}

export default AccidentDetail