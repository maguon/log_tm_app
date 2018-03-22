import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { Button, Container, Content, Icon } from 'native-base'
import globalStyles, { styleColor } from '../GlobalStyles'
import { reduxForm, Field, getFormValues } from 'redux-form'
import CheckBox from '../components/share/form/CheckBox'
import RichTextBox from '../components/share/form/RichTextBox'
import * as selectRepairStationAction from '../../actions/selectRepairStationAction'
import * as createRepairAction from '../../actions/CreateRepairAction'
import DisposableList from './select/DisposableList'
import { required, requiredObj } from '../../util/Validator'
import { connect } from 'react-redux'
import * as routerDirection from '../../util/RouterDirection'


const margin = 15
const validateRequired = required('必选')
const validateRequiredObj = requiredObj('必选')
const { width } = Dimensions.get('window')

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
        <TouchableOpacity style={styles.body} onPress={() => routerDirection.selectAccident(parent)({ onSelect: onChange, truckId })}>
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

const CreateRepair = props => {
    const { handleSubmit, formValue, truckId, parent } = props
    return (
        <Container>
            <Content>
                <Field
                    label='维修类型：'
                    name='repair_type'
                    listTitle='维修类型'
                    isRequired={true}
                    validate={[validateRequired]}
                    itemList={[{ id: 1, value: '事故维修' }, { id: 2, value: '非事故维修' }]}
                    component={CheckBox} />
                {formValue && formValue.repair_type.id == 1 && <Field
                    label='事故编号：'
                    name='accident'
                    isRequired={true}
                    validate={[validateRequiredObj]}
                    component={SelectAccident}
                    truckId={truckId}
                    parent={parent}
                />}
                <Field label='质损描述：' name='repair_reason' component={RichTextBox} />
                <View style={{ padding: 15 }}>
                    <Button full onPress={handleSubmit} style={{ backgroundColor: styleColor }}>
                        <Text style={{ color: '#fff' }}>保存信息</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        formValue: getFormValues('createRepairForm')(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

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


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createRepairForm',
    onSubmit: (values, dispatch, props) => {
        const { truckId } = props
        dispatch(createRepairAction.createRepair({ ...values, truckId }))
    }
})(CreateRepair))

