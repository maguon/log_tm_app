
import React from 'react'
import { InteractionManager } from 'react-native'
import { reduxForm, Field, change, getFormValues } from 'redux-form'
import { Container, Content } from 'native-base'
import { TextBox, CheckBox, Select, DatePicker } from '../complatedComponents/form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Actions } from 'react-native-router-flux'
import user_role from '../../util/user_role.json'

const AccidentSearch = props => {
    const { getUserOptionalList, getUserOptionalListWaiting, getDriverOptionalList, getDriverOptionalListWaiting, getTruckOptionalList,
        getTruckOptionalListWaiting, formValues, cleanSelected } = props
    const userRole = new Map(user_role)

    return (
        <Container>
            <Content>
                <Field name='accidentId' label='事故编号' component={TextBox} />
                <Field
                    label='处理状态'
                    name='accidentStatus'
                    listTitle='结算状态'
                    itemList={[{ id: 1, value: '待处理' }, { id: 2, value: '处理中' }, { id: 3, value: '已处理' }]}
                    component={CheckBox} />
                <Field
                    label='货车类型'
                    name='truckType'
                    listTitle='结算状态'
                    itemList={[{ id: 1, value: '车头' }, { id: 2, value: '挂车' }]}
                    component={CheckBox} />
                <Field name='truck' label='货车牌号' component={Select}
                    onPress={({ onChange }) => {
                        getTruckOptionalListWaiting()
                        Actions.truckOptionalList({
                            onSelect: (param) => {
                                const { id, truck_num } = param
                                onChange({ id, value: truck_num, item: param })
                            },
                            cleanSelected,
                            selectedItem: formValues && formValues.truck ? formValues.truck : null
                        })
                        InteractionManager.runAfterInteractions(getTruckOptionalList)
                    }}
                />
                <Field name='driver' label='司机' component={Select}
                    onPress={({ onChange }) => {
                        getDriverOptionalListWaiting()
                        Actions.driverOptionalList({
                            onSelect: (param) => {
                                const { id, drive_name } = param
                                onChange({ id, value: drive_name, item: param })
                            },
                            cleanSelected: () => cleanSelected('driver'),
                            selectedItem: formValues && formValues.driver ? formValues.driver : null
                        })
                        InteractionManager.runAfterInteractions(getDriverOptionalList)
                    }}
                />
                <Field name='dpTaskRouteId' label='调度编号' component={TextBox} />
                <Field name='underUser' label='责任人' component={Select}
                    onPress={({ onChange }) => {
                        getUserOptionalListWaiting()
                        Actions.userOptionalList({
                            onSelect: (param) => {
                                const { uid, real_name, type } = param
                                onChange({ id: uid, value: `${real_name}  (${userRole.get(type)})`, item: param })
                            },
                            cleanSelected: () => cleanSelected('underUser'),
                            selectedItem: formValues && formValues.underUser ? formValues.underUser : null
                        })
                        InteractionManager.runAfterInteractions(getUserOptionalList)
                    }}
                />
                <Field name='accidentDateStart' label='时间范围（始）' component={DatePicker} />
                <Field name='accidentDateEnd' label='时间范围（终）' component={DatePicker} />
            </Content>
        </Container>
    )
}


const mapStateToProps = (state) => {
    const { accidentListReducer: { data: { search } } } = state
    return {
        formValues: getFormValues('searchAccidentForm')(state),
        initialValues:search
    }
}


const mapDispatchToProps = (dispatch) => ({
    getUserOptionalList: () => {
        dispatch(actions.userOptionalList.getUserOptionalList())
    },
    getUserOptionalListWaiting: () => {
        dispatch(actions.userOptionalList.getUserOptionalListWaiting())
    },
    getDriverOptionalList: () => {
        dispatch(actions.driverOptionalList.getDriverOptionalList())
    },
    getDriverOptionalListWaiting: () => {
        dispatch(actions.driverOptionalList.getDriverOptionalListWaiting())
    },
    getTruckOptionalList: () => {
        dispatch(actions.truckOptionalList.getTruckOptionalList())
    },
    getTruckOptionalListWaiting: () => {
        dispatch(actions.truckOptionalList.getTruckOptionalListWaiting())
    },
    cleanSelected: fieldName => {
        dispatch(change('searchAccidentForm', fieldName, null))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchAccidentForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmitvalues', values)
        dispatch(actions.accidentList.getAccidentListWaiting())
        Actions.popTo('accidentList')
        InteractionManager.runAfterInteractions(()=>dispatch(actions.accidentList.getAccidentList(values)))   
    }
})(AccidentSearch))
