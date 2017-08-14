import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import StepIndicator from '../../components/StepIndicator'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

class Fourth extends Component {
    constructor(props) {
        super(props)
        this.renderInsuranceList = this.renderInsuranceList.bind(this)
    }

    renderInsuranceList() {
        let insuranceList = this.props.addTruckFourthReducer.data.insuranceLsit.map((item, i) => {
            return (
                <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10, marginTop: 10, backgroundColor: '#fff', borderColor: '#e8e8e8', borderWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', alignItems: 'flex-end' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#00cade' }}>交强险</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 11 }}>编号：123456789012345</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11 }}>保险公司：中国人保</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11 }}>投保日期：2013-02-13</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 11 }}>生效期 2017-02-13 到：2018-02-13</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11 }}>¥ <Text style={{ color: 'red' }}>4600.5</Text>元</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return insuranceList
    }


    render() {
        console.log(this.props.addTruckFourthReducer.data.insuranceLsit)
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator
                    stepList={[{ step: '1', title: '基本信息' },
                    { step: '2', title: '关联信息' },
                    { step: '3', title: '上传照片' },
                    { step: '4', title: '车保信息' }]}
                    current={3} />
                <View style={{ backgroundColor: '#edf1f4' }}>
                    <FlatList showsVerticalScrollIndicator={false}
                        data={this.renderInsuranceList()}
                        renderItem={({ item }) => item}
                    />

                    <View style={{ paddingVertical: 10, paddingHorizontal: 10, backgroundColor: '#fff', marginTop: 10 }}>
                        <Button
                            small
                            onPress={Actions.addInsurance}
                            style={{ backgroundColor: '#00cade', alignSelf: 'flex-end' }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>增加保单</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addTruckFourthReducer: state.addTruckFourthReducer
    }
}

const mapDispatchToProps = (dispatch) => ({


})

export default connect(mapStateToProps, mapDispatchToProps)(Fourth)