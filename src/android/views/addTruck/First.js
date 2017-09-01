import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    ToastAndroid
} from 'react-native'
import { Button, Icon } from 'native-base'
import Select from '../../components/form/Select'
import DateTimePicker from '../../components/form/DateTimePicker'
import TextBox from '../../components/form/TextBox'
import CheckBox from '../../components/form/CheckBox'
import RichTextBox from '../../components/form/RichTextBox'
import * as RouterDirection from '../../../util/RouterDirection'
import StepIndicator from '../../components/StepIndicator'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import {
    createTruckFirst,
    createTruckTrailer,
    changeTruckFirstField,
    changeTruckTrailerField,
    resetCreateTruckFirst,
    resetCreateTruckTrailer,
    cleanAddTruckFirstDate
} from '../../../actions/AddTruckFirstAction'
import { cleanAddTruckSecondDate } from '../../../actions/AddTruckSecondAction'
import { cleanAddTruckThirdDate } from '../../../actions/AddTruckThirdAction'
import { cleanAddTruckFourthDate } from '../../../actions/AddTruckFourthAction'

class First extends Component {
    constructor(props) {
        super(props)
        this.state = {
            truckNumFirstValidater: false,
            companyIdFirstValidater: false,
            brandIdFirstValidater: false,
            drivingDateFirstValidater: false,
            licenseDateFirstValidater: false,
            //truckTelFirstValidater: false,
            //theCodeFirstValidater: false,


            truckNumTrailerValidater: false,
            companyIdTrailerValidater: false,
            numberTrailerValidater: false,
            drivingDateTrailerValidater: false,
            licenseDateTrailerValidater: false,
           // theCodeTrailerValidater: false,

            truckType: 1
        }
        this.onSelect = this.onSelect.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
    }

    onSelect(param) {
        this.props.changeTruckFirstField(param)
    }

