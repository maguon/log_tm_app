import React from 'react'
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Container, Spinner, ListItem, Left, Icon, Right } from 'native-base'
import { getFormValues } from 'redux-form'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { Actions } from 'react-native-router-flux'


const RepairStationOptionalList = props => {
    const { repairStationOptionalListReducer: { data: { repairStationOptionalList }, getRepairStationOptionalList },
        onSelect, cleanSelected = () => { }, selectedItem, repairStationOptionalSearchFormValues } = props

    let list = repairStationOptionalList
    if (selectedItem) {
        selected = repairStationOptionalList.find(item => item.id == selectedItem.id)
        selected = {
            ...selected,
            isSelectedItem: true
        }
        noSelectedList = repairStationOptionalList.filter(item => item.id != selectedItem.id)
        list = [selected, ...noSelectedList]
    }

    if (repairStationOptionalSearchFormValues && repairStationOptionalSearchFormValues.repairStation) {
        const filterLength = repairStationOptionalSearchFormValues.repairStation.length
        list = list
            .filter(item => item.repair_station_name.toLowerCase().includes(repairStationOptionalSearchFormValues.repairStation.toLowerCase()))
            .map(item => {
                const targetLength = item.repair_station_name.length
                const postion = item.repair_station_name.toLowerCase().indexOf(repairStationOptionalSearchFormValues.repairStation.toLowerCase())
                if (postion > 0) {
                    item.highLight = {
                        first: {
                            str: item.repair_station_name.slice(0, postion),
                            isHighLight: false
                        },
                        middle: {
                            str: item.repair_station_name.slice(postion, postion + filterLength),
                            isHighLight: true
                        },
                        last: {
                            str: item.repair_station_name.slice(postion + filterLength, targetLength),
                            isHighLight: false
                        }
                    }
                } else {
                    item.highLight = {
                        first: {
                            str: item.repair_station_name.slice(0, filterLength),
                            isHighLight: true
                        },
                        middle: {
                            str: item.repair_station_name.slice(filterLength, targetLength),
                            isHighLight: false
                        },
                        last: {
                            str: '',
                            isHighLight: false
                        }
                    }
                }
                return item
            })
    }

    if (getRepairStationOptionalList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={list}
                    //ListEmptyComponent={ListEmptyComponent}
                    renderItem={({ item, index }) => {
                        return (
                            <ListItem key={index}
                                onPress={() => {
                                    if (!item.isSelectedItem) {
                                        onSelect(item)
                                        Actions.pop()
                                    }
                                }}>
                                <Left>
                                    {repairStationOptionalSearchFormValues && repairStationOptionalSearchFormValues.repairStation && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.highLight.first.isHighLight && <Text style={globalStyles.styleColor}>{item.highLight.first.str}</Text>}
                                        {!item.highLight.first.isHighLight && <Text>{item.highLight.first.str}</Text>}
                                        {item.highLight.middle.isHighLight && <Text style={globalStyles.styleColor}>{item.highLight.middle.str}</Text>}
                                        {!item.highLight.middle.isHighLight && <Text>{item.highLight.middle.str}</Text>}
                                        <Text>{item.highLight.last.str}</Text>
                                    </Text>}
                                    {(!repairStationOptionalSearchFormValues || !repairStationOptionalSearchFormValues.repairStation) && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.repair_station_name}
                                    </Text>}
                                </Left>
                                {item.isSelectedItem && <Right>
                                    <TouchableOpacity onPress={() => {
                                        Actions.refresh({ selectedItem: null })
                                        cleanSelected()
                                    }}>
                                        <Icon name='ios-close-circle-outline' style={{ color: '#188df2' }} />
                                    </TouchableOpacity >
                                </Right>}
                            </ListItem>
                        )
                    }}
                />
            </Container>
        )
    }
}



const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})


const mapStateToProps = (state) => {
    return {
        repairStationOptionalListReducer: state.repairStationOptionalListReducer,
        repairStationOptionalSearchFormValues: getFormValues('repairStationOptionalSearchForm')(state)
    }
}


export default connect(mapStateToProps)(RepairStationOptionalList) 
