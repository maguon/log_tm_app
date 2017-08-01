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
import actionTypes from '../../actions/actionTypes'
import { base_host } from '../../config/Host'
import { getAction } from '../../actions/Action'
import { ObjectToUrl } from '../../util/ObjectToUrl'

class TruckList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // console.log(this.props.initParam)
        // console.log(actionTypes)
        //InteractionManager.runAfterInteractions()
        this.props.getTruckList(`${base_host}/truckFirst?${ObjectToUrl(this.props.initParam)}`)
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
                onPress={() => RouterDirection.truckInfo(this.props.parent)({ initParam: { truckId: item.id, truck_num: item.truck_num } })}
                isRepair={true}
            />
        })
        // console.log(truckList)

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
    getTruckList: (url) => {
        dispatch(getAction(actionTypes.truckListActionTypes.truckList, url))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckList)