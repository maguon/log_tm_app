import React from 'react'
import { Container, Content, Button } from 'native-base'
import { Text, InteractionManager } from 'react-native'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { CheckBox, Select } from '../complatedComponents/form'
import * as actions from '../../actions'
import globalStyles from '../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

const PeccancySearch = props => {
    const { handleSubmit, getDriverOptionalListWaiting, getDriverOptionalList, peccancySearchFormValues, cleanSelected } = props
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
                            selectedItem: peccancySearchFormValues && peccancySearchFormValues.driver ? peccancySearchFormValues.driver : null
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
    const { peccancyListReducer: { data: { search } } } = state
    return {
        initialValues: search,
        peccancySearchFormValues: getFormValues('peccancySearchForm')(state)
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
        dispatch(change('peccancySearchForm', 'driver', null))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'peccancySearchForm',
    onSubmit: (values, dispatch) => {
        dispatch(actions.peccancyList.getPeccancyListWaiting())
        Actions.pop()
        InteractionManager.runAfterInteractions(() => dispatch(actions.peccancyList.getPeccancyList(values)))
    }
})(PeccancySearch))