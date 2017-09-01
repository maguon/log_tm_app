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
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Select from '../../components/form/Select'
import {
    bindTruck,
    unBindTruck,
    resetBindTruck,
    resetUnBindTruck
} from '../../../actions/AddDriverSecondAction'

class Second extends Component {
    constructor(props) {
        super(props)
        this.onPressUnBindTruck = this.onPressUnBindTruck.bind(this)
        this.onPressBindTruck = this.onPressBindTruck.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
    }



    componentWillReceiveProps(nextProps) {
        const { bindTruck, unBindTruck } = nextProps.addDriverSecondReducer
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
    }

    onPressUnBindTruck() {
        this.props.unBindTruck({
            requiredParam: {
                userId: this.props.userReducer.user.userId,
                truckId: this.props.addDriverSecondReducer.data.truckId,
                driverId: this.props.initParam.driverId
            }
        })
    }


    onPressBindTruck(param) {
        this.props.bindTruck({
            requiredParam: {
                userId: this.props.userReducer.user.userId,
                truckId: param.id,
                driverId: this.props.initParam.driverId,
            },
            truckNum: param.value,
            truckId: param.id
        })
    }


    onPressNextStep() {
        Actions.addDriverThird({ initParam: this.props.initParam })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '绑定货车' }, { step: '3', title: '上传照片' }]} current={1} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {!this.props.addDriverSecondReducer.data.truckId && <Select
                        title='货车：'
                        value={this.props.addDriverSecondReducer.data.truckNum ? this.props.addDriverSecondReducer.data.truckNum : '请选择'}
                        showList={(param) => RouterDirection.selectTruck(this.props.parent)({ initParam: { type: 1 } ,...param})}
                        onValueChange={(param) => this.onPressBindTruck(param)}
                    />}
                    {this.props.addDriverSecondReducer.data.truckId &&
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联货车：{this.props.addDriverSecondReducer.data.truckNum}</Text></View>
                            <TouchableNativeFeedback onPress={this.onPressUnBindTruck} background={TouchableNativeFeedback.SelectableBackground()}>
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
        addDriverSecondReducer: state.addDriverSecondReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    bindTruck: (param) => {
        dispatch(bindTruck(param))
    },
    unBindTruck: (param) => {
        dispatch(unBindTruck(param))
    },
    resetBindTruck: () => {
        dispatch(resetBindTruck())
    },
    resetUnBindTruck: () => {
        dispatch(resetUnBindTruck())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Second)