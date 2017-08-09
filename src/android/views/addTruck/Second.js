import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import Select from '../../components/form/Select'
import { connect } from 'react-redux'
import * as RouterDirection from '../../../util/RouterDirection'
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
    }

    static defaultProps = {
        initParam: {
            truckId: 172,
            type: 1
        }
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
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.initParam.truckId,
                    trailId: this.props.addTruckSecondReducer.data.bindTrailerId
                }
            })
        } else if (this.props.initParam.type == 2) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.addTruckSecondReducer.data.bindTractorId,
                    trailId: this.props.initParam.truckId
                }
            })
        }
    }

    onSelectDriver(param) {
        //console.log(param)
        this.props.bindTruck({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.initParam.truckId,
                driveId: param.id
            },
            bindDriver: param.value
        })
    }

    onPressUnBindDriver() {
        this.props.unBindTruck({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.initParam.truckId,
                driveId: this.props.addTruckSecondReducer.data.bindDriverId
            }
        })
    }


    componentWillReceiveProps(nextProps) {
        const { bindTruck, unBindTruck, bindDriver, unBindDriver, data } = nextProps.addTruckSecondReducer
        /*bindTruck*/
        if (bindTruck.isExecStatus == 2) {
            if (bindTruck.isResultStatus == 0) {
                console.log('bindTruck', '执行成功')
            }
            else if (bindTruck.isResultStatus == 1) {
                console.log('bindTruck', '异常')
            }
            else if (bindTruck.isResultStatus == 2) {
                console.log('bindTruck', '执行失败')
            }
            else if (bindTruck.isResultStatus == 3) {
                console.log('bindTruck', '服务器异常')
            }
        }
        /************************************ */

        /*unBindTruck*/
        if (unBindTruck.isExecStatus == 2) {
            if (unBindTruck.isResultStatus == 0) {
                console.log('unBindTruck', '执行成功')
            }
            else if (unBindTruck.isResultStatus == 1) {
                console.log('unBindTruck', '异常')
            }
            else if (unBindTruck.isResultStatus == 2) {
                console.log('unBindTruck', '执行失败')
            }
            else if (unBindTruck.isResultStatus == 3) {
                console.log('unBindTruck', '服务器异常')
            }
        }
        /************************************ */

        /*bindDriver*/
        if (bindDriver.isExecStatus == 2) {
            if (bindDriver.isResultStatus == 0) {
                console.log('bindDriver', '执行成功')
            }
            else if (bindDriver.isResultStatus == 1) {
                console.log('bindDriver', '异常')
            }
            else if (bindDriver.isResultStatus == 2) {
                console.log('bindDriver', '执行失败')
            }
            else if (bindDriver.isResultStatus == 3) {
                console.log('bindDriver', '服务器异常')
            }
        }
        /************************************ */

        /*unBindDriver*/
        if (unBindDriver.isExecStatus == 2) {
            if (unBindDriver.isResultStatus == 0) {
                console.log('unBindDriver', '执行成功')
            }
            else if (unBindDriver.isResultStatus == 1) {
                console.log('unBindDriver', '异常')
            }
            else if (unBindDriver.isResultStatus == 2) {
                console.log('unBindDriver', '执行失败')
            }
            else if (unBindDriver.isResultStatus == 3) {
                console.log('unBindDriver', '服务器异常')
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
                        showList={RouterDirection.selectTruck(this.props.parent)}
                        onValueChange={(param) => this.onSelectTruck(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 2 && !this.props.addTruckSecondReducer.data.bindTractorId && <Select
                        title='关联车头：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindTractor}
                        showList={RouterDirection.selectTruck(this.props.parent)}
                        onValueChange={(param) => this.onSelectTruck(param)}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 1 && !this.props.addTruckSecondReducer.data.bindDriverId && <Select
                        title='关联司机：'
                        isRequire={false}
                        value={this.props.addTruckSecondReducer.data.bindDriver}
                        showList={RouterDirection.selectDriver(this.props.parent)}
                        onValueChange={(param) => this.onSelectDriver(param)}
                        //onRequire={(flag) => this.setState({ companyIdValidater: flag })}
                        defaultValue={'请选择'}
                    />}
                    {this.props.initParam.type == 1 && !!this.props.addTruckSecondReducer.data.bindTrailerId &&
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联挂车：辽B12345</Text></View>
                            <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                            </View>
                        </View>}
                    {this.props.initParam.type == 2 && !!this.props.addTruckSecondReducer.data.bindTractorId &&
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联挂车：辽B12345</Text></View>
                            <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                            </View>
                        </View>}
                    {this.props.initParam.type == 1 && !!this.props.addTruckSecondReducer.data.bindDriverId && <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联司机：张宝全</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>}
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