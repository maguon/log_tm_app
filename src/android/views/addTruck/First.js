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
            theCodeValidater: false
        }
        this.onSelect = this.onSelect.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
        // this.test = this.test.bind(this)
    }
    //    "truckTel": "13889661887",
    //             "theCode": "lasdfjjhhsa",                "remark": "123"

    onSelect(param) {
        this.props.changeTruckFirstField(param)
        console.log(param)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const { createTruckFirst } = nextProps.addTruckFirstReducer
        /*createTruckFirst*/
        if (createTruckFirst.isExecStatus == 2) {
            if (createTruckFirst.isResultStatus == 0) {
                console.log('createTruckFirst', '执行成功')
            }
            else if (createTruckFirst.isResultStatus == 1) {
                console.log('createTruckFirst', '异常')
            }
            else if (createTruckFirst.isResultStatus == 2) {
                console.log('createTruckFirst', '执行失败')
            }
            else if (createTruckFirst.isResultStatus == 3) {
                console.log('createTruckFirst', '服务器异常')
            }
        }
        /************************************ */
    }

    onPressNextStep() {
        // Actions.addTruckSecond()
        this.props.createTruckFirst({
            requiredParam:
            {
                userId: this.props.userReducer.data.user.userId
            },
            postParam: {
                truckNum: '辽B112240',//车牌号
                brandId: 21,//品牌Id
                truckTel: '13889661887',//随车电话
                theCode: 'lasdfjjhhsa',//车辆识别码
                companyId: 40,//所属公司Id
                truckType: 1,//货车类型1，车头
                drivingDate: '2017/8/15', //行驶证检验日期
                licenseDate: '2017/8/15',//营运证检证日期
                remark: '123124'//备注
            }

        })
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }, { step: '3', title: '车保信息' }]} current={0} />
                <ScrollView showsVerticalScrollIndicator={false}>
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
                            onRequire={(flag) => this.setState({ truckTelValidater: flag })}  //console.log(flag)
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