import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'
import TextBox from '../../components/form/TextBox'
import Select from '../../components/form/Select'
import CheckBox from '../../components/form/CheckBox'
import DateTimePicker from '../../components/form/DateTimePicker'
import * as RouterDirection from '../../../util/RouterDirection'
import globalStyles, { styleColor } from '../../GlobalStyles'

export default class Driver extends Component {
    constructor(props) {
        super(props)
        this.onPressSearch = this.onPressSearch.bind(this)
        this.state = {
            driveName: null,
            mobile: null,
            companyId: null,
            company: null,
            truckNum: null,
            driveStatus: null,
            driveStatusValue: null,
            licenseType: null,
            licenseDateStart: null,
            licenseDateEnd: null,
            licenseName: null
        }
    }

    onPressSearch() {
        let param = { ...this.state }
        delete param.company
        delete param.driveStatusValue
        RouterDirection.driverList(this.props.parent)({ initParam: param })
    }

    render() {
        // console.log(this.state)
        return (
            <ScrollView >
                <View style={{ flex: 1 }}>
                    <TextBox
                        title='姓名：'
                        value={this.state.driveName ? this.state.driveName : ''}
                        onValueChange={(param) => this.setState({ driveName: param })}
                        placeholder='请输入姓名'
                    />
                    <TextBox
                        title='联系电话：'
                        value={this.state.mobile ? this.state.mobile : ''}
                        onValueChange={(param) => this.setState({ mobile: param })}
                        placeholder='请输入联系电话'
                    />
                    <Select
                        title='所属公司：'
                        value={this.state.company ? this.state.company : '请选择'}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.setState({ companyId: param.id, company: param.value })}
                    />
                    <Select
                        title='关联货车：'
                        value={this.state.truckNum ? this.state.truckNum : '请选择'}
                        showList={(param) => RouterDirection.selectTruck(this.props.parent)({ ifFilter: false, ...param })}
                        onValueChange={(param) => this.setState({ truckNum: param.value })}
                    />
                    <CheckBox
                        listTitle='所有状态'
                        title='司机状态：'
                        value={this.state.driveStatusValue ? this.state.driveStatusValue : '请选择'}
                        itemList={[{ id: 1, value: '正常' }, { id: 0, value: '停用' }]}
                        onCheck={(param) => this.setState({ driveStatusValue: param.value, driveStatus: param.id })} />
                    <Select
                        title='驾证类型：'
                        value={this.state.licenseName ? this.state.licenseName : '请选择'}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        onValueChange={(param) => this.setState({ licenseType: param.id, licenseName: param.value })}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <DateTimePicker
                                title='检证日期：'
                                value={this.state.licenseDateStart ? this.state.licenseDateStart : '请选择'}
                                onValueChange={(param) => this.setState({ licenseDateStart: param })}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <DateTimePicker
                                value={this.state.licenseDateEnd ? this.state.licenseDateEnd : '请选择'}
                                title='至：'
                                onValueChange={(param) => this.setState({ licenseDateEnd: param })}
                            />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                        <View style={{ paddingHorizontal: 10, flex: 1 }}>
                            <Button full onPress={() => this.setState({
                                driverName: null,
                                mobile: null,
                                companyId: null,
                                company: null,
                                truckNum: null,
                                driveStatus: null,
                                driveStatusValue: null,
                                licenseType: null,
                                licenseDateStart: null,
                                licenseDateEnd: null,
                                licenseName: null
                            })} style={globalStyles.styleBackgroundColor}>
                                <Text style={{ color: '#fff' }}>重置</Text>
                            </Button>
                        </View>
                        <View style={{ paddingHorizontal: 10, flex: 1 }}>
                            <Button full onPress={this.onPressSearch} style={globalStyles.styleBackgroundColor}>
                                <Text style={{ color: '#fff' }}>搜索</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView >

        )
    }
}