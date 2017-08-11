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
import * as RouterDirection from '../../util/RouterDirection'

export default class AddInsurance extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <Select
                            title='保险公司：'
                            isRequire={true}
                            value={''}
                            showList={RouterDirection.selectInsurance(this.props.parent)}
                            onValueChange={(param) => { console.log(param) }}
                            onRequire={(flag) => { console.log(flag) }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='保险险种：'
                            isRequire={true}
                            value={''}
                            showList={RouterDirection.selectInsuranceType(this.props.parent)}
                            onValueChange={(param) => { console.log(param) }}
                            onRequire={(flag) => { console.log(flag) }}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            isRequire={true}
                            title='保单编号：'
                            value={''}
                            verifications={[{
                                type: 'isVehicleNumber',
                                message: '不是车牌号'
                            }]}
                            onValueChange={(param) => { }}
                            onRequire={(flag) => { }}
                            placeholder='请输入车牌号码'
                        />
                        <TextBox
                            isRequire={true}
                            title='保单金额：'
                            value={''}
                            verifications={[{
                                type: 'isVehicleNumber',
                                message: '不是车牌号'
                            }]}
                            onValueChange={(param) => { console.log(param) }}
                            onRequire={(flag) => { }}
                            placeholder='请输入车牌号码'
                        />
                        <DateTimePicker
                            isRequire={true}
                            value={''}
                            title='投保日期：'
                            defaultValue={'请选择'}
                            onRequire={(flag) => { console.log(flag) }}
                            onValueChange={(param) => { console.log(param) }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <DateTimePicker
                                    isRequire={true}
                                    value={''}
                                    title='保险生效日期：'
                                    defaultValue={'请选择'}
                                    onRequire={(flag) => { console.log(flag) }}
                                    onValueChange={(param) => { console.log(param) }}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <DateTimePicker
                                    isRequire={true}
                                    value={''}
                                    title='到：'
                                    defaultValue={'请选择'}
                                    onRequire={(flag) => { console.log(flag) }}
                                    onValueChange={(param) => { console.log(param) }}
                                />
                            </View>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Button
                                full
                                onPress={() => { }}
                            /* disabled={!(
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
                                ) ? '#00cade' : '#888888'}}*/
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