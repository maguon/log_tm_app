import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native'
import * as RouterDirection from '../../util/RouterDirection'
import { Button, Container, Content, Item } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../GlobalStyles'
import TextBox from '../components/share/form/TextBox'
import Select from '../components/share/form/Select'
import RichTextBox from '../components/share/form/RichTextBox'
import { reduxForm, Field } from 'redux-form'
import { required, requiredObj, money } from '../../util/Validator'
import * as finishRepairAction from '../../actions/FinishRepairAction'
import * as selectRepairStationAction from '../../actions/selectRepairStationAction'
import DisposableList from './select/DisposableList'
import { connect } from 'react-redux'


const { width } = Dimensions.get('window')
const margin = 15
const validateRequired = required('必选')
const validateRequiredObj = requiredObj('必选')
const validateMoney = money('必须是数字，只保留2位小数')

const UnitTextBox = props => {
    const { input: { onChange, ...restProps },
        label = '',
        last = false,
        secureTextEntry = false,
        placeholder = '',
        isRequired = false,
        unit = '',
        meta: { error, touched } } = props
    return (
        <View style={styles.body} >
            <View style={styles.inputContainer} >
                <Text style={[globalStyles.midText, styles.label]}>{isRequired && <Text style={[globalStyles.midText, styles.warnColor]}>*</Text>}{label}</Text>
                <TextInput
                    placeholderTextColor='#ccc'
                    placeholder={placeholder}
                    style={[globalStyles.midText, styles.input]}
                    underlineColorAndroid='transparent'
                    onChangeText={onChange}
                    {...restProps}
                />
                <Text style={[globalStyles.midText, styles.label]}>{unit}</Text>
            </View>
            {touched && (error && <View style={styles.errView}>
                <Text style={[globalStyles.smallText, styles.warnColor]}>{`*${error}`}</Text>
            </View>)}
        </View>
    )
}


const FinishRepair = props => {
    const { handleSubmit, getRepairStationList, getRepairStationListWaiting, parent } = props
    return (
        <Container>
            <Content>
                <Field
                    label='维修站：'
                    name='repairStation'
                    isRequired={true}
                    validate={[validateRequiredObj]}
                    component={Select}
                    getList={getRepairStationList}
                    getListWaiting={getRepairStationListWaiting}
                    showList={({ onSelect }) => {
                        return RouterDirection.listCennectNav(parent)({
                            mapStateToProps: repairStationMapStateToProps,
                            mapDispatchToProps: repairStationMapDispatchToProps,
                            List: DisposableList,
                            title: '维修站',
                            onSelect: (value) => {
                                onSelect(value)
                                Actions.pop()
                            }
                        })
                    }} />
                <Field label='维修金额：'
                    name='repairMoney'
                    isRequired={true}
                    placeholder='请输入金额'
                    unit='元'
                    validate={[validateRequired, validateMoney]}
                    component={UnitTextBox} />
                <Field
                    label='质损描述：'
                    name='remark'
                    component={RichTextBox} />
                <View style={{ padding: 15 }}>
                    <Button full onPress={handleSubmit} style={{ backgroundColor: styleColor }}>
                        <Text style={{ color: '#fff' }}>保存信息</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}


const repairStationMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectRepairStationReducer.getRepairStationList,
            data: {
                list: state.selectRepairStationReducer.data.repairStationList.map(item => {
                    return { id: item.id, value: item.repair_station_name }
                })
            }
        }
    }
}

const repairStationMapDispatchToProps = (dispatch) => ({

})



const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRepairStationList: () => {
        dispatch(selectRepairStationAction.getRepairStationList())
    },
    getRepairStationListWaiting: () => {
        dispatch(selectRepairStationAction.getRepairStationListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'completeRepairForm',
    onSubmit: (values, dispatch, props) => {
        const { repairId, truckId } = props
        dispatch(finishRepairAction.finishRepair({ ...values, repairId, truckId }))
    }
})(FinishRepair))


const styles = StyleSheet.create({
    body: {
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        marginLeft: margin,
        paddingRight: margin
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: margin
    },
    input: {
        textAlignVertical: 'center',
        flex: 1,
        padding: 0,
        includeFontPadding: false
    },
    label: {
        //marginVertical: margin
    },
    labelError: {
        marginTop: margin,
        marginBottom: 5
    },
    warnColor: {
        color: 'red'
    },
    errView: {
        marginBottom: margin
    }
})