    onPressSegment(index) {
        if (this.state.truckType != index)
            this.setState({ truckType: index })
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const { createTruckFirst,createTruckTrailer, data } = nextProps.addTruckFirstReducer
        /*createTruckFirst*/
        if (createTruckFirst.isExecStatus == 2) {
            if (createTruckFirst.isResultStatus == 0) {
                ToastAndroid.showWithGravity('创建成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckFirst()
                Actions.addTruckSecond({ initParam: { truckId: data.truckFirstId, type: this.state.truckType, truckCode: data.truckFirst.truckNum } })
            }
            else if (createTruckFirst.isResultStatus == 1) {
                ToastAndroid.showWithGravity('创建失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckFirst()
            }
            else if (createTruckFirst.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`创建失败，${createTruckFirst.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckFirst()
            }
            else if (createTruckFirst.isResultStatus == 3) {
                ToastAndroid.showWithGravity('创建失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckFirst()
            }
        }
        /************************************ */


        /*createTruckTrailer*/
        if (createTruckTrailer.isExecStatus == 2) {
            if (createTruckTrailer.isResultStatus == 0) {
                ToastAndroid.show('创建成功！', ToastAndroid.SHORT)
                this.props.resetCreateTruckTrailer()
                Actions.addTruckSecond({ initParam: { truckId: data.truckTrailerId, type: this.state.truckType, truckCode: data.truckTrailer.truckNum } })
            }
            else if (createTruckTrailer.isResultStatus == 1) {
                ToastAndroid.show(`创建失败，${createTruckTrailer.failedMsg}！`, ToastAndroid.SHORT)
                this.props.resetCreateTruckTrailer()
            }
            else if (createTruckTrailer.isResultStatus == 2) {
                ToastAndroid.show('创建失败！', ToastAndroid.SHORT)
                this.props.resetCreateTruckTrailer()
            }
            else if (createTruckTrailer.isResultStatus == 3) {
                ToastAndroid.show('创建失败！', ToastAndroid.SHORT)
                this.props.resetCreateTruckTrailer()
            }
        }
        /************************************ */
    }

    onPressNextStep() {
        if (this.state.truckType == 1) {
            this.props.createTruckFirst({
                requiredParam:
                {
                    userId: this.props.userReducer.user.userId
                },
                postParam: {
                    ...this.props.addTruckFirstReducer.data.truckFirst,
                    truckType: 1
                }
            })
        } else if (this.state.truckType == 2) {
            this.props.createTruckTrailer({
                requiredParam:
                {
                    userId: this.props.userReducer.user.userId
                },
                postParam: {
                    ...this.props.addTruckFirstReducer.data.truckTrailer,
                    truckType: 2
                }
            })
        }
    }


    componentWillUnmount(){
        this.props.cleanAddTruckFirstDate()
        this.props.cleanAddTruckSecondDate()
        this.props.cleanAddTruckThirdDate()
        this.props.cleanAddTruckFourthDate()
    }

    renderCreateTruckFist() {
        return <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopWidth: 1, borderColor: '#00cade' }}>
            <View>
                <TextBox
                    isRequire={true}
                    title='车牌号码：'
                    value={this.props.addTruckFirstReducer.data.truckFirst.truckNum ? this.props.addTruckFirstReducer.data.truckFirst.truckNum : ''}
                   /*verifications={[{
                        type: 'isVehicleNumber',
                        message: '不是车牌号'
                    }]}*/
                    onValueChange={(param) => this.props.changeTruckFirstField({ truckNum: param })}
                    onRequire={(flag) => this.setState({ truckNumFirstValidater: flag })}
                    placeholder='请输入车牌号码'
                />
                <Select
                    title='所属公司：'
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.companyName ? this.props.addTruckFirstReducer.data.truckFirst.companyName : '请选择'}
                    showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                    onValueChange={(param) => this.props.changeTruckFirstField({ companyId: param.id, companyName: param.value })}
                    onRequire={(flag) => this.setState({ companyIdFirstValidater: flag })}
                    defaultValue={'请选择'}
                />
                <Select
                    title='车辆品牌：'
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.brandName ? this.props.addTruckFirstReducer.data.truckFirst.brandName : '请选择'}
                    showList={RouterDirection.selectMake(this.props.parent)}
                    onValueChange={(param) => this.props.changeTruckFirstField({ brandId: param.id, brandName: param.value })}
                    onRequire={(flag) => this.setState({ brandIdFirstValidater: flag })}
                    defaultValue={'请选择'}
                />
                <TextBox
                    title='联系电话：'
                    isRequire={false}
                    value={this.props.addTruckFirstReducer.data.truckFirst.truckTel ? this.props.addTruckFirstReducer.data.truckFirst.truckTel : ''}
                    /*verifications={[{
                        type: 'isPhone',
                        message: '不是手机号码'
                    }]}*/
                    onValueChange={(value) => this.props.changeTruckFirstField({ truckTel: value })}
                    //onRequire={(flag) => this.setState({ truckTelFirstValidater: flag })}
                    placeholder='请输入联系电话'
                />
                <TextBox
                    title='识别代码：'
                    isRequire={false}
                    value={this.props.addTruckFirstReducer.data.truckFirst.theCode ? this.props.addTruckFirstReducer.data.truckFirst.theCode : ''}
                    /*verifications={[{
                        type: 'isLength',
                        arguments: [0, 20],
                        message: '长度不能超过20位'
                    }]}*/
                    onValueChange={(value) => this.props.changeTruckFirstField({ theCode: value })}
                    //onRequire={(flag) => this.setState({ theCodeFirstValidater: flag })}
                    placeholder='请输入识别代码'
                />
                <DateTimePicker
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.drivingDate ? this.props.addTruckFirstReducer.data.truckFirst.drivingDate : '请选择'}
                    title='行驶证检证日期：'
                    defaultValue={'请选择'}
                    onRequire={(flag) => this.setState({ drivingDateFirstValidater: flag })}
                    onValueChange={(param) => this.props.changeTruckFirstField({ drivingDate: param })}
                />
                <DateTimePicker
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.licenseDate ? this.props.addTruckFirstReducer.data.truckFirst.licenseDate : '请选择'}
                    title='营运证鉴证时间：'
                    defaultValue={'请选择'}
                    onRequire={(flag) => this.setState({ licenseDateFirstValidater: flag })}
                    onValueChange={(param) => this.props.changeTruckFirstField({ licenseDate: param })}
                />
                <RichTextBox
                    isRequire={false}
                    title='备注：'
                     /*verifications={[{
                        type: 'isLength',
                        arguments: [0, 200],
                        message: '长度0-200位'
                    }]}*/
                    value={this.props.addTruckFirstReducer.data.truckFirst.remark ? this.props.addTruckFirstReducer.data.truckFirst.remark : ''}
                    defaultValue={'请填写'}
                    onValueChange={(param) => this.props.changeTruckFirstField({ remark: param })}
                    showRichText={RouterDirection.richText(this.props.parent)}
                />
                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Button
                        full
                        onPress={this.onPressNextStep}
                        disabled={!(
                            this.state.companyIdFirstValidater &&
                            this.state.brandIdFirstValidater &&
                            this.state.drivingDateFirstValidater &&
                            this.state.licenseDateFirstValidater &&
                            this.state.truckNumFirstValidater 
                            //this.state.theCodeFirstValidater &&
                            //this.state.truckTelFirstValidater
                        )}
                        style={{
                            backgroundColor: (
                                this.state.companyIdFirstValidater &&
                                this.state.brandIdFirstValidater &&
                                this.state.drivingDateFirstValidater &&
                                this.state.licenseDateFirstValidater &&
                                this.state.truckNumFirstValidater 
                               // this.state.theCodeFirstValidater &&
                                //this.state.truckTelFirstValidater
                            ) ? '#00cade' : '#888888'
                        }}>
                        <Text style={{ color: '#fff' }}>下一步</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    }

    renderCreateTruckTrailer() {
        return <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopWidth: 1, borderColor: '#00cade' }}>
            <View style={{ borderTopWidth: 1, borderColor: '#00cade' }}>
                <TextBox
                    isRequire={true}
                    title='车牌号码：'
                    value={this.props.addTruckFirstReducer.data.truckTrailer.truckNum ? this.props.addTruckFirstReducer.data.truckTrailer.truckNum : ''}
                    /*verifications={[{
                        type: 'isVehicleNumber',
                        message: '不是车牌号'
                    }]}*/
                    onValueChange={(param) => this.props.changeTruckTrailerField({ truckNum: param })}
                    onRequire={(flag) => this.setState({ truckNumTrailerValidater: flag })}
                    placeholder='请输入车牌号码'
                />
                <TextBox
                    isRequire={true}
                    title='挂车货位：'
                    verifications={[{
                        type: 'isTrailerNumber',
                        message: '只能是100以内的整数'
                    }]}
                    value={this.props.addTruckFirstReducer.data.truckTrailer.number ? this.props.addTruckFirstReducer.data.truckTrailer.number : ''}
                    onValueChange={(param) => this.props.changeTruckTrailerField({ number: param })}
                    onRequire={(flag) => this.setState({ numberTrailerValidater: flag })}
                    placeholder='请输入车牌号码'
                />
                <TextBox
                    title='识别代码：'
                    isRequire={false}
                    value={this.props.addTruckFirstReducer.data.truckTrailer.theCode ? this.props.addTruckFirstReducer.data.truckTrailer.theCode : ''}
                    /*verifications={[{
                        type: 'isLength',
                        arguments: [0, 20],
                        message: '长度不能超过20位'
                    }]}*/
                    onValueChange={(value) => this.props.changeTruckTrailerField({ theCode: value })}
                    //onRequire={(flag) => this.setState({ theCodeTrailerValidater: flag })}
                    placeholder='请输入识别代码'
                />
                <Select
                    title='所属公司：'
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckTrailer.companyName ? this.props.addTruckFirstReducer.data.truckTrailer.companyName : '请选择'}
                    showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                    onValueChange={(param) => this.props.changeTruckTrailerField({ companyId: param.id, companyName: param.value })}
                    onRequire={(flag) => this.setState({ companyIdTrailerValidater: flag })}
                    defaultValue={'请选择'}
                />
                <DateTimePicker
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckTrailer.drivingDate ? this.props.addTruckFirstReducer.data.truckTrailer.drivingDate : '请选择'}
                    title='行驶证检证日期：'
                    defaultValue={'请选择'}
                    onRequire={(flag) => this.setState({ drivingDateTrailerValidater: flag })}
                    onValueChange={(param) => this.props.changeTruckTrailerField({ drivingDate: param })}
                />
                <DateTimePicker
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckTrailer.licenseDate ? this.props.addTruckFirstReducer.data.truckTrailer.licenseDate : '请选择'}
                    title='营运证鉴证时间：'
                    defaultValue={'请选择'}
                    onRequire={(flag) => this.setState({ licenseDateTrailerValidater: flag })}
                    onValueChange={(param) => this.props.changeTruckTrailerField({ licenseDate: param })}
                />
                <RichTextBox
                    isRequire={false}
                    title='备注：'
                    /*verifications={[{
                        type: 'isLength',
                        arguments: [0, 200],
                        message: '长度0-200位'
                    }]}*/
                    value={this.props.addTruckFirstReducer.data.truckTrailer.remark ? this.props.addTruckFirstReducer.data.truckTrailer.remark : ''}
                    defaultValue={'请填写'}
                    onValueChange={(param) => this.props.changeTruckTrailerField({ remark: param })}
                    showRichText={RouterDirection.richText(this.props.parent)}
                />
                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Button
                        full
                        onPress={this.onPressNextStep}
                        disabled={!(
                            this.state.truckNumTrailerValidater &&
                            this.state.companyIdTrailerValidater &&
                            this.state.drivingDateTrailerValidater &&
                            this.state.licenseDateTrailerValidater &&
                           // this.state.theCodeTrailerValidater &&
                            this.state.numberTrailerValidater
                        )}
                        style={{
                            backgroundColor: (
                                this.state.truckNumTrailerValidater &&
                                this.state.companyIdTrailerValidater &&
                                this.state.drivingDateTrailerValidater &&
                                this.state.licenseDateTrailerValidater &&
                               // this.state.theCodeTrailerValidater &&
                                this.state.numberTrailerValidater
                            ) ? '#00cade' : '#888888'
                        }}>
                        <Text style={{ color: '#fff' }}>下一步</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator
                    stepList={[{ step: '1', title: '基本信息' },
                    { step: '2', title: '关联信息' },
                    { step: '3', title: '上传照片' },
                    { step: '4', title: '车保信息' }]}
                    current={0} />
                <View style={{ marginHorizontal: 30, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.truckType == 1 ? '#fff' : '#00cade' }}>车头</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.truckType == 2 ? '#fff' : '#00cade' }}>挂车</Text>
                    </Button>
                </View>
                {this.state.truckType == 1 && this.renderCreateTruckFist()}
                {this.state.truckType == 2 && this.renderCreateTruckTrailer()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addTruckFirstReducer: state.addTruckFirstReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createTruckFirst: (param) => {
        dispatch(createTruckFirst(param))
    },
    createTruckTrailer: (param) => {
        dispatch(createTruckTrailer(param))
    },
    changeTruckFirstField: (param) => {
        dispatch(changeTruckFirstField(param))
    },
    changeTruckTrailerField: (param) => {
        dispatch(changeTruckTrailerField(param))
    },
    resetCreateTruckTrailer: () => {
        dispatch(resetCreateTruckTrailer())
    },
    resetCreateTruckFirst: () => {
        dispatch(resetCreateTruckFirst())
    },
    cleanAddTruckFirstDate: () => {
        dispatch(cleanAddTruckFirstDate())
    },
    cleanAddTruckSecondDate: () => {
 dispatch(cleanAddTruckSecondDate())
    },
    cleanAddTruckThirdDate: () => {
 dispatch(cleanAddTruckThirdDate())
    },
    cleanAddTruckFourthDate: () => {
 dispatch(cleanAddTruckFourthDate())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(First)