import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import Select from '../../components/form/Select'
import { connect } from 'react-redux'
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import {
    bindTruck,
    unBindTruck,
    bindDriver,
    unBindDriver,
    resetBindTruck,
    resetUnBindTruck,
    resetBindDriver,
    resetUnBindDriver
} from '../../../actions/AddTruckSecondAction'

class Second extends Component {
    constructor(props) {
        super(props)
        this.onSelectTruck = this.onSelectTruck.bind(this)
        this.onSelectDriver = this.onSelectDriver.bind(this)
        this.onPressUnBindTruck = this.onPressUnBindTruck.bind(this)
        this.onPressUnBindDriver = this.onPressUnBindDriver.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
    }


    onSelectTruck(param) {
        if (this.props.initParam.type == 1) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.initParam.truckId,
                    trailId: param.id
                },
                truckId: param.id,
                truck: param.value,
                type: this.props.initParam.type
            })
        } else if (this.props.initParam.type == 2) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: param.id,
                    trailId: this.props.initParam.truckId
                },
                truckId: param.id,
                truck: param.value,
                type: this.props.initParam.type
            })
        }
    }

    onPressUnBindTruck() {
        if (this.props.initParam.type == 1) {
            this.props.unBindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.initParam.truckId,
                    trailId: this.props.addTruckSecondReducer.data.bindTrailerId
                }
            })
        } else if (this.props.initParam.type == 2) {
            this.props.unBindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.addTruckSecondReducer.data.bindTractorId,
                    trailId: this.props.initParam.truckId
                }
            })
        }
    }

    onSelectDriver(param) {
        this.props.bindDriver({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.initParam.truckId,
                driverId: param.id
            },
            driver: param.value,
            driverId: param.id
        })
    }

    onPressUnBindDriver() {
        this.props.unBindDriver({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.initParam.truckId,
                driverId: this.props.addTruckSecondReducer.data.bindDriverId
            }
        })
    }

    onPressNextStep() {
        Actions.addTruckThird({ initParam: this.props.initParam })
    }

    componentWillReceiveProps(nextProps) {
        const { bindTruck, unBindTruck, bindDriver, unBindDriver, data } = nextProps.addTruckSecondReducer
        /*bindTruck*/
        if (bindTruck.isExecStatus == 2) {
            if (bindTruck.isResultStatus == 0) {
                ToastAndroid.show('绑定成功', ToastAndroid.SHORT)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 1) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 2) {
                ToastAndroid.show(bindTruck.failedMsg, ToastAndroid.SHORT)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 3) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)

                this.props.resetBindTruck()
            }
        }
        /************************************ */

        /*unBindTruck*/
        if (unBindTruck.isExecStatus == 2) {
            if (unBindTruck.isResultStatus == 0) {
                ToastAndroid.show('解绑成功', ToastAndroid.SHORT)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 1) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 2) {
                ToastAndroid.show(unBindTruck.failedMsg, ToastAndroid.SHORT)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 3) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)
                this.props.resetUnBindTruck()
            }
        }
        /************************************ */

        /*bindDriver*/
        if (bindDriver.isExecStatus == 2) {
            if (bindDriver.isResultStatus == 0) {
                ToastAndroid.show('绑定成功', ToastAndroid.SHORT)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 1) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 2) {
                ToastAndroid.show(bindDriver.failedMsg, ToastAndroid.SHORT)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 3) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)
                this.props.resetBindDriver()
            }
        }
        /************************************ */

        /*unBindDriver*/
        if (unBindDriver.isExecStatus == 2) {
            if (unBindDriver.isResultStatus == 0) {
                ToastAndroid.show('解绑定成功', ToastAndroid.SHORT)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 1) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 2) {
                ToastAndroid.show(unBindDriver.failedMsg, ToastAndroid.SHORT)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 3) {
                ToastAndroid.show('程序错误，请联系管理员', ToastAndroid.SHORT)
                this.props.resetUnBindDriver()
            }
        }
        /************************************ */
    }

    render() {
        // console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator
                    stepList={[{ step: '1', title: '基本信息' },
                    { step: '2', title: '关联信息' },
                    { step: '3', title: '上传照片' },
                    { step: '4', title: '车保信息' }]}
                    current={1} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.props.initParam.type == 1 && !this.props.addTruckSecondReducer.data.bindTrailerId && <Select
                        title='关联挂车：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindTrailer}
                        showList={RouterDirection.selectTruck(this.props.parent)}
                        onValueChange={(param) => this.onSelectTruck(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 1 && !!this.props.addTruckSecondReducer.data.bindTrailerId &&
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联挂车：{this.props.addTruckSecondReducer.data.bindTrailer}</Text></View>
                            <TouchableNativeFeedback onPress={this.onPressUnBindTruck} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>}
                    {this.props.initParam.type == 2 && !this.props.addTruckSecondReducer.data.bindTractorId && <Select
                        title='关联车头：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindTractor}
                        showList={RouterDirection.selectTruck(this.props.parent)}
                        onValueChange={(param) => this.onSelectTruck(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 2 && !!this.props.addTruckSecondReducer.data.bindTractorId &&
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联车头：{this.props.addTruckSecondReducer.data.bindTractor}</Text></View>
                            <TouchableNativeFeedback onPress={this.onPressUnBindTruck} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>}
                    {this.props.initParam.type == 1 && !this.props.addTruckSecondReducer.data.bindDriverId && <Select
                        title='关联司机：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindDriver}
                        showList={RouterDirection.selectDriver(this.props.parent)}
                        onValueChange={(param) => this.onSelectDriver(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 1 && !!this.props.addTruckSecondReducer.data.bindDriverId && <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联司机：{this.props.addTruckSecondReducer.data.bindDriver}</Text></View>
                        <TouchableNativeFeedback onPress={this.onPressUnBindDriver} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>}
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.onPressNextStep}
                            style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>下一步</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        addTruckSecondReducer: state.addTruckSecondReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    bindTruck: (param) => {
        dispatch(bindTruck(param))
    },
    unBindTruck: (param) => {
        dispatch(unBindTruck(param))
    },
    bindDriver: (param) => {
        dispatch(bindDriver(param))
    },
    unBindDriver: (param) => {
        dispatch(unBindDriver(param))
    },
    resetBindTruck: () => {
        dispatch(resetBindTruck())
    },
    resetUnBindTruck: () => {
        dispatch(resetUnBindTruck())
    },
    resetBindDriver: () => {
        dispatch(resetBindDriver())
    },
    resetUnBindDriver: () => {
        dispatch(resetUnBindDriver())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Second)