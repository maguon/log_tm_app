import React from 'react'
import { View, Text, FlatList, InteractionManager } from 'react-native'
import { Container, Content, ListItem, Body, Card, CardItem, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { Select, RichTextBox, DatePicker, TimePicker, CheckBox, TextBox } from '../../complatedComponents/form'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import { requiredObj, required, money } from '../../../util/Validator'
import * as actions from '../../../actions'

const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')
const requiredMoney = required('您输入的不是数字')

const AccidentRepairFinish = props => {
    const { handleSubmit, getRepairStationOptionalList, getRepairStationOptionalListWaiting, cleanSelected, formValues } = props
    console.log('props', props)
    return (
        <Container>
            <Content>
                <Field name='repairStation' label='维修站' component={Select} isRequired={true}
                    validate={[requiredObjValidator]}
                    onPress={({ onChange }) => {
                        getRepairStationOptionalListWaiting()
                        Actions.repairStationOptionalList({
                            onSelect: (param) => {
                                const { id, repair_station_name } = param
                                onChange({ id, value: repair_station_name, item: param })
                            },
                            cleanSelected: () => cleanSelected('repairStation'),
                            selectedItem: formValues && formValues.repairStation ? formValues.repairStation : null
                        })
                        InteractionManager.runAfterInteractions(getRepairStationOptionalList)
                    }}
                />
                <Field name='repairMoney' isRequired={true} label='维修金额' validate={[requiredValidator, requiredMoney]} component={TextBox} />
                <Field name='remark' label='维修描述' component={RichTextBox} />
                <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>结束维修</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        //createAccidentReducer: state.createAccidentReducer,
        formValues: getFormValues('accidentRepairFinishForm')(state),
        initialValues: {
            repairMoney: `0`
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRepairStationOptionalList: () => {
        dispatch(actions.repairStationOptionalList.getRepairStationOptionalList())
    },
    getRepairStationOptionalListWaiting: () => {
        dispatch(actions.repairStationOptionalList.getRepairStationOptionalListWaiting())
    },
    cleanSelected: fieldName => {
        dispatch(change('accidentRepairFinishForm', fieldName, null))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'accidentRepairFinishForm',
    onSubmit: (values, dispatch, props) => {
        console.log('onSubmitprops',props)
        console.log('onSubmitvalues',values)
        dispatch(actions.accidentRepairFinish.finishAccidentRepair({
            repairId: props.accidentRepair.id,
            accidentId: props.accidentRepair.accident_id,
            ...values
        }))
    }
})(AccidentRepairFinish))