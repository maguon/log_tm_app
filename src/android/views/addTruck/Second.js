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
    resetUnBindDriver,
    bindViceDriver,
    resetBindViceDriver,
    unBindViceDriver,
    resetUnBindViceDriver
} from '../../../actions/AddTruckSecondAction'
import globalStyles, { styleColor } from '../../GlobalStyles'

class Second extends Component {
    constructor(props) {
        super(props)
        this.onSelectTruck = this.onSelectTruck.bind(this)
        this.onSelectDriver = this.onSelectDriver.bind(this)
        this.onPressUnBindTruck = this.onPressUnBindTruck.bind(this)
        this.onPressUnBindDriver = this.onPressUnBindDriver.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
        this.onSelectViceDriver = this.onSelectViceDriver.bind(this)
        this.onPressUnBindViceDriver = this.onPressUnBindViceDriver.bind(this)
    }


    onSelectTruck(param) {
        if (this.props.initParam.type == 1) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.loginReducer.data.user.uid,
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
                    userId: this.props.loginReducer.data.user.uid,
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
                    userId: this.props.loginReducer.data.user.uid,
                    truckId: this.props.initParam.truckId,
                    trailId: this.props.addTruckSecondReducer.data.bindTrailerId
                }
            })
        } else if (this.props.initParam.type == 2) {
            this.props.unBindTruck({
                requiredParam: {
                    userId: this.props.loginReducer.data.user.uid,
                    truckId: this.props.addTruckSecondReducer.data.bindTractorId,
                    trailId: this.props.initParam.truckId
                }
            })
        }
    }

    onSelectDriver(param) {
        this.props.bindDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId,
                driverId: param.id
            },
            driver: param.value,
            driverId: param.id
        })
    }

    onSelectViceDriver(param) {
        this.props.bindViceDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId,
                viceDriverId: param.id
            },
            viceDriver: param.value,
            viceDriverId: param.id
        })
    }

    onPressUnBindViceDriver() {
        this.props.unBindViceDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId,
                viceDriverId: this.props.addTruckSecondReducer.data.bindViceDriverId
            }
        })
    }

    onPressUnBindDriver() {
        this.props.unBindDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId,
                driverId: this.props.addTruckSecondReducer.data.bindDriverId
            }
        })
    }

    onPressNextStep() {
        Actions.addTruckThird({ initParam: this.props.initParam })
    }

    componentWillReceiveProps(nextProps) {
        const { bindTruck, unBindTruck, bindDriver, unBindDriver, bindViceDriver, unBindViceDriver, data } = nextProps.addTruckSecondReducer
        /*bindTruck*/
        if (bindTruck.isExecStatus == 2) {
            if (bindTruck.isResultStatus == 0) {
                ToastAndroid.showWithGravity('绑定成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 1) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`绑定失败，${bindTruck.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)               
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 3) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
        }
        /************************************ */

        /*unBindTruck*/
        if (unBindTruck.isExecStatus == 2) {
            if (unBindTruck.isResultStatus == 0) {
                ToastAndroid.showWithGravity('解绑成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 1) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`解绑失败，${unBindTruck.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 3) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
        }
        /************************************ */

        /*bindDriver*/
        if (bindDriver.isExecStatus == 2) {
            if (bindDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('绑定成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`绑定失败，${bindDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER) 
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindDriver()
            }
        }
        /************************************ */

        /*unBindDriver*/
        if (unBindDriver.isExecStatus == 2) {
            if (unBindDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('解绑定成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`解绑失败，${unBindDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER) 
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindDriver()
            }
        }
        /************************************ */

        /*bindViceDriver*/ //完成
        if (bindViceDriver.isExecStatus == 2) {
            if (bindViceDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('绑定成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
            else if (bindViceDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
            else if (bindViceDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`绑定失败，${bindViceDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
            else if (bindViceDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
        }
        /************************************ */

        /*unBindViceDriver*/ //完成
        if (unBindViceDriver.isExecStatus == 2) {
            if (unBindViceDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('解绑成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
            else if (unBindViceDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
            else if (unBindViceDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`解绑失败，${unBindViceDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
            else if (unBindViceDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
        }
        /************************************ */
    }

    render() {
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
                        showList={(param) => RouterDirection.selectTruck(this.props.parent)({ initParam: { type: 2 }, ...param })}
                        onValueChange={(param) => this.onSelectTruck(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 1 && !!this.props.addTruckSecondReducer.data.bindTrailerId &&
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联挂车：{this.props.addTruckSecondReducer.data.bindTrailer}</Text></View>
                            <TouchableNativeFeedback onPress={this.onPressUnBindTruck} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>}
                    {this.props.initParam.type == 2 && !this.props.addTruckSecondReducer.data.bindTractorId && <Select
                        title='关联车头：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindTractor}
                        showList={(param) => RouterDirection.selectTruck(this.props.parent)({ initParam: { type: 1 }, ...param })}
                        onValueChange={(param) => this.onSelectTruck(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 2 && !!this.props.addTruckSecondReducer.data.bindTractorId &&
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联车头：{this.props.addTruckSecondReducer.data.bindTractor}</Text></View>
                            <TouchableNativeFeedback onPress={this.onPressUnBindTruck} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>}
                    {this.props.initParam.type == 1 && !this.props.addTruckSecondReducer.data.bindDriverId && <Select
                        title='关联主驾：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindDriver}
                        showList={RouterDirection.selectDriver(this.props.parent)}
                        onValueChange={(param) => this.onSelectDriver(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 1 && !!this.props.addTruckSecondReducer.data.bindDriverId && <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联主驾：{this.props.addTruckSecondReducer.data.bindDriver}</Text></View>
                        <TouchableNativeFeedback onPress={this.onPressUnBindDriver} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>}


                    {this.props.initParam.type == 1 && !this.props.addTruckSecondReducer.data.bindViceDriverId && <Select
                        title='关联副驾：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindViceDriver}
                        showList={RouterDirection.selectDriver(this.props.parent)}
                        onValueChange={(param) => this.onSelectViceDriver(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 1 && !!this.props.addTruckSecondReducer.data.bindViceDriverId && <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联副驾：{this.props.addTruckSecondReducer.data.bindViceDriver}</Text></View>
                        <TouchableNativeFeedback onPress={this.onPressUnBindViceDriver} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>}


                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.onPressNextStep}
                            style={{ backgroundColor: styleColor }}>
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
        loginReducer: state.loginReducer,
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
    },
    bindViceDriver: (param) => {
        dispatch(bindViceDriver(param))
    },
    resetBindViceDriver: () => {
        dispatch(resetBindViceDriver())
    },
    unBindViceDriver: (param) => {
        dispatch(unBindViceDriver(param))
    },
    resetUnBindViceDriver: () => {
        dispatch(resetUnBindViceDriver())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Second)