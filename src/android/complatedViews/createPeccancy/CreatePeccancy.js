import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { Container, Content, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { reduxForm, Field, change } from 'redux-form'
import { TextBox, Select, RichTextBox, DatePicker } from '../../complatedComponents/form'
import * as selectDriverAction from '../../../actions/SelectDriverAction'
import * as selectTruckAction from '../../../actions/SelectTruckAction'
import * as routerDirection from '../../../util/RouterDirection'
import { requiredObj, required, money } from '../../../util/Validator'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')
const moneyValidator = money('请输入数字')

const CreatePeccancy = props => {
    const { handleSubmit, getDriverList, getDriverListWaiting, parent, changeTruck } = props
    return (
        <Container>
            <Content>
                <Field name='driver' label='司机' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        routerDirection.selectDriver(parent)({
                            onSelect: (param) => {
                                console.log('param', param)
                                if (param.item.truck_id && param.item.truck_num) {
                                    changeTruck(param.item)
                                } else {
                                    changeTruck({ truck_id: null, truck_numL: '' })
                                }
                                onChange({ id: param.id, value: param.value, item: param.item })
                            },
                            selectType: 'all'
                        })
                    }}
                />
                <Field name='truck' label='货车牌号' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        routerDirection.selectTruck(parent)({
                            onSelect: (param) => {
                                console.log('param', param)
                                onChange(param)
                            },
                            initParam: { type: 1 },
                            ifFilter: false
                        })
                    }}
                />
                {/* <Field name='truck' label='货车牌号' component={TextBox} /> */}
                <Field name='score' isRequired={true} label='扣罚分数' validate={[moneyValidator]} component={TextBox} />
                <Field name='forfeit' validate={[moneyValidator]} isRequired={true} label='罚款金额' component={TextBox} />
                <Field name='dateStart' validate={[requiredValidator]} isRequired={true} label='时间范围（始）' component={DatePicker} />
                <Field name='endStart' validate={[requiredValidator]} isRequired={true} label='时间范围（终）' component={DatePicker} />
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
        overuseDieselOilListReducer: state.overuseDieselOilListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverList: () => {
        dispatch(selectDriverAction.getDriverList())
    },
    getDriverListWaiting: () => {
        dispatch(selectDriverAction.getDriverListWaiting())
    },
    getTruckList: (param) => {
        dispatch(selectTruckAction.getTruckList(param))
    },
    changeTruck: (param) => {
        console.log('param', param)
        dispatch(change('createPeccancyForm', 'truck', { id: param.truck_id, value: param.truck_num }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createPeccancyForm',
    onSubmit: (values, dispatch, props) => {
        // console.log('onSubmit')
        dispatch(actions.createPeccancy.createPeccancy(values))
    }
})(CreatePeccancy))