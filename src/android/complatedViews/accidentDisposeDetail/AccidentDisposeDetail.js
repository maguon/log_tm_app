import React from 'react'
import { View, Text } from 'react-native'
import { Container, Content, ListItem } from 'native-base'
import globalStyles from '../../GlobalStyles'
import user_role from '../../../util/user_role.json'
import moment from 'moment'



const AccidentDisposeDetail = props => {
    const userRole = new Map(user_role)
    console.log('props', props)
    const { accident, accidentDisposeInfo } = props

    return (
        <Container>
            <Content>
                <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={globalStyles.midText}>处理人：{accidentDisposeInfo.op_user_name ? `${accidentDisposeInfo.op_user_name}` : ''}</Text>
                        <Text style={globalStyles.midText}>已处理</Text>
                    </View>
                    <View style={{ padding: 7.5, alignItems: 'flex-end' }}>
                        <Text style={[globalStyles.smallText]}>{`${accident.accident_date ? moment(accident.accident_date).format('YYYY-MM-DD HH:mm') : ''}`}</Text>
                    </View>
                </View>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>事故类型</Text>
                    <Text style={globalStyles.midText}>
                        {accidentDisposeInfo.truck_accident_type == 2 && '严重事故'}
                        {accidentDisposeInfo.truck_accident_type == 1 && '一般事故'}
                    </Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>责任人</Text>
                    <Text style={globalStyles.midText}>{accident.under_user_name ? `${accident.under_user_name}  (${userRole.get(accidentDisposeInfo.type)})` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>责任人承担金额</Text>
                    <Text style={globalStyles.midText}>{accident.under_cost ? `${accident.under_cost}` : ''}元</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>公司承担金额</Text>
                    <Text style={globalStyles.midText}>{accident.company_cost ? `${accident.company_cost}` : ''}元</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>盈亏</Text>
                    <Text style={globalStyles.midText}>{accident.profit ? `${accident.profit}` : ''}元</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>处理结束时间</Text>
                    <Text style={globalStyles.midText}>{accidentDisposeInfo.end_date ? `${moment(accidentDisposeInfo.end_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                </ListItem>
                <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={globalStyles.midText}>处理描述</Text>
                    <Text style={globalStyles.midText}>{accident.remark ? `${accident.remark}` : ''}</Text>
                </ListItem>
            </Content>
        </Container>
    )
}

export default AccidentDisposeDetail