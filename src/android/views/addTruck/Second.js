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
    }

    static defaultProps = {
        initParam: {
            truckId: 172,
            type: 1
        }
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
                        showList={RouterDirection.selectTractor(this.props.parent)}
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