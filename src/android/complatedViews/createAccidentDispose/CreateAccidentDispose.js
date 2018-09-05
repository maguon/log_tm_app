
import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import { Select, RichTextBox, DatePicker, TimePicker, CheckBox, TextBox } from '../../complatedComponents/form'
import { Container, Content, Button } from 'native-base'
import * as actions from '../../../actions'
import { requiredObj, required, money } from '../../../util/Validator'
import globalStyles from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import user_role from '../../../util/user_role.json'

const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')
const requiredMoney = required('您输入的不是数字')

const CreateAccidentDispose = props => {
    const { handleSubmit, getUserOptionalListWaiting, getUserOptionalList, createAccidentDisposeFormValues, cleanSelected } = props
    const userRole = new Map(user_role)

    return (
        <Container>
            <Content>
                <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.midText, { color: 'red' }]}>待处理</Text>
                    </View>
                </View>
                <Field isRequired={true}
                    validate={[requiredObjValidator]}
                    label='事故类型'
                    name='truckAccidentType'
                    listTitle='事故类型'
                    itemList={[{ id: 1, value: '一般' }, { id: 2, value: '严重' }]}
                    component={CheckBox} />
                <Field name='underUser' label='责任人' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        getUserOptionalListWaiting()
                        Actions.userOptionalList({
                            onSelect: (param) => {
                                const { uid, real_name, type } = param
                                onChange({ id: uid, value: `${real_name}  (${userRole.get(type)})`, item: param })
                            },
                            cleanSelected,
                            selectedItem: createAccidentDisposeFormValues && createAccidentDisposeFormValues.underUser ? createAccidentDisposeFormValues.underUser : null
                        })
                        InteractionManager.runAfterInteractions(getUserOptionalList)
                    }}
                />
                <Field name='underCost' label='责任人承担金额' validate={[requiredMoney]} component={TextBox} />
                <Field name='companyCost' label='公司承担金额' validate={[requiredMoney]} component={TextBox} />
                <Field name='profit' label='盈亏' validate={[requiredMoney]} component={TextBox} />
                <Field name='remark' label='处理描述' component={RichTextBox} />
                <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>处理事故</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        initialValues: {
            underCost: '0',
            companyCost: '0',
            profit: '0'
        },
        createAccidentDisposeFormValues: getFormValues('createAccidentDisposeForm')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUserOptionalList: () => {
        dispatch(actions.userOptionalList.getUserOptionalList())
    },
    getUserOptionalListWaiting: () => {
        dispatch(actions.userOptionalList.getUserOptionalListWaiting())
    },
    cleanSelected: () => {
        dispatch(change('createAccidentDisposeForm', 'underUser', null))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createAccidentDisposeForm',
    onSubmit: (values, dispatch, props) => {
        console.log('props', props)
        dispatch(actions.createAccidentDispose.createAccidentDispose({ accidentId: props.accident.id, ...values }))
    }
})(CreateAccidentDispose))