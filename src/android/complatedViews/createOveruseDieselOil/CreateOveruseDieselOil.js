import React from 'react'
import { Text, InteractionManager } from 'react-native'
import { Container, Content, Button, ListItem } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { TextBox, Select, RichTextBox } from '../../complatedComponents/form'
import { requiredObj, required, money } from '../../../util/Validator'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { Actions } from 'react-native-router-flux'

const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')
const moneyValidator = money('请输入数字')



const CreateOveruseDieselOil = props => {
    const { handleSubmit, createOveruseDieselOilFormValues } = props
    console.log('createOveruseDieselOilFormValues', createOveruseDieselOilFormValues)
    return (
        <Container>
            <Content>
                <Field name='task' label='调度编号' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        Actions.dpRouteRaskOptionalList({
                            onSelect: (param) => {
                                const { id } = param
                                onChange({ id, value: id, item: param })
                                Actions.popTo('createOveruseDieselOil')
                            }
                        })
                    }}
                />
                {createOveruseDieselOilFormValues && createOveruseDieselOilFormValues.task && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>司机</Text>
                    <Text style={globalStyles.midText}>{createOveruseDieselOilFormValues.task.item.drive_name ? `${createOveruseDieselOilFormValues.task.item.drive_name}` : ''}</Text>
                </ListItem>}

                {createOveruseDieselOilFormValues && createOveruseDieselOilFormValues.task && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>货车牌号</Text>
                    <Text style={globalStyles.midText}>{createOveruseDieselOilFormValues.task.item.truck_num ? `${createOveruseDieselOilFormValues.task.item.truck_num}` : ''}</Text>
                </ListItem>}
                <Field name='dieselOil' label='超油量' isRequired={true} validate={[requiredValidator, moneyValidator]} component={TextBox} />
                <Field name='forfeit' isRequired={true} label='罚款金额' validate={[requiredValidator, moneyValidator]} component={TextBox} />
                <Field name='remark' label='备注' component={RichTextBox} />
                <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>保存</Text>
                </Button>
            </Content>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        overuseDieselOilListReducer: state.overuseDieselOilListReducer,
        createOveruseDieselOilFormValues: getFormValues('createOveruseDieselOilForm')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    createOveruseDieselOil: (param) => {
        dispatch(actions.createOveruseDieselOil.createOveruseDieselOil(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createOveruseDieselOilForm',
    onSubmit: (values, dispatch, props) => {
        // console.log('onSubmit')
        dispatch(actions.createOveruseDieselOil.createOveruseDieselOil(values))
    }
})(CreateOveruseDieselOil))