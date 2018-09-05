import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { Container, Content, ListItem, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import * as actions from '../../../actions'
import { Select, RichTextBox, CheckBox, TextBox } from '../../complatedComponents/form'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import { requiredObj, required, money } from '../../../util/Validator'
import user_role from '../../../util/user_role.json'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

const userRole = new Map(user_role)
const requiredObjValidator = requiredObj('必选')
const requiredMoney = required('您输入的不是数字')

const AccidentDisposeEditor = props => {
    const { handleSubmit, accident, accidentDisposeInfo, getUserOptionalList, getUserOptionalListWaiting, cleanSelected, formValues, finishAccidentDispose } = props
    return (
        <Container>
            <Content>

                <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>事故编号：{`${accident.id ? accident.id : ''}`}</Text>
                        <Text style={[globalStyles.midText, { color: 'red' }]}>处理中</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.smallText]}>{`${accident.accident_date ? moment(accident.accident_date).format('YYYY-MM-DD HH:mm') : ''}`}</Text>
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
                            selectedItem: formValues && formValues.underUser ? formValues.underUser : null
                        })
                        InteractionManager.runAfterInteractions(getUserOptionalList)
                    }}
                />
                <Field name='underCost' label='责任人承担金额' validate={[requiredMoney]} component={TextBox} />
                <Field name='companyCost' label='公司承担金额' validate={[requiredMoney]} component={TextBox} />
                <Field name='profit' label='盈亏' validate={[requiredMoney]} component={TextBox} />
                <Field name='remark' label='处理描述' component={RichTextBox} />
                <View style={{ flexDirection: 'row', margin: 7.5, justifyContent: 'space-between' }}>
                    <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 7.5, flex: 1 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>保存修改</Text>
                    </Button>
                    <Button full onPress={() => finishAccidentDispose({ accidentId: accident.id, accidentCheckId: accidentDisposeInfo.id })} style={{ margin: 7.5, flex: 1, backgroundColor: '#00cade' }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>处理结束</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { accidentInfoReducer: { data: { accidentDisposeInfo } } } = state
    const { accident } = ownProps
    return {
        initialValues: {
            underCost: `${accident.under_cost ? accident.under_cost : 0}`,
            companyCost: `${accident.company_cost ? accident.company_cost : 0}`,
            profit: `${accident.profit ? accident.profit : 0}`,
            truckAccidentType: { id: accident.truck_accident_type, value: accident.truck_accident_type == 1 ? '一般' : `严重` },
            underUser: { id: accident.under_user_id, value: `${accident.under_user_name}  (${userRole.get(accidentDisposeInfo.type)})`, item: { real_name: accident.under_user_name } },
            remark: accident.remark
        },
        formValues: getFormValues('accidentDisposeEditorForm')(state)
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
        dispatch(change('accidentDisposeEditorForm', 'underUser', null))
    },
    finishAccidentDispose: (param) => {
        dispatch(actions.accidentDisposeEditor.finishAccidentDispose(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'accidentDisposeEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(actions.accidentDisposeEditor.modifyAccidentDispose({
            accidentCheckId: props.accidentDisposeInfo.id,
            truckAccidentId: props.accident.id,
            ...values
        }))
    }
})(AccidentDisposeEditor))

