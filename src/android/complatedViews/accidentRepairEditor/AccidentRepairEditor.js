import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Container, Content, ListItem, Body, Card, CardItem, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { Select, RichTextBox, DatePicker, TimePicker, CheckBox, TextBox } from '../../complatedComponents/form'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import * as actions from '../../../actions'
import moment from 'moment'

const AccidentRepairEditor = props => {
    const { handleSubmit, accidentRepair } = props
    console.log('props', props)
    return (
        <Container>
            <Content>
                <View last style={{ backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'column', padding: 7.5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>维修编号：{accidentRepair.id ? `${accidentRepair.id}` : ''}</Text>
                        <Text style={[globalStyles.midText, { color: 'red' }]}>维修中</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', padding: 7.5 }}>
                        <Text style={[globalStyles.smallText]}>{accidentRepair.repair_date ? `${moment(accidentRepair.repair_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                </View>
                <Field name='repairReason' label='维修原因' component={RichTextBox} />
                <View style={{ flexDirection: 'row', margin: 7.5, justifyContent: 'space-between' }}>
                    <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 7.5, flex: 1 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>保存修改</Text>
                    </Button>
                    <Button full onPress={() => Actions.accidentRepairFinish({accidentRepair})} style={{ margin: 7.5, flex: 1, backgroundColor: '#00cade' }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>维修结束</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {
            repairReason: ownProps.accidentRepair.repair_reason
        }
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'accidentRepairEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(actions.accidentRepairEditor.modifyAccidentRepair({
            repairId: props.accidentRepair.id,
            accidentId: props.accidentRepair.accident_id,
            repairType: props.accidentRepair.repair_type,
            ...values
        }))
    }
})(AccidentRepairEditor))
