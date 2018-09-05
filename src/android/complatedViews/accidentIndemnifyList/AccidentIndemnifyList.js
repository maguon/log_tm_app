import React from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { Container, Body, Card, CardItem, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import insurance_type from '../../../util/insurance_type.json'
import * as actions from '../../../actions'

const renderItem = props => {
    const insuranceType = new Map(insurance_type)
    const { item, accident, getAccidentInsureLoanWaiting, getAccidentInsureLoan, getAccidentListForInsureWaiting, getAccidentListForInsure } = props
    return (
        <TouchableOpacity onPress={() => {
            if (item.financial_loan_status == 1) {
                getAccidentInsureLoanWaiting()
            }
            if (item.insure_status == 2) {
                getAccidentListForInsureWaiting()
            }
            Actions.accidentIndemnifyInfo({ accidentInsureId: item.id, accidentId: accident.id })

            if (item.insure_status == 2) {
                InteractionManager.runAfterInteractions(() => getAccidentListForInsure({ accidentInsureId: item.id, accidentId: accident.id }))
            }
            if (item.financial_loan_status == 1) {
                InteractionManager.runAfterInteractions(() => getAccidentInsureLoan({ accidentInsureId: item.id }))
            }
        }}>
            <Card style={{ backgroundColor: '#fff', marginLeft: 7.5, marginRight: 7.5, marginTop: 7.5, marginBottom: 7.5 }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>理赔编号：{item.id ? `${item.id}` : ''}</Text>
                    {item.insure_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>处理中</Text>}
                    {item.insure_status == 2 && <Text style={globalStyles.midText}>已处理</Text>}
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={[globalStyles.smallText]}>{item.created_on ? `${moment(item.created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                        {item.completed_date && <Text style={[globalStyles.smallText, { marginHorizontal: 15 }]}>至</Text>}
                        <Text style={globalStyles.smallText}>{item.completed_date ? `${moment(item.completed_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>保险公司：{item.insure_name ? `${item.insure_name}` : ''}</Text>
                        <Text style={globalStyles.smallText}>{item.insure_type ? `${insuranceType.get(item.insure_type)}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>待赔金额：{item.insure_plan ? `${item.insure_plan}` : ''}</Text>
                        <Text style={globalStyles.smallText}>
                            {item.financial_loan_status == 1 && '有借款'}
                            {item.financial_loan_status == 0 && '未借款'}
                        </Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>赔付描述：{item.payment_explain ? `${item.payment_explain}` : ''}</Text>
                    </Body>
                </CardItem>
                <CardItem footer style={{ justifyContent: 'flex-end' }}>
                    <Text style={globalStyles.smallText}>经办人：{item.insure_user_name ? `${item.insure_user_name}` : ''}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity >

    )
}


const AccidentIndemnifyList = props => {
    const { accidentIndemnifyListReducer: { data: { accidentIndemnifyList } }, accident, getAccidentInsureLoanWaiting, getAccidentInsureLoan, getAccidentListForInsureWaiting, getAccidentListForInsure } = props
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => index}
                ListHeaderComponent={
                    <Button full style={[globalStyles.styleBackgroundColor, { margin: 7.5 }]} onPress={() => Actions.createAccidentIndemnify({ accidentId: accident.id })}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>新增理赔</Text>
                    </Button>
                }
                contentContainerStyle={{ padding: 7.5 }}
                data={accidentIndemnifyList}
                renderItem={({ item }) => renderItem({ item, accident, getAccidentInsureLoanWaiting, getAccidentInsureLoan, getAccidentListForInsureWaiting, getAccidentListForInsure })} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        accidentIndemnifyListReducer: state.accidentIndemnifyListReducer
    }
}


const mapDispatchToProps = (dispatch) => ({
    getAccidentInsureLoan: param => {
        dispatch(actions.accidentIndemnifyInfo.getAccidentInsureLoan(param))
    },
    getAccidentInsureLoanWaiting: () => {
        dispatch(actions.accidentIndemnifyInfo.getAccidentInsureLoanWaiting())
    },
    getAccidentListForInsure: param => {
        dispatch(actions.accidentIndemnifyDetail.getAccidentListForInsure(param))
    },
    getAccidentListForInsureWaiting: () => {
        dispatch(actions.accidentIndemnifyDetail.getAccidentListForInsureWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentIndemnifyList)
