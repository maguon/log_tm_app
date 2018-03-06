import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    StyleSheet
} from 'react-native'
import TruckListItem from '../components/TruckListItem'
import * as RouterDirection from '../../util/RouterDirection'
import { connect } from 'react-redux'
import * as truckHomeFilterListAction from '../../actions/TruckHomeFilterListAction'
import FontTag from '../components/tag/FontTag'
import ListEmpty from '../components/share/flatList/ListEmpty'
import ListFooter from '../components/share/flatList/ListFooter'
import { Spinner, Container } from 'native-base'
import globalStyles, { styleColor } from '../GlobalStyles'

const renderItem = props => {
    const { item, index, parent } = props
    let confirmFlag
    if (item.driving_date) {
        confirmFlag = (Date.parse(new Date(item.driving_date))) < (Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000 * 3)
    }
    return (
        <TouchableOpacity
            key={index}
            onPress={() => {
                RouterDirection.truckInfo(parent)({ initParam: { truckId: item.id, truck_num: item.truck_num, truckType: item.truck_type } })
            }}
            style={styles.itemContainer}>
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
        </TouchableOpacity>
    )
}


const TruckHomeFilterList = props => {
    const { truckHomeFilterListReducer: { data: { truckList, isComplete }, getTruckHomeFilterList },
        truckHomeFilterListReducer, parent, getTruckHomeFilterListMore, initParam } = props
    if (getTruckHomeFilterList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={[globalStyles.listBackgroundColor]}>
                <FlatList
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={truckList}
                    renderItem={itemProps => renderItem({ parent, ...itemProps })}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getTruckHomeFilterList.isResultStatus == 2 && !isComplete) {
                            getTruckHomeFilterListMore({ OptionalParam: initParam })
                        }
                    }}
                    ListEmptyComponent={ListEmpty}
                    ListFooterComponent={truckHomeFilterListReducer.getTruckHomeFilterListMore.isResultStatus == 1 ? ListFooter : <View style={{ height: 10 }} />}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        truckHomeFilterListReducer: state.truckHomeFilterListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckHomeFilterListMore: (param) => {
        dispatch(truckHomeFilterListAction.getTruckHomeFilterListMore(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckHomeFilterList)

const styles = StyleSheet.create({
    flatList: {
        padding: 5
    },
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#eee',
        borderWidth: 0.3,
        margin: 5
    }
})