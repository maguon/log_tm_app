import React from 'react'
import { View, Text } from 'react-native'
import { Container, Content, ListItem, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { connect } from 'react-redux'
import { TextBox, Select, RichTextBox, DatePicker } from '../../complatedComponents/form'
import * as selectDriverAction from '../../../actions/SelectDriverAction'
import * as selectTruckAction from '../../../actions/SelectTruckAction'
import * as routerDirection from '../../../util/RouterDirection'
import { requiredObj, required, money } from '../../../util/Validator'
import moment from 'moment'
import { change, Field, reduxForm } from 'redux-form'
import * as actions from '../../../actions'

const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')
const moneyValidator = money('请输入数字')

const PeccancyEditor = props => {
    const { peccancy, handleSubmit } = props
    return (
        <Container>
            <Content>
                <ListItem last style={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderBottomWidth: 1 }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>违章结算编号：{peccancy.id ? `${peccancy.id}` : ''}</Text>
                    {peccancy.stat_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>未扣</Text>}
                    {peccancy.stat_status == 2 && <Text style={globalStyles.midText}>已扣</Text>}
                </ListItem>
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
                <Field name='score' isRequired={true} validate={[moneyValidator]} label='扣罚分数' component={TextBox} />
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

const mapStateToProps = (state, ownProps) => {
    const peccancy = state.peccancyListReducer.data.peccancyList.find(item => item.id == ownProps.initParam.peccancyId)
    console.log('peccancy', peccancy)
    return {
        initialValues: {
            score: peccancy && peccancy.fine_score ? `${peccancy.fine_score}` : '0',
            forfeit: peccancy && peccancy.fine_money ? `${peccancy.fine_money}` : '0',
            remark: peccancy && peccancy.remark ? peccancy.remark : '',
            dateStart: peccancy && peccancy.start_date ? moment(peccancy.start_date).format('YYYY-MM-DD') : '',
            endStart: peccancy && peccancy.end_date ? moment(peccancy.end_date).format('YYYY-MM-DD') : '',
            driver: peccancy && peccancy.drive_id && peccancy.drive_name ? { id: peccancy.drive_id, value: peccancy.drive_name } : null,
            truck: peccancy && peccancy.truck_id && peccancy.truck_num ? { id: peccancy.truck_id, value: peccancy.truck_num } : null
        },
        peccancy
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
    form: 'modifyPeccancyForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmit')
        console.log('onSubmitprops', props)
        const { initParam: { peccancyId } } = props
        dispatch(actions.peccancyEditor.modifyPeccancy({ peccancyId, values }))
    }
})(PeccancyEditor))

