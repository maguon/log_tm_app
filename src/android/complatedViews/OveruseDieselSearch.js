import React from 'react'
import { Container, Content, Button } from 'native-base'
import { Text, InteractionManager } from 'react-native'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { CheckBox, Select } from '../complatedComponents/form'
import * as actions from '../../actions'
import globalStyles from '../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

const OveruseDieselSearch = props => {
    const { handleSubmit, getDriverOptionalListWaiting, getDriverOptionalList, overuseDieselSearchFormValues, cleanSelected } = props
    console.log('props', props)
    return (
        <Container>
            <Content>
                <Field
                    label='结算状态'
                    name='statStatus'
                    listTitle='结算状态'
                    itemList={[{ id: 1, value: '未扣' }, { id: 2, value: '已扣' }]}
                    component={CheckBox} />
                <Field name='driver' label='司机' component={Select}
                    onPress={({ onChange }) => {
                        getDriverOptionalListWaiting()
                        Actions.driverOptionalList({
                            onSelect: (param) => {
                                const { id, drive_name } = param
                                onChange({ id, value: drive_name, item: param })
                            },
                            cleanSelected,
                            selectedItem: overuseDieselSearchFormValues && overuseDieselSearchFormValues.driver ? overuseDieselSearchFormValues.driver : null
                        })
                        InteractionManager.runAfterInteractions(getDriverOptionalList)
                    }}
                />
                <Button full style={[globalStyles.styleBackgroundColor, { margin: 15 }]} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { overuseDieselOilListReducer: { data: { search } } } = state
    return {
        initialValues: search,
        overuseDieselSearchFormValues: getFormValues('overuseDieselSearchForm')(state)
    }
}


const mapDispatchToProps = (dispatch) => ({
    getDriverOptionalList: () => {
        dispatch(actions.driverOptionalList.getDriverOptionalList())
    },
    getDriverOptionalListWaiting: () => {
        dispatch(actions.driverOptionalList.getDriverOptionalListWaiting())
    },
    cleanSelected: () => {
        dispatch(change('overuseDieselSearchForm', 'driver', null))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'overuseDieselSearchForm',
    onSubmit: (values, dispatch) => {
        dispatch(actions.overuseDieselOilList.getOveruseDieselOilListWaiting())
        Actions.pop()
        InteractionManager.runAfterInteractions(() => dispatch(actions.overuseDieselOilList.getOveruseDieselOilList(values)))
    }
})(OveruseDieselSearch))