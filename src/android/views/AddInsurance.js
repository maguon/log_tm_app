import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'
import TextBox from '../components/form/TextBox'
import { connect } from 'react-redux'
import * as RouterDirection from '../../util/RouterDirection'
import {
    createInsurance,
    resetCreateInsurancer,
    changeInsuranceField
} from '../../actions/AddInsuranceAction'

class AddInsurance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            insuranceCompanyValidater: false,
            insuranceTypeValidater: false,
            insuranceNumValidater: false,
            insuranceMoneyValidater: false,
            insuranceStartDateValidater: false,
            insuranceEndDateValidater: false
        }
    }

    render() {
        console.log(this.state)
        console.log(this.props.addInsuranceReducer)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <Select
                            title='保险公司：'
                            isRequire={true}
                            value={this.props.addInsuranceReducer.data.insure ? this.props.addInsuranceReducer.data.insure : ''}
                            showList={RouterDirection.selectInsurance(this.props.parent)}
                            onValueChange={(param) => this.props.changeInsuranceField({ insureId: param.id, insure: param.value })}
                            onRequire={(flag) => this.setState({ insuranceCompanyValidater: flag })}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='保险险种：'
                            isRequire={true}
                            value={this.props.addInsuranceReducer.data.insureTypeName ? this.props.addInsuranceReducer.data.insureTypeName : ''}
                            showList={RouterDirection.selectInsuranceType(this.props.parent)}
                            onValueChange={(param) => this.props.changeInsuranceField({ insureType: param.id, insureTypeName: param.value })}
                            onRequire={(flag) => this.setState({ insuranceTypeValidater: flag })}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            isRequire={true}
                            title='保单编号：'
                            value={this.props.addInsuranceReducer.data.insureNum ? this.props.addInsuranceReducer.data.insureNum : ''}
                            verifications={[{
                                type: 'isLength',
                                arguments: [0, 40],
                                message: '长度不能超过40位'
                            }]}
                            onValueChange={(param) => this.props.changeInsuranceField({ insureNum: param })}
                            onRequire={(flag) => this.setState({ insuranceNumValidater: flag })}
                            placeholder='请输入保单编号'
                        />
                        <TextBox
                            isRequire={true}
                            title='保单金额：'
                            value={this.props.addInsuranceReducer.data.insureMoney ? this.props.addInsuranceReducer.data.insureMoney : ''}
                            verifications={[{
                                type: 'isMoney',
                                message: '金额只能为数字且不能超过8位'
                            }]}
                            onValueChange={(param) => this.props.changeInsuranceField({ insureMoney: param })}
                            onRequire={(flag) => this.setState({ insuranceMoneyValidater: flag })}
                            placeholder='请输入保单金额'
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <DateTimePicker
                                    isRequire={true}
                                    value={this.props.addInsuranceReducer.data.startDate ? this.props.addInsuranceReducer.data.startDate : ''}
                                    title='保险生效日期：'
                                    defaultValue={'请选择'}
                                    onRequire={(flag) => this.setState({ insuranceStartDateValidater: flag })}
                                    onValueChange={(param) => this.props.changeInsuranceField({ startDate: param })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <DateTimePicker
                                    isRequire={true}
                                    value={this.props.addInsuranceReducer.data.endDate ? this.props.addInsuranceReducer.data.endDate : ''}
                                    title='到：'
                                    defaultValue={'请选择'}
                                    onRequire={(flag) => this.setState({ insuranceEndDateValidater: flag })}
                                    onValueChange={(param) => this.props.changeInsuranceField({ endDate: param })}
                                />
                            </View>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Button
                                full
                                onPress={() => { }}
                                disabled={!(
                                    this.state.insuranceCompanyValidater &&
                                    this.state.insuranceTypeValidater
                                )}

                                style={{
                                    backgroundColor: (
                                        this.state.insuranceCompanyValidater &&
                                        this.state.insuranceTypeValidater
                                    ) ? '#00cade' : '#888888'
                                }}
                            >
                                <Text style={{ color: '#fff' }}>保存</Text>
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
        addInsuranceReducer: state.addInsuranceReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createInsurance: (param) => {
        dispatch(createInsurance(param))
    },
    resetCreateInsurance: () => {
        dispatch(resetCreateInsurance())
    },
    changeInsuranceField: (param) => {
        dispatch(changeInsuranceField(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddInsurance)