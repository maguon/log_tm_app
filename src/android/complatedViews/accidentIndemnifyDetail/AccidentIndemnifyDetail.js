import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Container, Content, ListItem, Body, Card, CardItem, } from 'native-base'
import globalStyles from '../../GlobalStyles'
import moment from 'moment'
import insurance_type from '../../../util/insurance_type.json'
import { connect } from 'react-redux'

const insuranceType = new Map(insurance_type)

const renderAccidentList = props => {
    const { accidentList } = props
    return accidentList.map((item, index) => {
        return (
            <Card key={index} style={{ backgroundColor: '#fff', marginLeft: 7.5, marginRight: 7.5, marginTop: 7.5, marginBottom: 7.5 }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>事故编号：{item.id ? `${item.id}` : ''}</Text>
                    {item.stat_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>处理中</Text>}
                    {item.stat_status == 2 && <Text style={globalStyles.midText}>已结束</Text>}
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>货车牌号：{item.truck_num ? `${item.truck_num}` : ''}</Text>
                        <Text style={globalStyles.smallText}>司机：{item.drive_name ? `${item.drive_name}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>负责人：{item.under_user_name ? `${item.under_user_name}` : ''}</Text>
                        <Text style={globalStyles.smallText}>责任人承担：{item.under_cost ? `${item.under_cost}` : '0'}元</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>盈亏：{item.profit ? `${item.profit}` : '0'}元</Text>
                        <Text style={globalStyles.smallText}>公司承担：{item.company_cost ? `${item.company_cost}` : '0'}元</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>赔付描述：{item.accident_explain ? `${item.accident_explain}` : ''}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    })
}

const AccidentIndemnifyDetail = props => {
    const { accidentIndemnify, accidentInsureLoan, accidentIndemnifyDetailReducer: { data: { accidentList } } } = props
    return (
        <Container>
            <Content>
                <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>理赔编号：{accidentIndemnify.id ? `${accidentIndemnify.id}` : ''}</Text>
                        <Text style={[globalStyles.midText, { color: 'red' }]}>已处理</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.smallText]}>经办人：{accidentIndemnify.insure_user_name ? `${accidentIndemnify.insure_user_name}` : ''}</Text>
                        <Text style={[globalStyles.smallText]}>{accidentIndemnify.created_on ? `${moment(accidentIndemnify.created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                </View>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>保险公司</Text>
                    <Text style={globalStyles.midText}>{accidentIndemnify.insure_name ? `${accidentIndemnify.insure_name}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>保险类型</Text>
                    <Text style={globalStyles.midText}>{accidentIndemnify.insure_type ? `${insuranceType.get(accidentIndemnify.insure_type)}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>待赔金额</Text>
                    <Text style={globalStyles.midText}>{accidentIndemnify.insure_plan ? `${accidentIndemnify.insure_plan}` : '0'}元</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>实付金额</Text>
                    <Text style={globalStyles.midText}>{accidentIndemnify.insure_actual ? `${accidentIndemnify.insure_actual}` : '0'}元</Text>
                </ListItem>
                {accidentList.length > 0 && <View style={{ margin: 7.5 }}>
                    <Text style={{ margin: 7.5 }}>关联其他事故</Text>
                    {renderAccidentList({ accidentList })}
                </View>}
                {accidentIndemnify.financial_loan_status == 1 && <View style={{ margin: 15, backgroundColor: '#f5f5f5' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 15, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <Text style={globalStyles.midText}>财务欲借金额</Text>
                        <Text style={globalStyles.midText}>{accidentIndemnify.financial_loan ? `${accidentIndemnify.financial_loan}` : '0'}元</Text>
                    </View>
                    {accidentInsureLoan && (accidentInsureLoan.loan_status == 2 || accidentInsureLoan.loan_status == 3) && <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 15, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <Text style={globalStyles.midText}>财务实际金额</Text>
                        <Text style={globalStyles.midText}>{accidentInsureLoan.loan_money ? `${accidentInsureLoan.loan_money}` : '0'}元</Text>
                    </View>}
                    {accidentInsureLoan && (accidentInsureLoan.loan_status == 2 || accidentInsureLoan.loan_status == 3) && <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 15, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <Text style={globalStyles.midText}>财务借款时间</Text>
                        <Text style={globalStyles.midText}>{accidentInsureLoan.created_on ? `${moment(accidentInsureLoan.created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>}
                </View>}
                <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={globalStyles.midText}>处理描述</Text>
                    <Text style={globalStyles.midText}>{accidentIndemnify.payment_explain ? `${accidentIndemnify.payment_explain}` : ''}</Text>
                </ListItem>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        accidentIndemnifyDetailReducer: state.accidentIndemnifyDetailReducer
    }
}

export default connect(mapStateToProps)(AccidentIndemnifyDetail)
