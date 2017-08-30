import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableNativeFeedback,
    InteractionManager
} from 'react-native'
import { Button, Icon } from 'native-base'
import FontTag from '../../components/tag/FontTag'
import * as RouterDirection from '../../../util/RouterDirection'
import { connect } from 'react-redux'
import {
    getOperateTypeCount,
    getWaitingInspectCount,
    resetGetOperateTypeCount,
    resetGetWaitingInspectCount,
    resetGetTruckRepairRelCount,
    getTruckRepairRelCount,
    getDriverlicenseCount,
    resetGetDriverlicenseCount
} from '../../../actions/HomeAction'
import { Actions } from 'react-native-router-flux'

class Home extends Component {
    constructor(props) {
        super(props)
        this.renderTruckTypeItem = this.renderTruckTypeItem.bind(this)
        this.renderTruckStatusItem = this.renderTruckStatusItem.bind(this)
    }

    componentDidMount() {
        this.props.getOperateTypeCount({ OptionalParam: { truckType: 1 } })
        let now = Date.now()
        this.props.getWaitingInspectCount({
            OptionalParam: {
                drivingDateEnd: new Date(now + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
            }
        })
        this.props.getTruckRepairRelCount()
        this.props.getDriverlicenseCount({
            OptionalParam: {
                licenseDateEnd: new Date(now + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let { operateTypeCount, waitingInspectCount, getTruckRepairRelCount, getDriverlicenseCount } = nextProps.homeReducer

        /*operateTypeCount*/
        if (operateTypeCount.isExecStatus == 2) {
            if (operateTypeCount.isResultStatus == 0) {
                console.log('operateTypeCount执行成功')
                this.props.resetGetOperateTypeCount()
            }
            else if (operateTypeCount.isResultStatus == 1) {
                console.log('operateTypeCount异常')
                this.props.resetGetOperateTypeCount()
            }
            else if (operateTypeCount.isResultStatus == 2) {
                console.log('operateTypeCount执行失败')
                this.props.resetGetOperateTypeCount()
            }
            else if (operateTypeCount.isResultStatus == 3) {
                console.log('operateTypeCount服务器异常')
                this.props.resetGetOperateTypeCount()
            }
        }
        /************************************ */

        /*waitingInspectCount*/
        if (waitingInspectCount.isExecStatus == 2) {
            if (waitingInspectCount.isResultStatus == 0) {
                console.log('waitingInspectCount执行成功')
                this.props.resetGetWaitingInspectCount()
            }
            else if (waitingInspectCount.isResultStatus == 1) {
                console.log('waitingInspectCount异常')
                this.props.resetGetWaitingInspectCount()
            }
            else if (waitingInspectCount.isResultStatus == 2) {
                console.log('waitingInspectCount执行失败')
                this.props.resetGetWaitingInspectCount()
            }
            else if (waitingInspectCount.isResultStatus == 3) {
                console.log('waitingInspectCount服务器异常')
                this.props.resetGetWaitingInspectCount()
            }
        }
        /************************************ */

        /*getTruckRepairRelCount*/
        if (getTruckRepairRelCount.isExecStatus == 2) {
            if (getTruckRepairRelCount.isResultStatus == 0) {
                console.log('getTruckRepairRelCount执行成功')
                this.props.resetGetTruckRepairRelCount()
            }
            else if (getTruckRepairRelCount.isResultStatus == 1) {
                console.log('getTruckRepairRelCount异常')
                this.props.resetGetTruckRepairRelCount()
            }
            else if (getTruckRepairRelCount.isResultStatus == 2) {
                console.log('getTruckRepairRelCount执行失败')
                this.props.resetGetTruckRepairRelCount()
            }
            else if (getTruckRepairRelCount.isResultStatus == 3) {
                console.log('getTruckRepairRelCount服务器异常')
                this.props.resetGetTruckRepairRelCount()
            }
        }
        /************************************ */

        /*getDriverlicenseCount*/
        if (getDriverlicenseCount.isExecStatus == 2) {
            if (getDriverlicenseCount.isResultStatus == 0) {
                console.log('getDriverlicenseCount执行成功')
                this.props.resetGetDriverlicenseCount()
            }
            else if (getDriverlicenseCount.isResultStatus == 1) {
                console.log('getDriverlicenseCount异常')
                this.props.resetGetDriverlicenseCount()
            }
            else if (getDriverlicenseCount.isResultStatus == 2) {
                console.log('getDriverlicenseCount执行失败')
                this.props.resetGetDriverlicenseCount()
            }
            else if (getDriverlicenseCount.isResultStatus == 3) {
                console.log('getDriverlicenseCount服务器异常')
                this.props.resetGetDriverlicenseCount()
            }
        }
        /************************************ */
    }

    renderTruckTypeItem(param) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {param.type == 0 && <FontTag size={36} title='自' color='#12c3eb' fontColor='#fff' />}
                    {param.type == 1 && <FontTag size={36} title='协' color='#73de8a' fontColor='#fff' />}
                    {param.type == 2 && <FontTag size={36} title='供' color='#efbb7a' fontColor='#fff' />}
                    {param.type == 3 && <FontTag size={36} title='包' color='#e08ddd' fontColor='#fff' />}
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <View >
                        <Text style={{ fontSize: 12, fontWeight: '400' }}>{param.title}  </Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: '#fd8a8d', fontWeight: '500' }}>{param.count} </Text>
                    </View>
                </View>
            </View>
        )
    }

    renderTruckStatusItem(param) {
        return (
            <TouchableNativeFeedback onPress={param.router} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ flexDirection: 'row', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: '#e2e9ec' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {param.status == 0 && <Image source={{ uri: 'service_truck_4x' }} style={{ width: 40, height: 40 }} />}
                        {param.status == 1 && <Image source={{ uri: 'inspect_truck_4x' }} style={{ width: 40, height: 40 }} />}
                        {param.status == 2 && <Image source={{ uri: 'waiting_inspect_4x' }} style={{ width: 40, height: 40 }} />}
                    </View>
                    <View style={{ flex: 4, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flex: 3 }}>
                            <View>
                                <Text>{param.title}</Text>
                            </View>
                            {param.isWarn && <View style={{ paddingTop: 5 }}>
                                <Text style={{ color: '#b9c8cf', fontSize: 10 }}>{param.warnMsg}<Text style={{ color: '#fd8a8d' }}>一个月</Text>失效</Text>
                            </View>}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 30, color: '#fd8a8d' }}>{param.count}</Text>
                        </View>
                    </View>
                    <View>
                        <Icon name='ios-arrow-forward' style={{ fontSize: 25, color: '#7a7a7a' }} />
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        const { zCount, wCount, gCount, cCount } = this.props.homeReducer.data.operateTypeCount
        const { waitingInspectCount, truckRepairRelCount, driverlicenseCount } = this.props.homeReducer.data
        console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#f2f6f7', borderBottomWidth: 1, borderColor: '#e2e9ec' }}>
                            <View style={{ flex: 1, marginVertical: 10, borderRightWidth: 1, borderColor: '#e2e9ec' }}>
                                {this.renderTruckTypeItem({ title: '自营车辆', count: zCount, type: 0 })}
                            </View>
                            <View style={{ flex: 1, marginVertical: 10, borderRightWidth: 1, borderColor: '#e2e9ec' }}>
                                {this.renderTruckTypeItem({ title: '外协车辆', count: wCount, type: 1 })}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#f2f6f7', borderBottomWidth: 1, borderColor: '#e2e9ec' }}>
                            <View style={{ flex: 1, marginVertical: 10, borderRightWidth: 1, borderColor: '#e2e9ec' }}>
                                {this.renderTruckTypeItem({ title: '供方车辆', count: gCount, type: 2 })}
                            </View>
                            <View style={{ flex: 1, marginVertical: 10, borderRightWidth: 1, borderColor: '#e2e9ec' }}>
                                {this.renderTruckTypeItem({ title: '承包车辆', count: cCount, type: 3 })}
                            </View>
                        </View>
                        <View>
                            {this.renderTruckStatusItem({
                                status: 0,
                                count: truckRepairRelCount ? truckRepairRelCount.toString() : 0,
                                isWarn: false, title: '维修中车头',
                                router: () => Actions.truckHomeFilterList({ initParam: { repairStatus: 0 } })
                            })}
                            {this.renderTruckStatusItem({
                                status: 1,
                                count: waitingInspectCount ? waitingInspectCount.toString() : 0,
                                isWarn: true, title: '待检车辆',
                                router: () => Actions.truckHomeFilterList({ initParam: { drivingDateEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() } }),
                                warnMsg: '行驶证临近'
                            })}
                            {this.renderTruckStatusItem({
                                status: 2,
                                count: driverlicenseCount ? driverlicenseCount.toString() : 0,
                                isWarn: true,
                                title: '待检司机',
                                router: () => RouterDirection.driverList(this.props.parent)({ initParam: { licenseDateEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() } }),
                                warnMsg: '驾驶证临近'
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getOperateTypeCount: (param) => {
        dispatch(getOperateTypeCount(param))
    },
    getWaitingInspectCount: (param) => {
        dispatch(getWaitingInspectCount(param))
    },
    resetGetOperateTypeCount: () => {
        dispatch(resetGetOperateTypeCount())
    },
    resetGetWaitingInspectCount: () => {
        dispatch(resetGetWaitingInspectCount())
    },
    resetGetTruckRepairRelCount: () => {
        dispatch(resetGetTruckRepairRelCount())
    },
    getTruckRepairRelCount: () => {
        dispatch(getTruckRepairRelCount())

    },
    resetGetDriverlicenseCount: () => {
        dispatch(resetGetDriverlicenseCount())
    },
    getDriverlicenseCount: (param) => {
        dispatch(getDriverlicenseCount(param))

    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
