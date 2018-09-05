
import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Container, Content, Button, Switch, ListItem, Left, Body, Right, Icon } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { Select, RichTextBox, DatePicker, TimePicker, CheckBox, TextBox } from '../../complatedComponents/form'
import { Actions } from 'react-native-router-flux'
import { requiredObj, required, money } from '../../../util/Validator'
import globalStyles from '../../GlobalStyles'


const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')
const requiredMoney = money('您输入的不是数字')

const SwitchStatus = props => {
    // console.log('props', props)
    const { input: { value, onChange }, label } = props
    return (
        <ListItem >
            <Left>
                <Text>{label}</Text>
            </Left>
            <Right>
                <Switch value={value} onValueChange={value => onChange(value)} />
            </Right>
        </ListItem>
    )
}

const CreateAccidentIndemnify = props => {
    const { handleSubmit, getInsureCompanyOptionalListWaiting, cleanSelectedField, getInsureCompanyOptionalList, formValues } = props
    // console.log('formValues', formValues)
    return (
        <Container>
            <Content>
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
                <Field name='financialLoanStatus' label='是否借款' component={SwitchStatus} />
                {formValues && formValues.financialLoanStatus && <Field name='financialLoan' label='欲借金额' component={TextBox} />}
                <Field name='paymentExplain' label='赔付描述' component={RichTextBox} />
                <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>提交</Text>
                </Button>
            </Content>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        createAccidentIndemnifyReducer: state.createAccidentIndemnifyReducer,
        initialValues: {
            financialLoanStatus: false,
            insurePlan: '0',
            financialLoan: '0'
        },
        formValues: getFormValues('createAccidentIndemnifyForm')(state)
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
        dispatch(change('createAccidentIndemnifyForm', fieldName, null))
    },
    finishAccidentIndemnify: param => {
        dispatch(actions.accidentIndemnifyEditor.finishAccidentIndemnify(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createAccidentIndemnifyForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmitvalues', values)
        console.log('onSubmitprops', props)
        const { accidentId } = props
        dispatch(actions.createAccidentIndemnify.createAccidentIndemnify({ accidentId, ...values }))
    }
})(CreateAccidentIndemnify))