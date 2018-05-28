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
import CheckBox from '../../components/form/CheckBox'
import RichTextBox from '../../components/form/RichTextBox'
import TextBox from '../../components/form/TextBox'
import * as RouterDirection from '../../../util/RouterDirection'
import StepIndicator from '../../components/StepIndicator'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import {
    createDriver,
    changeDriverField,
    resetCreateDriver,
    cleanAddDriverFirstDate
} from '../../../actions/AddDriverFirstAction'
import { cleanAddDriverSecondDate } from '../../../actions/AddDriverSecondAction'
import { cleanAddDriverThirdDate } from '../../../actions/AddDriverThirdAction'
import DrivingLicenseTypeList from '../../../config/DrivingLicenseType.json'
import globalStyles, { styleColor } from '../../GlobalStyles'

class First extends Component {
    constructor(props) {
        super(props)
        this.createDriver = this.createDriver.bind(this)
        this.state = {
            telValidater: true,
            sibTelValidater: true,
            driverNameValidater: true,
            genderValidater: true,
            addressValidater: true,
            //cardNoValidater: true,
            companyValidater: true,
            licenseTypeValidater: true,
            licenseDateValidater: true
        }
    }


    componentWillReceiveProps(nextProps) {
        const { createDriverFirst, data } = nextProps.addDriverFirstReducer
        /*createDriverFirst*/
        if (createDriverFirst.isExecStatus == 2) {
            if (createDriverFirst.isResultStatus == 0) {
                Actions.addDriverSecond({ initParam: { driverId: data.driverId } })
                ToastAndroid.showWithGravity('司机创建成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateDriver()
            }
            else if (createDriverFirst.isResultStatus == 1) {
                ToastAndroid.showWithGravity('司机创建失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateDriver()
            }
            else if (createDriverFirst.isResultStatus == 2) {
                ToastAndroid.showWithGravity('司机创建失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateDriver()
            }
            else if (createDriverFirst.isResultStatus == 3) {
                ToastAndroid.showWithGravity('司机创建失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateDriver()
            }
        }
        /************************************ */

    }

    createDriver() {
        this.props.createDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid
            },
            postParam: this.props.addDriverFirstReducer.data.driverInfo
        })
    }

    componentWillUnmount(){
        //console.log('componentWillUnmount')
        this.props.cleanAddDriverFirstDate()
        this.props.cleanAddDriverSecondDate()
        this.props.cleanAddDriverThirdDate()
    }

    render() {
        let gender
        if (this.props.addDriverFirstReducer.data.driverInfo.gender == 0) gender = '女'
        if (this.props.addDriverFirstReducer.data.driverInfo.gender == 1) gender = '男'       
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '绑定货车' }, { step: '3', title: '上传照片' }]} current={0} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TextBox
                            title='姓名：'
                            isRequire={true}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 5],
                                message: '长度0-5位'
                            }]}*/
                            onRequire={(flag) => this.setState({ driverNameValidater: flag })}
                            value={this.props.addDriverFirstReducer.data.driverInfo.driveName ? this.props.addDriverFirstReducer.data.driverInfo.driveName : ''}
                            onValueChange={(param) => this.props.changeDriverField({ driveName: param })}
                            placeholder='请输入姓名'
                        />
                        <CheckBox
                            isRequire={true}
                            listTitle='选择性别'
                            onRequire={(flag) => this.setState({ genderValidater: flag })}
                            value={gender ? gender : '请选择'}
                            itemList={[{ id: 1, value: '男' }, { id: 0, value: '女' }]}
                            onCheck={(item) => this.props.changeDriverField({ gender: item.id })}
                            defaultValue={'请选择'} />
                        <Select
                            title='所属公司：'
                            isRequire={true}
                            onRequire={(flag) => this.setState({ companyValidater: flag })}
                            value={this.props.addDriverFirstReducer.data.driverInfo.company ? this.props.addDriverFirstReducer.data.driverInfo.company : '请选择'}
                            showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                            onValueChange={(param) => this.props.changeDriverField({ companyId: param.id, company: param.value })}
                        />
                        <TextBox
                            title='联系电话：'
                            isRequire={true}
                            /*verifications={[{
                                type: 'isPhone',
                                message: '不是手机号码'
                            }]}*/
                            onRequire={(flag) => this.setState({ telValidater: flag })}
                            value={this.props.addDriverFirstReducer.data.driverInfo.mobile ? this.props.addDriverFirstReducer.data.driverInfo.mobile : ''}
                            onValueChange={(param) => this.props.changeDriverField({ mobile: param })}
                            placeholder='请输入联系电话'
                        />
                        <Select
                            title='驾证类别：'
                            isRequire={true}
                            onRequire={(flag) => this.setState({ licenseTypeValidater: flag })}
                            value={this.props.addDriverFirstReducer.data.driverInfo.licenseType ? DrivingLicenseTypeList.find((item) => item.id == this.props.addDriverFirstReducer.data.driverInfo.licenseType).value : '请选择'}
                            showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                            onValueChange={(param) => this.props.changeDriverField({ licenseType: param.id })}
                            defaultValue={'请选择'}
                        />
                        <DateTimePicker
                            isRequire={true}
                            onRequire={(flag) => this.setState({ licenseDateValidater: flag })}
                            value={this.props.addDriverFirstReducer.data.driverInfo.licenseDate ? this.props.addDriverFirstReducer.data.driverInfo.licenseDate : '请选择'}
                            title='驾驶证到期时间：'
                            onValueChange={(param) => this.props.changeDriverField({ licenseDate: param })}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='身份证：'
                            /*isRequire={true}
                            verifications={[{
                                type: 'isCardNo',
                                message: '不是身份证号码'
                            }]}
                            onRequire={(flag) => this.setState({ cardNoValidater: flag })}*/
                            value={this.props.addDriverFirstReducer.data.driverInfo.idNumber ? this.props.addDriverFirstReducer.data.driverInfo.idNumber : ''}
                            onValueChange={(param) => this.props.changeDriverField({ idNumber: param })}
                            placeholder='请输入身份证'
                        />
                        <TextBox
                            title='家庭住址：'
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 100],
                                message: '长度0-100位'
                            }]}*/
                            onRequire={(flag) => this.setState({ addressValidater: flag })}
                            value={this.props.addDriverFirstReducer.data.driverInfo.address ? this.props.addDriverFirstReducer.data.driverInfo.address : ''}
                            onValueChange={(param) => this.props.changeDriverField({ address: param })}
                            placeholder='请输入家庭住址'
                        />
                        <TextBox
                            title='紧急联系人电话：'
                            /*verifications={[{
                                type: 'isPhone',
                                message: '不是手机号码'
                            }]}*/
                            onRequire={(flag) => this.setState({ sibTelValidater: flag })}
                            value={this.props.addDriverFirstReducer.data.driverInfo.sibTel ? this.props.addDriverFirstReducer.data.driverInfo.sibTel : ''}
                            onValueChange={(param) => this.props.changeDriverField({ sibTel: param })}
                            placeholder='请输入紧急联系人电话'
                        />
                        <RichTextBox
                            title='备注：'
                           /* onRequire={(flag) => this.setState({ licenseDateValidater: flag })}*/
                            value={this.props.addDriverFirstReducer.data.driverInfo.remark ? this.props.addDriverFirstReducer.data.driverInfo.remark : ''}
                            defaultValue={'请填写'}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 100],
                                message: '长度0-100位'
                            }]}*/
                            onValueChange={(param) => this.props.changeDriverField({ remark: param })}
                            showRichText={RouterDirection.richText(this.props.parent)}
                        />
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Button
                                full
                                onPress={this.createDriver}
                                disabled={!(
                                    this.state.telValidater &&
                                    this.state.sibTelValidater &&
                                    this.state.driverNameValidater &&
                                    this.state.genderValidater &&
                                    this.state.addressValidater &&
                                    //this.state.cardNoValidater &&
                                    this.state.companyValidater &&
                                    this.state.addressValidater &&
                                    this.state.licenseTypeValidater &&
                                    this.state.licenseDateValidater
                                )}
                                style={{
                                    backgroundColor: (
                                        this.state.telValidater &&
                                        this.state.sibTelValidater &&
                                        this.state.driverNameValidater &&
                                        this.state.genderValidater &&
                                        this.state.addressValidater &&
                                        //this.state.cardNoValidater &&
                                        this.state.companyValidater &&
                                        this.state.addressValidater &&
                                        this.state.licenseTypeValidater &&
                                        this.state.licenseDateValidater
                                    ) ? styleColor : '#888888'
                                }}>
                                <Text style={{ color: '#fff' }}>下一步</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addDriverFirstReducer: state.addDriverFirstReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createDriver: (param) => {
        dispatch(createDriver(param))
    },
    changeDriverField: (param) => {
        dispatch(changeDriverField(param))
    },
    resetCreateDriver: () => {
        dispatch(resetCreateDriver())
    },
    cleanAddDriverFirstDate: () => {
        dispatch(cleanAddDriverFirstDate())
    },
    cleanAddDriverSecondDate: () => {
        dispatch(cleanAddDriverSecondDate())
    },
    cleanAddDriverThirdDate: () => {
        dispatch(cleanAddDriverThirdDate())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(First)

