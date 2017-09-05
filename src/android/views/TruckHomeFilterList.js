import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ScrollView,
    TouchableNativeFeedback,
    Image
} from 'react-native'
import TruckListItem from '../components/TruckListItem'
import * as RouterDirection from '../../util/RouterDirection'
import { connect } from 'react-redux'
import { getTruckHomeFilterList, resetGetTruckHomeFilterList } from '../../actions/TruckHomeFilterListAction'
import FontTag from '../components/tag/FontTag'

class TruckHomeFilterList extends Component {
    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        this.onPressItem = this.onPressItem.bind(this)
    }
    componentDidMount() {
        if (this.props.initParam) {
            this.props.getTruckHomeFilterList({ OptionalParam: this.props.initParam })
        }
    }

    componentWillReceiveProps(nextProps) {
        let { getTruckHomeFilterList } = nextProps.truckHomeFilterListReducer
        /*getTruckList*/
        if (getTruckHomeFilterList.isExecStatus == 2) {
            if (getTruckHomeFilterList.isResultStatus == 0) {
                this.props.resetGetTruckHomeFilterList()
                console.log('getTruckHomeFilterList执行成功')
            }
            else if (getTruckHomeFilterList.isResultStatus == 1) {
                this.props.resetGetTruckHomeFilterList()
                console.log('getTruckHomeFilterList异常')
            }
            else if (getTruckHomeFilterList.isResultStatus == 2) {
                this.props.resetGetTruckHomeFilterList()
                console.log('getTruckHomeFilterList执行失败')
            }
            else if (getTruckHomeFilterList.isResultStatus == 3) {
                this.props.resetGetTruckHomeFilterList()
                console.log('getTruckHomeFilterList服务器异常')
            }
        }
        /************************************ */
    }

    onPressItem(item) {
       RouterDirection.truckInfo(this.props.parent)( { initParam: { truckId: item.id, truck_num: item.truck_num, truckType: item.truck_type } })
    }

    renderItem(item, i) {
        if (item.driving_date) {
            confirmFlag = (Date.parse(new Date(item.driving_date))) < (Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000*3)
        }
        return (
            <TouchableNativeFeedback key={i} onPress={()=>this.onPressItem(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ backgroundColor: '#fff', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: 30, alignSelf: 'flex-start', flex: 1 }}>
                        {item.truck_type == 2 && <Image source={{ uri: 'truck_tail' }} style={{ width: 30, height: 30 }} />}
                        {item.truck_type == 1 && <Image source={{ uri: 'truck_head' }} style={{ width: 30, height: 30 }} />}
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, alignSelf: 'center', flex: 1 }}>
                        {item.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                        {item.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                        {item.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                        {item.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                    </View>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10, flex: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ lineHeight: 18, fontSize: 18, color: '#00cade' }}>{item.truck_num}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Text style={{ fontSize: 12, color: '#b9c8cf', flex: 1 }}>{item.company_name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: 62, flex: 2 }}>
                        {confirmFlag && <View style={{ paddingVertical: 10, paddingLeft: 10, alignSelf: 'flex-end' }}>
                            <FontTag size={16} title='检' color='#f87775' fontColor='#fff' />
                        </View>}
                        {item.repair_status == 0 && <View style={{ paddingVertical: 10, paddingHorizontal: 10, alignSelf: 'flex-end' }}>
                            <FontTag size={16} title='修' color='#f8cc71' fontColor='#fff' />
                        </View>}
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        let { truckList } = this.props.truckHomeFilterListReducer.data
        truckList = truckList.map((item, i) => {
            return this.renderItem(item, i)
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
        truckHomeFilterListReducer: state.truckHomeFilterListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckHomeFilterList: (param) => {
        dispatch(getTruckHomeFilterList(param))
    },
    resetGetTruckHomeFilterList: () => {
        dispatch(resetGetTruckHomeFilterList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckHomeFilterList)