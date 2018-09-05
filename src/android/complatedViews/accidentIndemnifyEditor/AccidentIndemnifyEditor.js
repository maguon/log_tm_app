import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { Container, Content, Body, Card, CardItem, Button, ListItem, Right, Left, Switch } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { Select, RichTextBox, DatePicker, TimePicker, CheckBox, TextBox } from '../../complatedComponents/form'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { requiredObj, required, money } from '../../../util/Validator'
import * as  actions from '../../../actions'
import moment from 'moment'
import insurance_type from '../../../util/insurance_type.json'
import { Actions } from 'react-native-router-flux'

const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')
const requiredMoney = money('您输入的不是数字')


const insuranceType = new Map(insurance_type)

const AccidentIndemnifyEditor = props => {
    const { handleSubmit, accidentIndemnify, getInsureCompanyOptionalListWaiting, getInsureCompanyOptionalList, cleanSelectedField,
        formValues, accidentInsureLoan, finishAccidentIndemnify } = props
    return (
        <Container>
            <Content>
                <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>理赔编号：{accidentIndemnify.id ? `${accidentIndemnify.id}` : ''}</Text>
                        <Text style={[globalStyles.midText, { color: 'red' }]}>处理中</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.smallText]}>经办人：{accidentIndemnify.insure_user_name ? `${accidentIndemnify.insure_user_name}` : ''}</Text>
                        <Text style={[globalStyles.smallText]}>{accidentIndemnify.created_on ? `${moment(accidentIndemnify.created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                </View>
                <Field name='company' label='保险公司' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        getInsureCompanyOptionalListWaiting()
                        Actions.insureCompanyOptionalList({
                            onSelect: (param) => {
                                const { id, insure_name } = param
                                onChange({ id, value: insure_name, item: param })
                                Actions.pop()
                            },
                            cleanSelected: () => cleanSelectedField('company'),
                            selectedItem: formValues && formValues.company ? formValues.company : null
                        })
                        InteractionManager.runAfterInteractions(getInsureCompanyOptionalList)
                    }}
                />
                <Field name='insureType' label='保险类型' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        Actions.insureTypeOptionlList({
                            onSelect: (param) => {
                                const { id, insuranceType } = param
                                onChange({ id, value: insuranceType })
                                Actions.pop()
                            },
                            cleanSelected: () => cleanSelectedField('insureType'),
                            selectedItem: formValues && formValues.insureType ? formValues.insureType : null
                        })
                    }}
                />
                <Field name='insurePlan' label='待赔金额' validate={[requiredMoney]} component={TextBox} />
                <Field name='insureActual' label='实赔金额' validate={[requiredMoney]} component={TextBox} />
                {accidentIndemnify.financial_loan_status == 1 && <View style={{ margin: 15, backgroundColor: '#f5f5f5' }}>
                    {accidentInsureLoan && accidentInsureLoan.loan_status == 1 && <Field name='financialLoan' label='财务欲借金额' validate={[requiredMoney]} component={TextBox} />}
                    {accidentInsureLoan && (accidentInsureLoan.loan_status == 0 || accidentInsureLoan.loan_status == 2 || accidentInsureLoan.loan_status == 3) && <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingRight: 15, marginLeft: 15, paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <Text style={globalStyles.midText}>财务欲借金额</Text>
                        <Text style={globalStyles.midText}>{accidentIndemnify.financial_loan ? `${accidentIndemnify.financial_loan}` : '0'}元</Text>
                    </View>}
                    {accidentInsureLoan && (accidentInsureLoan.loan_status == 2 || accidentInsureLoan.loan_status == 3) && <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingRight: 15, marginLeft: 15, paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <Text style={globalStyles.midText}>财务实际金额</Text>
                        <Text style={globalStyles.midText}>{accidentInsureLoan.loan_money ? `${accidentInsureLoan.loan_money}` : '0'}元</Text>
                    </View>}
                    {accidentInsureLoan && (accidentInsureLoan.loan_status == 2 || accidentInsureLoan.loan_status == 3) && <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingRight: 15, marginLeft: 15, paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <Text style={globalStyles.midText}>财务借款时间</Text>
                        <Text style={globalStyles.midText}>{accidentInsureLoan.created_on ? `${moment(accidentInsureLoan.created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>}
                </View>}
                <Field name='paymentExplain' label='赔付描述' component={RichTextBox} />
                <View style={{ flexDirection: 'row', margin: 7.5, justifyContent: 'space-between' }}>
                    <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 7.5, flex: 1 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>保存修改</Text>
                    </Button>
                    <Button full onPress={() => finishAccidentIndemnify({ accidentInsureId: accidentIndemnify.id })} style={{ margin: 7.5, flex: 1, backgroundColor: '#00cade' }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>处理结束</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { accidentIndemnify } = ownProps
    return {
        accidentIndemnify,
        initialValues: {
            company: { id: accidentIndemnify.insure_id, value: accidentIndemnify.insure_name },
            insurePlan: accidentIndemnify.insure_plan ? `${accidentIndemnify.insure_plan}` : '0',
            insureActual: accidentIndemnify.insure_actual ? `${accidentIndemnify.insure_actual}` : '0',
            paymentExplain: accidentIndemnify.payment_explain ? `${accidentIndemnify.payment_explain}` : '',
            insureType: { id: accidentIndemnify.insure_type, value: insuranceType.get(accidentIndemnify.insure_type) },
            financialLoan: accidentIndemnify.financial_loan ? `${accidentIndemnify.financial_loan}` : '0'
        },
        formValues: getFormValues('accidentIndemnifyEditorForm')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getInsureCompanyOptionalListWaiting: () => {
        dispatch(actions.insureCompanyOptionalList.getInsureCompanyOptionalListWaiting())
    },
    getInsureCompanyOptionalList: () => {
        dispatch(actions.insureCompanyOptionalList.getInsureCompanyOptionalList())
    },
    cleanSelectedField: fieldName => {
        dispatch(change('accidentIndemnifyEditorForm', fieldName, null))
    },
    finishAccidentIndemnify: param => {
        dispatch(actions.accidentIndemnifyEditor.finishAccidentIndemnify(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'accidentIndemnifyEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(actions.accidentIndemnifyEditor.modifyAccidentIndemnify({
            accidentInsureId: props.accidentIndemnify.id,
            accidentId: props.accidentId,
            ...values
        }))
    }
})(AccidentIndemnifyEditor))


