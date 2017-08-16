import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'

import Select from '../../components/form/Select'
import DateTimePicker from '../../components/form/DateTimePicker'
import TextBox from '../../components/form/TextBox'
import CheckBox from '../../components/form/CheckBox'
import * as RouterDirection from '../../../util/RouterDirection'

export default class Truck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            truckType: 1,
            brandIdTruckFirst: '',
            brandNameTruckFirst: '',
            truckNumTruckFirst: '',
            repairStatusTruckFirst: '',
            repairStatusValueTruckFirst: '',
            companyIdTruckFirst: '',
            companyNameTruckFirst: '',
            drivingDateStartTruckFirst: '',
            drivingDateEndTruckFirst: '',
            licenseDateStartTruckFirst: '',
            licenseDateEndTruckFirst: '',

            truckNumTruckTrailer: '',
            repairStatusTruckTrailer: '',
            repairStatusValueTruckTrailer: '',
            companyIdTruckTrailer: '',
            companyNameTruckTrailer: '',
            drivingDateStartTruckTrailer: '',
            drivingDateEndTruckTrailer: '',
            licenseDateStartTruckTrailer: '',
            licenseDateEndTruckTrailer: '',
        }
        this.onPressSegment = this.onPressSegment.bind(this)
        this.renderTruckFirst = this.renderTruckFirst.bind(this)
        this.onShowTruckFirstList = this.onShowTruckFirstList.bind(this)
        this.onShowTruckTrailerList = this.onShowTruckTrailerList.bind(this)
    }

    onPressSegment(index) {
        if (this.state.truckType != index)
            this.setState({ truckType: index })
    }

    onShowTruckFirstList() {
        console.log({
            truckNum: this.state.truckNumTruckFirst,
            brandId: this.state.brandIdTruckFirst,
            companyId: this.state.companyIdTruckFirst,
            repairStatus: this.state.repairStatusTruckFirst,
            drivingDateStart: this.state.drivingDateStartTruckFirst,
            drivingDateEnd: this.state.drivingDateEndTruckFirst,
            licenseDateStart: this.state.licenseDateStartTruckFirst,
            licenseDateEnd: this.state.licenseDateEndTruckFirst
        })
        //RouterDirection.truckList(this.props.parent)
        //RouterDirection.truckList(this.props.parent)
    }

    onShowTruckTrailerList() {
       console.log({
            truckNum: this.state.truckNumTruckTrailer,
            companyId: this.state.companyIdTruckTrailer,
            repairStatus: this.state.repairStatusTruckTrailer,
            drivingDateStart: this.state.drivingDateStartTruckTrailer,
            drivingDateEnd: this.state.drivingDateEndTruckTrailer,
            licenseDateStart: this.state.licenseDateStartTruckTrailer,
            licenseDateEnd: this.state.licenseDateEndTruckTrailer
        })
    }

    renderTruckFirst() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <TextBox
                        title='车牌：'
                        value={this.state.truckNumTruckFirst}
                        defaultValue={''}
                        onValueChange={(param) => this.setState({ truckNumTruckFirst: param })}
                        placeholder='请输入车牌'
                    />
                    <Select
                        title='品牌：'
                        value={this.state.brandNameTruckFirst}
                        showList={RouterDirection.selectMake(this.props.parent)}
                        onValueChange={(param) => this.setState({ brandIdTruckFirst: param.id, brandNameTruckFirst: param.value })}
                        defaultValue={'请选择'}
                    />
                    <Select
                        title='车辆所属：'
                        value={this.state.companyNameTruckFirst}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.setState({ companyIdTruckFirst: param.id, companyNameTruckFirst: param.value })}
                        defaultValue={'请选择'}
                    />
                    <CheckBox listTitle='维修状态' title='维修状态：' value={this.state.repairStatusValueTruckFirst ? this.state.repairStatusValueTruckFirst : '请选择'} itemList={[{ id: 0, value: '正常' }, { id: 1, value: '维修' }]}
                        onCheck={(param) => this.setState({ repairStatusTruckFirst: param.id, repairStatusValueTruckFirst: param.value })} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                            <DateTimePicker
                                isRequire={false}
                                title='营运证检证日期：'
                                value={this.state.licenseDateStartTruckFirst}
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.setState({ licenseDateStartTruckFirst: param })}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <DateTimePicker
                                isRequire={false}
                                value={this.state.licenseDateEndTruckFirst}
                                title='至：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.setState({ licenseDateEndTruckFirst: param })}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                            <DateTimePicker
                                isRequire={false}
                                title='行驶证检证日期：'
                                defaultValue={'请选择'}
                                value={this.state.drivingDateStartTruckFirst}
                                onValueChange={(param) => this.setState({ drivingDateStartTruckFirst: param })}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <DateTimePicker
                                isRequire={false}
                                value={this.state.drivingDateEndTruckFirst}
                                title='至：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.setState({ drivingDateEndTruckFirst: param })}
                            />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button full onPress={this.onShowTruckFirstList} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>搜索</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    renderTruckTrailer() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <TextBox
                        title='车牌：'
                        value={this.state.truckNumTruckTrailer}
                        defaultValue={''}
                        onValueChange={(param) => this.setState({ truckNumTruckTrailer: param })}
                        placeholder='请输入车牌'
                    />
                    <Select
                        title='车辆所属：'
                        value={this.state.companyNameTruckTrailer}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.setState({ companyIdTruckTrailer: param.id, companyNameTruckTrailer: param.value })}
                        defaultValue={'请选择'}
                    />
                    <CheckBox listTitle='维修状态' title='维修状态：' value={this.state.repairStatusValueTruckTrailer ? this.state.repairStatusValueTruckTrailer : '请选择'} itemList={[{ id: 0, value: '正常' }, { id: 1, value: '维修' }]}
                        onCheck={(param) => this.setState({ repairStatusTruckTrailer: param.id, repairStatusValueTruckTrailer: param.value })} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                            <DateTimePicker
                                isRequire={false}
                                title='营运证检证日期：'
                                value={this.state.licenseDateStartTruckTrailer}
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.setState({ licenseDateStartTruckTrailer: param })}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <DateTimePicker
                                isRequire={false}
                                value={this.state.licenseDateEndTruckTrailer}
                                title='至：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.setState({ licenseDateEndTruckTrailer: param })}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                            <DateTimePicker
                                isRequire={false}
                                title='行驶证检证日期：'
                                defaultValue={'请选择'}
                                value={this.state.drivingDateStartTruckTrailer}
                                onValueChange={(param) => this.setState({ drivingDateStartTruckTrailer: param })}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <DateTimePicker
                                isRequire={false}
                                value={this.state.drivingDateEndTruckTrailer}
                                title='至：'
                               // defaultValue={this.state.drivingDateEndTruckTrailer}
                                onValueChange={(param) => this.setState({ drivingDateEndTruckTrailer: param })}
                            />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button full onPress={this.onShowTruckTrailerList} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>搜索</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        console.log(this.state)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 30, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.truckType == 1 ? '#fff' : '#00cade' }}>车头</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.truckType == 2 ? '#fff' : '#00cade' }}>挂车</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                    {this.state.truckType == 1 && this.renderTruckFirst()}
                    {this.state.truckType == 2 && this.renderTruckTrailer()}
                </View>
            </View>
        )
    }
}