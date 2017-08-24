import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'

import DriverListItem from '../components/DriverListItem'
import * as RouterDirection from '../../util/RouterDirection'
import { connect } from 'react-redux'
import { getDriverList } from '../../actions/DriverListAction'

class DriverList extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        initParam: {
            companyId: 40
        }
    }

    componentDidMount() {
        if (this.props.initParam) {
            this.props.getDriverList({ OptionalParam: this.props.initParam })
        }
    }


    render() {
       
        return (
            <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10, backgroundColor: '#eff3f6' }}>
                <FlatList showsVerticalScrollIndicator={false}
                    data={this.props.driverListReducer.data.driverList}
                    renderItem={({ item, i }) => {
                        return (
                            <DriverListItem
                                initParam={item}
                                onPress={() => RouterDirection.driverInfo(this.props.parent)({ initParam: {driverId:item.id}})} />
                        )
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        driverListReducer: state.driverListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverList: (param) => {
        dispatch(getDriverList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverList)