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
    resetCreateTruckFirst,
    resetCreateTruckTrailer
} from '../../../actions/AddTruckFirstAction'

class First extends Component {
    constructor(props) {
        super(props)
        this.state = {
            truckNumValidater: false,
            companyIdValidater: false,
            brandIdValidater: false,
            drivingDateValidater: false,
            licenseDateValidater: false,
            truckTelValidater: false,
            theCodeValidater: false,
            active: 1
        }
        this.onSelect = this.onSelect.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
    }

    onSelect(param) {
        this.props.changeTruckFirstField(param)
    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const { createTruckFirst, data } = nextProps.addTruckFirstReducer
        /*createTruckFirst*/
        if (createTruckFirst.isExecStatus == 2) {
            if (createTruckFirst.isResultStatus == 0) {
                ToastAndroid.show('创建成功', ToastAndroid.SHORT)
                this.props.resetCreateTruckFirst()
                Actions.addTruckSecond({ initParam: { truckId: data.truckFirstId, type: this.state.active } })
                console.log('createTruckFirst', '执行成功')
            }
            else if (createTruckFirst.isResultStatus == 1) {
                ToastAndroid.show(createTruckFirst.errorMsg, ToastAndroid.SHORT)
                this.props.resetCreateTruckFirst()
                console.log('createTruckFirst', '异常')
            }
            else if (createTruckFirst.isResultStatus == 2) {
                ToastAndroid.show(createTruckFirst.failedMsg, ToastAndroid.SHORT)
                this.props.resetCreateTruckFirst()
                console.log('createTruckFirst', '执行失败')
            }
            else if (createTruckFirst.isResultStatus == 3) {
                ToastAndroid.show(createTruckFirst.serviceFailedMsg, ToastAndroid.SHORT)
                this.props.resetCreateTruckFirst()
                console.log('createTruckFirst', '服务器异常')
            }
        }
        /************************************ */
    }

    onPressNextStep() {
        this.props.createTruckFirst({
            requiredParam:
            {
                userId: this.props.userReducer.data.user.userId
            },
            postParam: {
                ...this.props.addTruckFirstReducer.data.truckFirst,
                truckType: 1
            }
        })
    }

