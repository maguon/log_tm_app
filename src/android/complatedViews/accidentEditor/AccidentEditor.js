import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { Container, Content, ListItem, Button, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as actions from '../../../actions'
import { Select, RichTextBox, DatePicker, TimePicker, CheckBox } from '../../complatedComponents/form'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import { requiredObj, required, money } from '../../../util/Validator'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')


const AccidentEditor = props => {
    const { formValues, handleSubmit, getDpRouteRaskOptionalListWaiting, getDpRouteRaskOptionalList,
        accident: { id = '', accident_status, declare_user_name = '', end_date },
        accidentEditorReducer: { getDpRouteTaskForAccidentEditor }, cleanTruckType } = props

    if (getDpRouteTaskForAccidentEditor.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <Content>
                    <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                            <Text style={[globalStyles.midText, globalStyles.styleColor]}>事故编号：{id}</Text>
                            {accident_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>待处理</Text>}
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                            <Text style={[globalStyles.smallText]}>申请人：{declare_user_name}</Text>
                            <Text style={[globalStyles.smallText]}>{end_date ? `${moment(end_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                        </View>
                    </View>

                    {/* <Field name='task' label='调度编号' component={Select} isRequired={true}
                        validate={[requiredObjValidator]}
                        onPress={({ onChange }) => {
                            getDpRouteRaskOptionalListWaiting()
                            Actions.dpRouteRaskOptionalList({
                                onSelect: (param) => {
                                    const { id } = param
                                    if (formValues && formValues.task && id != formValues.task.id) {
                                        onChange({ id, value: `${param.id}  ${param.city_route_start}->${param.city_route_end}`, item: param })
                                        cleanTruckType()
                                    }
                                }
                            })
                            InteractionManager.runAfterInteractions(getDpRouteRaskOptionalList)
                        }}
                    />
                    {formValues && formValues.task && <Field
                        isRequired={true}
                        validate={[requiredObjValidator]}
                        label='车辆类型'
                        name='truckType'
                        listTitle='车辆类型'
                        itemList={[{ id: formValues.task.item.truck_id, value: `${formValues.task.item.truck_num}(车头)`, item: { truck_num: formValues.task.item.truck_num, truck_type: 1 } },
                        { id: formValues.task.item.trail_id, value: `${formValues.task.item.trail_num}(挂车)`, item: { truck_num: formValues.task.item.trail_num, truck_type: 2 } }]}
                        component={CheckBox} />} */}
                    {formValues && formValues.task && <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>调度编号</Text>
                        <Text style={globalStyles.midText}>{formValues.task.id ? `${formValues.task.id}` : ''}</Text>
                    </ListItem>}
                    {formValues && formValues.truckType && <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>车辆类型</Text>
                        <Text style={globalStyles.midText}>{formValues.truckType.value ? `${formValues.truckType.value}` : ''}</Text>
                    </ListItem>}
                    {formValues && formValues.task && <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>司机</Text>
                        <Text style={globalStyles.midText}>{formValues.task.item.drive_name ? `${formValues.task.item.drive_name}` : ''}</Text>
                    </ListItem>}
                    <Field name='accidentDate' isRequired={true} label='发生日期' validate={[requiredValidator]} component={DatePicker} />
                    <Field name='accidentTime' isRequired={true} label='发生时间' validate={[requiredValidator]} component={TimePicker} />
                    <Field name='accidentAddress' label='事故地点' component={Select} isRequired={true}
                        validate={[requiredObjValidator]}
                        onPress={({ onChange }) => {
                            Actions.locationOptionalList({
                                onSelect: (param) => {
                                    onChange({ id: 1, value: `${param.pname ? param.pname : ''}${param.cityname ? param.cityname : ''}${param.adname ? param.adname : ''}${param.address ? param.address : ''}${param.name ? param.name : ''}`, item: param })
                                    Actions.pop()
                                }
                            })
                        }}
                    />
                    <Field name='accidentExplain' label='事故描述' component={RichTextBox} />
                    <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>保存并修改</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { accident_date, address = '', accident_explain = '', truck_id = '', truck_num = '', truck_type = '', lng = '', lat = '' } = state.accidentListReducer.data.accidentList.find(item => item.id == ownProps.accident.id)
    return {
        accidentEditorReducer: state.accidentEditorReducer,
        formValues: getFormValues('accidentEditorForm')(state),
        initialValues: {
            accidentDate: `${accident_date ? moment(accident_date).format('YYYY-MM-DD') : ''}`,
            accidentTime: `${accident_date ? moment(accident_date).format('HH:mm') : ''}`,
            accidentAddress: { id: 1, value: address, item: { location: `${lng}, ${lat}` } },
            truckType: { id: truck_id, value: `${truck_num}(${truck_type == 1 ? '车头' : '挂车'})`, item: { truck_num, truck_type } },
            accidentExplain: accident_explain
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDpRouteRaskOptionalList: () => {
        dispatch(actions.dpRouteRaskOptionalList.getDpRouteRaskOptionalList())
    },
    getDpRouteRaskOptionalListWaiting: () => {
        dispatch(actions.dpRouteRaskOptionalList.getDpRouteRaskOptionalListWaiting())
    },
    cleanTruckType: () => {
        dispatch(change('accidentEditorForm', 'truckType', null))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'accidentEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(actions.accidentEditor.modifyAccident({ accidentId: props.accident.id, ...values }))
    }
})(AccidentEditor))