import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ScrollView
} from 'react-native'
import TruckListItem from '../components/TruckListItem'
import * as RouterDirection from '../../util/RouterDirection'
import { connect } from 'react-redux'
import { getTruckList } from '../../actions/TruckListAction'

class TruckList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (this.props.initParam) {
            this.props.getTruckList({ OptionalParam: this.props.initParam })
        }
    }

    componentWillReceiveProps(nextProps) {
        let { getTruckList } = nextProps.truckListReducer
        /*getTruckList*/
        if (getTruckList.isExecStatus == 2) {
            if (getTruckList.isResultStatus == 0) {
                console.log('getTruckList执行成功')
            }
            else if (getTruckList.isResultStatus == 1) {
                console.log('getTruckList异常')
            }
            else if (getTruckList.isResultStatus == 2) {
                console.log('getTruckList执行失败')
            }
            else if (getTruckList.isResultStatus == 3) {
                console.log('getTruckList服务器异常')
            }
        }
        /************************************ */
    }

    render() {
        let { truckList } = this.props.truckListReducer.data
        truckList = truckList.map((item, i) => {
            return <TruckListItem
                key={i}
                type={0}
                truckType={0}
                isInspect={true}
                truck={item}
                onPress={() => RouterDirection.truckInfo(this.props.parent)({ initParam: { truckId: item.id, truck_num: item.truck_num, truckType: this.props.initParam.truckType } })}
                isRepair={true}
            />
        })
        return (
            <View style={{ flex: 1, backgroundColor: '#eff3f6' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                        {truckList}
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        truckListReducer: state.truckListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckList: (param) => {
        dispatch(getTruckList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckList)