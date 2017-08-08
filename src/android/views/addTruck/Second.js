import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import Select from '../../components/form/Select'
import { connect } from 'react-redux'
import * as RouterDirection from '../../../util/RouterDirection'

class Second extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
    }

    static defaultProps = {
        initParam: {
            truckId: 172,
            type: 1
        }
    }

    onSelect(param) {
        console.log(param)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator
                    stepList={[{ step: '1', title: '基本信息' },
                    { step: '2', title: '关联信息' },
                    { step: '3', title: '上传照片' },
                    { step: '4', title: '车保信息' }]}
                    current={1} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Select
                        title='关联挂车：'
                        isRequire={false}
                        value={''}
                        showList={RouterDirection.selectTruck(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ companyId: param.id, companyName: param.value })}
                        onRequire={(flag) => this.setState({ companyIdValidater: flag })}
                        defaultValue={'请选择'}
                    />
                    <Select
                        title='关联司机：'
                        isRequire={false}
                        value={''}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.onSelect({ companyId: param.id, companyName: param.value })}
                        onRequire={(flag) => this.setState({ companyIdValidater: flag })}
                        defaultValue={'请选择'}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联挂车：辽B12345</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联司机：张宝全</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createTruckFirst: (param) => {

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Second)