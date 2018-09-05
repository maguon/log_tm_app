
import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Container, Content, Button, ListItem } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { Select, RichTextBox, DatePicker, TimePicker, CheckBox } from '../../complatedComponents/form'
import { Actions } from 'react-native-router-flux'
import { requiredObj, required, money } from '../../../util/Validator'
import globalStyles from '../../GlobalStyles'



const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')


const CreateAccident = props => {
    const { formValues, createAccidentReducer: { data: { status } } } = props
    return (
        <Container>
            <Content>
                {status == 0 && <Field name='task' label='调度编号' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        Actions.dpRouteRaskOptionalList({
                            onSelect: (param) => {
                                const { id } = param
                                onChange({ id, value: id, item: param })
                                Actions.popTo('createAccident')
                            }
                        })
                    }}
                />}

                {status == 0 && formValues && formValues.task && <Field
                    isRequired={true}
                    validate={[requiredObjValidator]}
                    label='车辆类型'
                    name='truckType'
                    listTitle='车辆类型'
                    itemList={[{ id: formValues.task.item.truck_id, value: `${formValues.task.item.truck_num}(车头)`, item: { truck_num: formValues.task.item.truck_num } },
                    { id: formValues.task.item.trail_id, value: `${formValues.task.item.trail_num}(挂车)`, item: { truck_num: formValues.task.item.trail_num } }]}
                    component={CheckBox} />}
                {status == 1 && formValues && formValues.task && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>调度编号</Text>
                    <Text style={globalStyles.midText}>{formValues.task.id ? `${formValues.task.id}` : ''}</Text>
                </ListItem>}
                {status == 1 && formValues && formValues.truckType && <ListItem style={{ justifyContent: 'space-between' }}>
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
                {/* <Button full onPress={handleSubmit}>
                    <Text>下一步</Text>
                </Button> */}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        createAccidentReducer: state.createAccidentReducer,
        formValues: getFormValues('createAccidentForm')(state)
    }
}


export default connect(mapStateToProps)(reduxForm({
    form: 'createAccidentForm',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
        // console.log('onSubmit')
        dispatch(actions.createAccident.submit(values))
    }
})(CreateAccident))
