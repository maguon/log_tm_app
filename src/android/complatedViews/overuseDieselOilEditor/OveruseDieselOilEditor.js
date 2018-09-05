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

const OveruseDieselOilEditor = props => {
    const { handleSubmit, overuseDieselOil, modifyOveruseDieselOilFormValues } = props
    console.log('overuseDieselOil', overuseDieselOil)
    return (
        <Container>
            <Content>
                <ListItem last style={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderBottomWidth: 1 }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>超油结算编号：{overuseDieselOil.id ? `${overuseDieselOil.id}` : ''}</Text>
                    {overuseDieselOil.stat_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>未扣</Text>}
                    {overuseDieselOil.stat_status == 2 && <Text style={globalStyles.midText}>已扣</Text>}
                </ListItem>
                <Field name='task' label='调度编号' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        Actions.dpRouteRaskOptionalList({
                            onSelect: (param) => {
                                const { id } = param
                                onChange({ id, value: id, item: param })
                                Actions.popTo('overuseDieselOilEditor')
                            }
                        })
                    }}
                />
                {modifyOveruseDieselOilFormValues && modifyOveruseDieselOilFormValues.task && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>司机</Text>
                    <Text style={globalStyles.midText}>{modifyOveruseDieselOilFormValues.task.item.drive_name ? `${modifyOveruseDieselOilFormValues.task.item.drive_name}` : ''}</Text>
                </ListItem>}

                {modifyOveruseDieselOilFormValues && modifyOveruseDieselOilFormValues.task && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>货车牌号</Text>
                    <Text style={globalStyles.midText}>{modifyOveruseDieselOilFormValues.task.item.truck_num ? `${modifyOveruseDieselOilFormValues.task.item.truck_num}` : ''}</Text>
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


const mapStateToProps = (state, ownProps) => {
    const overuseDieselOil = state.overuseDieselOilListReducer.data.overuseDieselOilList.find(item => item.id == ownProps.initParam.overuseDieselOilId)
    console.log('overuseDieselOil', overuseDieselOil)
    return {
        initialValues: {
            remark: overuseDieselOil && overuseDieselOil.remark ? overuseDieselOil.remark : '',
            dieselOil: overuseDieselOil && overuseDieselOil.exceed_oil_quantity ? `${overuseDieselOil.exceed_oil_quantity}` : '',
            forfeit: overuseDieselOil && overuseDieselOil.exceed_oil_money ? `${overuseDieselOil.exceed_oil_money}` : '',
            task: overuseDieselOil && overuseDieselOil.id ? {
                id: overuseDieselOil.dp_route_task_id,
                value: overuseDieselOil.dp_route_task_id,
                item: {
                    drive_name: overuseDieselOil.drive_name,
                    truck_num: overuseDieselOil.truck_num,
                }
            } : null
        },
        overuseDieselOil,
        modifyOveruseDieselOilFormValues: getFormValues('modifyOveruseDieselOilForm')(state)
    }
}


const mapDispatchToProps = (dispatch) => ({
    createOveruseDieselOil: (param) => {
        dispatch(actions.createOveruseDieselOil.createOveruseDieselOil(param))

    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'modifyOveruseDieselOilForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmit')
        const { initParam: { overuseDieselOilId } } = props
        dispatch(actions.overuseDieselOilEditor.modifyOveruseDieselOil({ overuseDieselOilId, values }))
    }
})(OveruseDieselOilEditor))