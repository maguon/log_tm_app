import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import * as routerDirection from '../../../../util/RouterDirection'
import { Container, Content, Input, Label, Icon, Button } from 'native-base'
import globalStyles, { textColor, styleColor } from '../../../GlobalStyles'
import * as selectDriverAction from '../../../../actions/SelectDriverAction'
import * as demageEditorAction from './DemageEditorAction'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import Select from '../../../components/share/form/Select'
import DisposableList from '../../../views/select/DisposableList'
import RichTextBox from '../../../components/share/form/RichTextBox'

const DemageEditor = props => {
    const { getSelectDriverList,
        getSelectDriverListWaiting,
        updateDamage,
        demageEditorReducer: { updateDamage: { isResultStatus } },
        parent,
        initParam: { id, created_on, car_id, vin, damage_status } } = props
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <View style={[styles.item, styles.header]}>
                    <View style={styles.headerItem}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>质损编号：{id ? `${id}` : ''}</Text>
                        <Text style={globalStyles.smallText}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                    <View style={styles.headerStatusItem}>
                        <Text style={[globalStyles.midText]}>{damage_status == 2 && '处理中'}{damage_status == 1 && '待处理'}</Text>
                    </View>
                </View>
                <Field
                    label='货车司机：'
                    name='selectDriver'
                    component={Select}
                    getList={getSelectDriverList}
                    getListWaiting={getSelectDriverListWaiting}
                    showList={({ onSelect }) => {
                        return Actions.listCennectAtSettingBlock({
                            mapStateToProps: driverMapStateToProps,
                            mapDispatchToProps: driverMapDispatchToProps,
                            List: DisposableList,
                            onSelect: (value) => {
                                Actions.pop()
                                onSelect(value)
                            }
                        })
                    }} />
                <Field label='质损描述：' name='damageRemark' component={RichTextBox} />
                <View style={{ margin: 15 }}>
                    {isResultStatus != 1 && <Button full
                        style={[globalStyles.styleBackgroundColor]}
                        onPress={() => updateDamage({
                            damageId: id,
                            carId: car_id,
                            vin
                        })}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>修改</Text>
                    </Button>}
                    {isResultStatus == 1 && <ActivityIndicator color={styleColor} size='large' />}
                </View>
            </Content>
        </Container>
    )
}

const driverMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectDriverReducer.getDriverList,
            data: {
                list: state.selectDriverReducer.data.driverList.map(item => {
                    return { id: item.id, value: item.drive_name, truck_id: item.truck_id, truck_num: item.truck_num }
                })
            }
        },
        filter: getFormValues('SearchForm')(state) ? getFormValues('SearchForm')(state).searchField : undefined
    }
}

const driverMapDispatchToProps = (dispatch) => ({

})

const styles = StyleSheet.create({
    item: {
        margin: 15
    },
    label: {
        marginVertical: 15
    },
    itemSelectContainer: {
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingBottom: 15
    },
    itemSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.3,
        borderColor: '#777'
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    header: {
        paddingVertical: 5,
        borderBottomWidth: 0.3,
        borderColor: '#777'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    }
})

const mapStateToProps = (state, ownProps) => {
    const { initParam: { damage_explain, drive_name, drive_id, truck_id, truck_num } } = ownProps
    return {
        initialValues: {
            damageRemark: damage_explain,
            selectDriver: {
                id: drive_id,
                value: drive_name,
                truck_id,
                truck_num
            }
        },
        demageEditorReducer: state.demageEditorReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSelectDriverList: () => {
        dispatch(selectDriverAction.getDriverList())
    },
    getSelectDriverListWaiting: () => {
        dispatch(selectDriverAction.getDriverListWaiting())
    },
    updateDamage: (param) => {
        dispatch(demageEditorAction.updateDamage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'demageEditorForm',
    //validate
})(DemageEditor))