    renderCreateTruckFist() {
        return <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopWidth: 1, borderColor: '#00cade' }}>
            <View>
                <TextBox
                    isRequire={true}
                    title='车牌号码：'
                    value={this.props.addTruckFirstReducer.data.truckFirst.truckNum ? this.props.addTruckFirstReducer.data.truckFirst.truckNum : ''}
                    verifications={[{
                        type: 'isVehicleNumber',
                        message: '不是车牌号'
                    }]}
                    onValueChange={(param) => this.props.changeTruckFirstField({ truckNum: param })}
                    onRequire={(flag) => this.setState({ truckNumValidater: flag })}
                    placeholder='请输入车牌号码'
                />
                <Select
                    title='所属公司：'
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.companyName ? this.props.addTruckFirstReducer.data.truckFirst.companyName : ''}
                    showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                    onValueChange={(param) => this.onSelect({ companyId: param.id, companyName: param.value })}
                    onRequire={(flag) => this.setState({ companyIdValidater: flag })}
                    defaultValue={'请选择'}
                />
                <Select
                    title='车辆品牌：'
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.brandName ? this.props.addTruckFirstReducer.data.truckFirst.brandName : ''}
                    showList={RouterDirection.selectMake(this.props.parent)}
                    onValueChange={(param) => this.onSelect({ brandId: param.id, brandName: param.value })}
                    onRequire={(flag) => this.setState({ brandIdValidater: flag })}
                    defaultValue={'请选择'}
                />
                <TextBox
                    title='联系电话：'
                    isRequire={false}
                    value={this.props.addTruckFirstReducer.data.truckFirst.truckTel ? this.props.addTruckFirstReducer.data.truckFirst.truckTel : ''}
                    verifications={[{
                        type: 'isPhone',
                        message: '不是手机号码'
                    }]}
                    onValueChange={(value) => this.onSelect({ truckTel: value })}
                    onRequire={(flag) => this.setState({ truckTelValidater: flag })}
                    placeholder='请输入联系电话'
                />
                <TextBox
                    title='识别代码：'
                    isRequire={false}
                    value={this.props.addTruckFirstReducer.data.truckFirst.theCode ? this.props.addTruckFirstReducer.data.truckFirst.theCode : ''}
                    verifications={[{
                        type: 'isLength',
                        arguments: [0, 20],
                        message: '长度不能超过20位'
                    }]}
                    onValueChange={(value) => this.onSelect({ theCode: value })}
                    onRequire={(flag) => this.setState({ theCodeValidater: flag })}
                    placeholder='请输入识别代码'
                />
                <DateTimePicker
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.drivingDate ? this.props.addTruckFirstReducer.data.truckFirst.drivingDate : ''}
                    title='行驶证检证日期：'
                    defaultValue={'请选择'}
                    onRequire={(flag) => this.setState({ drivingDateValidater: flag })}
                    onValueChange={(param) => this.onSelect({ drivingDate: param })}
                />
                <DateTimePicker
                    isRequire={true}
                    value={this.props.addTruckFirstReducer.data.truckFirst.licenseDate ? this.props.addTruckFirstReducer.data.truckFirst.licenseDate : ''}
                    title='营运证鉴证时间：'
                    defaultValue={'请选择'}
                    onRequire={(flag) => this.setState({ licenseDateValidater: flag })}
                    onValueChange={(param) => this.onSelect({ licenseDate: param })}
                />
                <RichTextBox
                    isRequire={false}
                    title='备注：'
                    verifications={[{
                        type: 'isLength',
                        arguments: [0, 200],
                        message: '长度0-200位'
                    }]}
                    value={this.props.addTruckFirstReducer.data.truckFirst.remark ? this.props.addTruckFirstReducer.data.truckFirst.remark : ''}
                    defaultValue={'请填写'}
                    onValueChange={(param) => this.onSelect({ remark: param })}
                    showRichText={RouterDirection.richText(this.props.parent)}
                />
                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Button
                        full
                        onPress={this.onPressNextStep}
                        disabled={!(
                            this.state.companyIdValidater &&
                            this.state.brandIdValidater &&
                            this.state.drivingDateValidater &&
                            this.state.licenseDateValidater &&
                            this.state.truckNumValidater &&
                            this.state.theCodeValidater &&
                            this.state.truckTelValidater
                        )}
                        style={{
                            backgroundColor: (
                                this.state.companyIdValidater &&
                                this.state.brandIdValidater &&
                                this.state.drivingDateValidater &&
                                this.state.licenseDateValidater &&
                                this.state.truckNumValidater &&
                                this.state.theCodeValidater &&
                                this.state.truckTelValidater
                            ) ? '#00cade' : '#888888'
                        }}>
                        <Text style={{ color: '#fff' }}>下一步</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    }

    renderCreateTruckTrailer() {
        return <View style={{ borderTopWidth: 1, borderColor: '#00cade' }}>

        </View>
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
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.active == 1 ? '#fff' : '#00cade' }}>车头</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.active == 2 ? '#fff' : '#00cade' }}>挂车</Text>
                    </Button>
                </View>
                {this.state.active == 1 && this.renderCreateTruckFist()}
                {this.state.active == 2 && this.renderCreateTruckTrailer()}
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
        dispatch(createTruckFirst(param))
    },
    changeTruckFirstField: (param) => {
        dispatch(changeTruckFirstField(param))
    },
    resetCreateTruckTrailer: () => {
        dispatch(resetCreateTruckTrailer())
    },
    resetCreateTruckFirst: () => {
        dispatch(resetCreateTruckFirst())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(First)