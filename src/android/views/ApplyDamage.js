import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon } from 'native-base'
import globalStyles, { textColor } from '../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import { required } from '../../util/Validator'
import * as routerDirection from '../../util/RouterDirection'
import * as selectDriverAction from '../../actions/SelectDriverAction'
import * as applyDamageSubmitAction from '../components/applyDamage/submit/ApplyDamageSubmitAction'
import * as selectCarAction from '../../actions/selectCarAction'
import Select from '../components/share/form/Select'
import DisposableList from './select/DisposableList'
import RichTextBox from '../components/share/form/RichTextBox'

const validateRequired = required('必选')

const ApplyDamage = props => {
    const { getSelectDriverList, getSelectDriverListWaiting, parent, cleanCarList } = props
    return (
        <Container>
            <Content>
                <Field
                    textStyle={[globalStyles.largeText, globalStyles.styleColor]}
                    label='vin：'
                    isRequired={true}
                    name='car'
                    component={Select}
                    getList={() => { }}
                    validate={[validateRequired]}
                    getListWaiting={() => { }}
                    showList={({ onSelect }) => {
                        return Actions.listCennectDynamic({
                            mapStateToProps: vinMapStateToProps,
                            mapDispatchToProps: vinMapDispatchToProps,
                            List: DisposableList,
                            onSelect: (value) => {
                                Actions.pop()
                                onSelect(value)
                                cleanCarList()
                            }
                        })
                    }} />
                <Field
                    label='货车司机：'
                    name='driver'
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
                <Field label='质损描述：' name='damageExplain' component={RichTextBox} />
            </Content>
        </Container >
    )
}


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
    }
})

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

const vinMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCarReducer.getCarList,
            //MoreAction: state.selectCarReducer.getCarListMore,
            data: {
                list: state.selectCarReducer.data.carList.map(item => {
                    return {
                        id: item.id,
                        value: item.vin,
                        make_name: item.make_name,
                        en_short_name: item.en_short_name,
                        re_short_name: item.re_short_name
                    }
                })
            }
        }
    }
}

const vinMapDispatchToProps = (dispatch) => ({
    // getListMore: () => {
    //     dispatch(selectCarAction.getCarListMore())
    // }
})

const mapStateToProps = (state) => {
    return {
        applyDamageReducer: state.applyDamageReducer,
        initialValues: { driver: {} }
        // selectDriverValues: getFormValues('applyDamage')(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getSelectDriverList: () => {
        dispatch(selectDriverAction.getDriverList())
    },
    getSelectDriverListWaiting: () => {
        dispatch(selectDriverAction.getDriverListWaiting())
    },
    cleanCarList: () => {
        dispatch(selectCarAction.cleanCarList())
    },
    onSubmit: () => {
        const { parent } = ownProps
        dispatch(applyDamageSubmitAction.createDamage(parent))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'applyDamage'
    })(ApplyDamage)
)
