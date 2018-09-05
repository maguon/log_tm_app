import React from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager, StyleSheet, ActivityIndicator } from 'react-native'
import { Container, Content, Card, CardItem, Body, Icon, Spinner } from "native-base"
import globalStyles, { styleColor } from '../../GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as  actions from '../../../actions'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

const renderItem = props => {
    const { item: { accident_explain, address, accident_date, id, truck_num, accident_status, drive_name, truck_type, dp_route_task_id }, item,
        getDpRouteTaskForAccidentEditorWaiting, getDpRouteTaskForAccidentEditor, getAccidentIndemnifyList, getAccidentIndemnifyListWaiting,
        getAccidentDisposeInfoWaiting, getAccidentDisposeInfo, getAccidentRepairList, getAccidentRepairListWaiting, getImageForAccidentInfo, getImageForAccidentInfoWaiting } = props
    return (
        <TouchableOpacity onPress={() => {
            getDpRouteTaskForAccidentEditorWaiting()
            getAccidentDisposeInfoWaiting()
            getAccidentIndemnifyListWaiting()
            getAccidentRepairListWaiting()
            getImageForAccidentInfoWaiting()
            Actions.accidentInfo({ initParam: { accidentId: id } })
            InteractionManager.runAfterInteractions(() => {
                getAccidentDisposeInfo({ accidentId: id })
                getAccidentIndemnifyList({ accidentId: id })
                getAccidentRepairList({ accidentId: id })
                getDpRouteTaskForAccidentEditor(item)
                getImageForAccidentInfo({ accidentId: id })

            })
        }}>
            <Card style={{ backgroundColor: '#fff' }} >
                <CardItem header style={{ justifyContent: 'space-between', borderBottomWidth: 0.5 }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>事故编号：{id ? `${id}` : ''}</Text>
                    {accident_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>待处理</Text>}
                    {accident_status == 2 && <Text style={[globalStyles.midText, globalStyles.styleColor]}>处理中</Text>}
                    {accident_status == 3 && <Text style={globalStyles.midText}>已处理</Text>}
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='truck' />
                            <Text style={[globalStyles.smallText, { paddingLeft: 5 }]}>{truck_num ? `${truck_num}` : ''}（{truck_type == 1 ? '车头' : '挂车'}   {drive_name ? `${drive_name}` : ''}）</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='clock' />
                            <Text style={[globalStyles.smallText, { paddingLeft: 5 }]}>{accident_date ? `${moment(accident_date).format('YYYY-MM-DD')}` : ''}</Text>
                        </View>
                    </Body>
                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker' />
                        <Text numberOfLines={1} style={[globalStyles.smallText, { paddingLeft: 5 }]}>{address ? `${address}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='alert-circle' />
                        <Text numberOfLines={1} style={[globalStyles.smallText, { paddingLeft: 5 }]}>{accident_explain ? `${accident_explain}` : ''}</Text>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>

    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无事故记录</Text>
        </View>
    )
}


const AccidentList = props => {
    const { accidentListReducer: { data: { accidentList, isComplete }, getAccidentList }, accidentListReducer,
        getDpRouteTaskForAccidentEditorWaiting, getDpRouteTaskForAccidentEditor, getAccidentIndemnifyList, getAccidentIndemnifyListWaiting,
        getAccidentDisposeInfoWaiting, getAccidentDisposeInfo, getAccidentRepairList, getAccidentRepairListWaiting,
        getImageForAccidentInfo, getImageForAccidentInfoWaiting, getAccidentListMore } = props
    if (getAccidentList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container style={{ backgroundColor: '#f5f5f5' }}>
                <FlatList
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ padding: 7.5 }}
                    data={accidentList}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={accidentListReducer.getAccidentListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    ListEmptyComponent={renderEmpty}
                    onEndReached={() => {
                        if (getAccidentList.isResultStatus == 2 && !isComplete) {
                            getAccidentListMore()
                        }
                    }}
                    renderItem={({ item }) => renderItem({
                        item, getDpRouteTaskForAccidentEditorWaiting, getDpRouteTaskForAccidentEditor,
                        getAccidentDisposeInfoWaiting, getAccidentDisposeInfo, getAccidentIndemnifyList, getAccidentIndemnifyListWaiting,
                        getAccidentRepairList, getAccidentRepairListWaiting, getImageForAccidentInfo, getImageForAccidentInfoWaiting
                    })}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})

const mapStateToProps = (state) => {
    return {
        accidentListReducer: state.accidentListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAccidentListMore: () => {
        dispatch(actions.accidentList.getAccidentListMore())
    },
    getDpRouteTaskForAccidentEditor: param => {
        dispatch(actions.accidentEditor.getDpRouteTaskForAccidentEditor(param))
    },
    getDpRouteTaskForAccidentEditorWaiting: () => {
        dispatch(actions.accidentEditor.getDpRouteTaskForAccidentEditorWaiting())
    },
    getAccidentDisposeInfoWaiting: () => {
        dispatch(actions.accidentInfo.getAccidentDisposeInfoWaiting())
    },
    getAccidentDisposeInfo: param => {
        dispatch(actions.accidentInfo.getAccidentDisposeInfo(param))
    },
    getAccidentIndemnifyListWaiting: () => {
        dispatch(actions.accidentIndemnifyList.getAccidentIndemnifyListWaiting())
    },
    getAccidentIndemnifyList: param => {
        dispatch(actions.accidentIndemnifyList.getAccidentIndemnifyList(param))
    },
    getAccidentRepairList: param => {
        dispatch(actions.accidentRepairList.getAccidentRepairList(param))
    },
    getAccidentRepairListWaiting: () => {
        dispatch(actions.accidentRepairList.getAccidentRepairListWaiting())
    },
    getImageForAccidentInfo: param => {
        dispatch(actions.uploadImageForAccidentInfo.getImageForAccidentInfo(param))

    },
    getImageForAccidentInfoWaiting: () => {
        dispatch(actions.uploadImageForAccidentInfo.getImageForAccidentInfoWaiting())
    },
    // getAccidentListMore:()=>{
    //     dispatch(actions.accidentList.getAccidentListMore())
    // }

})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentList)
