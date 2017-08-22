import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView
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
    resetCreateDriver
} from '../../../actions/AddDriverFirstAction'

class First extends Component {
    constructor(props) {
        super(props)
        this.createDriver = this.createDriver.bind(this)

    }


    componentWillReceiveProps(nextProps) {
        const { createDriverFirst } = nextProps.addDriverFirstReducer
        /*createDriverFirst*/
        if (createDriverFirst.isExecStatus == 2) {
            if (createDriverFirst.isResultStatus == 0) {
                 Actions.addTruckSecond({ initParam: { driverId: data.driverId} })
                this.props.resetCreateDriver()
                console.log('createDriverFirst', '执行成功')
            }
            else if (createDriverFirst.isResultStatus == 1) {
                this.props.resetCreateDriver()
                console.log('createDriverFirst', '异常')
            }
            else if (createDriverFirst.isResultStatus == 2) {
                this.props.resetCreateDriver()
                console.log('createDriverFirst', '执行失败')
            }
            else if (createDriverFirst.isResultStatus == 3) {
                this.props.resetCreateDriver()
                console.log('createDriverFirst', '服务器异常')
            }
        }
        /************************************ */

    }

    createDriver() {
        this.props.createDriver({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId
            },
            postParam: this.props.addDriverFirstReducer.data.driverInfo
        })
    }

    render() {
        console.log('driverInfo', this.props.addDriverFirstReducer.data.driverInfo)
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }]} current={0} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TextBox
                            title='姓名：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.driveName ? this.props.addDriverFirstReducer.data.driverInfo.driveName : ''}
                            onValueChange={(param) => this.props.changeDriverField({ driveName: param })}
                            placeholder='请输入姓名'
                        />
                        <CheckBox
                            listTitle='选择性别'
                            value={this.props.addDriverFirstReducer.data.driverInfo.gender ? this.props.addDriverFirstReducer.data.driverInfo.gender : '请选择'}
                            itemList={[{ id: 0, value: '男' }, { id: 1, value: '女' }]}
                            onCheck={(item) => this.props.changeDriverField({ gender: item.value })} />
                        <Select
                            title='所属公司：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.company ? this.props.addDriverFirstReducer.data.driverInfo.company : '请选择'}
                            showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                            onValueChange={(param) => this.props.changeDriverField({ companyId: param.id, company: param.value })}
                        />
                        {/* <Select
                            title='关联货车：'
                            value={'第二步'}
                            showList={RouterDirection.selectTruck(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}  
                        /> */}
                        <TextBox
                            title='联系电话：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.tel ? this.props.addDriverFirstReducer.data.driverInfo.tel : ''}
                            onValueChange={(param) => this.props.changeDriverField({ tel: param })}
                            placeholder='请输入联系电话'
                        />
                        <Select
                            title='驾证类别：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.licenseType ? this.props.addDriverFirstReducer.data.driverInfo.licenseType : '请选择'}
                            showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                            onValueChange={(param) => this.props.changeDriverField({ licenseType: param.value })}
                            defaultValue={'请选择'}
                        />
                        <DateTimePicker
                            value={this.props.addDriverFirstReducer.data.driverInfo.licenseDate ? this.props.addDriverFirstReducer.data.driverInfo.licenseDate : '请选择'}
                            title='驾驶证到期时间：'
                            onValueChange={(param) => this.props.changeDriverField({ licenseDate: param })}
                        />
                        <TextBox
                            title='身份证：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.idNumber ? this.props.addDriverFirstReducer.data.driverInfo.idNumber : ''}
                            onValueChange={(param) => this.props.changeDriverField({ idNumber: param })}
                            placeholder='请输入身份证'
                        />
                        <TextBox
                            title='家庭住址：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.address ? this.props.addDriverFirstReducer.data.driverInfo.address : ''}
                            onValueChange={(param) => this.props.changeDriverField({ address: param })}
                            placeholder='请输入家庭住址'
                        />
                        <TextBox
                            title='紧急联系人电话：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.sibTel ? this.props.addDriverFirstReducer.data.driverInfo.sibTel : ''}
                            onValueChange={(param) => this.props.changeDriverField({ sibTel: param })}
                            placeholder='请输入紧急联系人电话'
                        />
                        <RichTextBox
                            title='备注：'
                            value={this.props.addDriverFirstReducer.data.driverInfo.remark ? this.props.addDriverFirstReducer.data.driverInfo.remark : ''}
                            defaultValue={'请填写'}
                            onValueChange={(param) => this.props.changeDriverField({ remark: param })}
                            showRichText={RouterDirection.richText(this.props.parent)}
                        />
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Button full onPress={this.createDriver} style={{ backgroundColor: '#00cade' }}>
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
        userReducer: state.userReducer
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(First)

