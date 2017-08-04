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
            Validate: {
                truckNum: false,
                companyId: false,
                brandId: false,
                drivingDate: false,
                licenseDate: false,
            }
        }
        this.onSelect = this.onSelect.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
        this.test = this.test.bind(this)
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
                truckNum: '辽B112239',//车牌号
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

    test() {
        //console.log(this.props);
        return RouterDirection.selectMake(this.props.parent)
    }

    render() {
        console.log(this.props.addTruckFirstReducer.data.truckFirst.brandId)
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }, { step: '3', title: '车保信息' }]} current={0} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TextBox
                            isRequire={true}
                            title='车牌号码：'
                            value={''}
                            verifications={[{
                                type: 'isVehicleNumber',
                                message: '不是车牌号'
                            }]}
                            onValueChange={(param) => this.props.changeTruckFirstField({ truckNum: param })}
                            onRequire={(flag) => { this.setState({ Validate: { ...this.state.Validate, truckNum: flag } }) }}
                            placeholder='请输入车牌号码'
                        />
                        <Select
                            title='所属公司：'
                            isRequire={true}
                             value={this.props.addTruckFirstReducer.data.truckFirst.companyName}
                            showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                            onValueChange={(param) => this.onSelect({ companyId: param.id, companyName: param.value })}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='车辆品牌：'
                            isRequire={true}
                            value={this.props.addTruckFirstReducer.data.truckFirst.brandName}
                            showList={RouterDirection.selectMake(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ brandId: param.id, brandName: param.value })}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='联系电话：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            placeholder='请输入联系电话'
                        />
                        <TextBox
                            title='识别代码：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            placeholder='请输入识别代码'
                        />
                        <DateTimePicker
                            isRequire={true}
                            // value={this.state.queryCar.enterEnd}
                            title='行驶证检证日期：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.onSelect({ enterEnd: param })}
                        />
                        <DateTimePicker
                            isRequire={true}
                            // value={this.state.queryCar.enterEnd}
                            title='营运证鉴证时间：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.onSelect({ enterEnd: param })}
                        />
                        <RichTextBox
                            isRequire={false}
                            // isRequire={false}
                            title='备注：'
                            //verifications={[{
                            //     type: 'isLength',
                            //      arguments: [0, 300],
                            //      message: '长度0-300位'
                            //  }]}
                            // value={remark}
                            defaultValue={'请填写'}
                            onValueChange={(param) => this.props.changeAddCarField({ remark: param })}

                            showRichText={RouterDirection.richText(this.props.parent)}
                        />
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Button full onPress={this.onPressNextStep} style={{ backgroundColor: '#00cade' }}>
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
        // console.log(param)
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