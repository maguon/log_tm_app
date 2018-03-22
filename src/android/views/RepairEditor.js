import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Button, Icon } from 'native-base'
import globalStyles from '../GlobalStyles'
import moment from 'moment'
import CheckBox from '../components/share/form/CheckBox'
import RichTextBox from '../components/share/form/RichTextBox'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import * as repairEditorAction from '../../actions/RepairEditorAction'
import { required, requiredObj } from '../../util/Validator'
import * as routerDirection from '../../util/RouterDirection'

const { width } = Dimensions.get('window')
const margin = 15
const padding = 15
const validateRequired = required('必选')
const validateRequiredObj = requiredObj('必选')

const SelectAccident = props => {
    let {
        input: { onChange, value, ...restProps },
        label = '',
        last = false,
        secureTextEntry = false,
        isRequired = false,
        truckId,
        meta: { error, touched },
        parent
    } = props
    return (
        <TouchableOpacity style={styles.body} onPress={() =>routerDirection.selectAccident(parent)({ onSelect: onChange, truckId })}>
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <View style={{ width: width - margin * 2 - 20 }} >
                        <Text style={[globalStyles.midText]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}{value.id}</Text>
                        {value.id && <Text style={[globalStyles.midText]} >{value.value}</Text>}
                    </View>
                    <View>
                        <Icon name='ios-arrow-forward-outline' color='#777' fontSize={15} style={{ fontSize: 18, color: '#777' }} />
                    </View>
                </View>
            </View>
            {touched && (error && <View style={styles.errView}>
                <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
            </View>)}
        </TouchableOpacity>
    )
}


const RepairEditor = props => {
    const { repairInfo: { id, repair_date, truck_id }, handleSubmit, formValue, parent } = props
    return (
        <Container>
            <Content>
                <View style={{ padding: padding, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text allowFontScaling={false} style={globalStyles.styleColor}>维修编号：{id ? `${id}` : ''}</Text>
                        <Text allowFontScaling={false} style={globalStyles.styleColor}>正在维修</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10 }}>
                        <Text allowFontScaling={false} style={{ fontSize: 12 }}>{repair_date ? `${moment(repair_date).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    </View>
                </View>
                <Field
                    label='维修类型：'
                    name='repair_type'
                    listTitle='维修类型'
                    validate={[validateRequired]}
                    itemList={[{ id: 1, value: '事故维修' }, { id: 2, value: '非事故维修' }]}
                    component={CheckBox} />
                {formValue && formValue.repair_type.id == 1 && <Field
                    label='事故编号：'
                    name='accident'
                    isRequired={true}
                    validate={[validateRequiredObj]}
                    component={SelectAccident}
                    truckId={truck_id}
                    parent={parent}
                />}
                <Field label='质损描述：' name='repair_reason' component={RichTextBox} />
                <View style={{ flexDirection: 'row', padding: padding }}>
                    <Button full onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { flex: 1 }]}>
                        <Text allowFontScaling={false} style={{ color: '#fff' }}>保存</Text>
                    </Button>
                    <Button full onPress={() => routerDirection.finishRepair(parent)({ repairId: id, truckId: truck_id })} style={{ backgroundColor: '#00cade', flex: 1, marginLeft: 15 }}>
                        <Text allowFontScaling={false} style={{ color: '#fff' }}>维修结束</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    const { repairInfo: { repair_reason, accident_id, accident_address, repair_type, id, truck_id } } = ownProps
    return {
        initialValues: {
            accident: { id: accident_id, value: accident_address },
            repair_reason,
            repair_type: { id: repair_type, value: repair_type == 1 ? '事故维修' : '非事故维修' },
            id,
            truck_id
        },
        formValue: getFormValues('repairEditorForm')(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'repairEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(repairEditorAction.modifyRepairInfo(values))
    }
})(RepairEditor))



const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
    },
    errView: {
        marginTop: margin
    }
})


