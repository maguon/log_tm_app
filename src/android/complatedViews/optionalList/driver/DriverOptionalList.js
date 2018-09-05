import React, { Component } from 'react'
import {
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { Container, Spinner, ListItem, Left, Right, Button, Icon } from 'native-base'
import { getFormValues } from 'redux-form'
// import { Button } from 'react-native-vector-icons/dist/Foundation';
// import ListEmptyComponent from '../../../components/share/ListEmptyComponent'


const DriverOptionalList = props => {
    const { onSelect, cleanSelected, selectedItem, driverOptionalListReducer: { data: { driverOptionalList }, getDriverOptionalList }, driverOptionalSearchFormValues } = props
    let list = driverOptionalList
    if (selectedItem) {
        selected = driverOptionalList.find(item => item.id == selectedItem.id)
        selected = {
            ...selected,
            isSelectedItem: true
        }
        noSelectedList = driverOptionalList.filter(item => item.id != selectedItem.id)
        list = [selected, ...noSelectedList]
    }
    if (driverOptionalSearchFormValues && driverOptionalSearchFormValues.driverName) {
        const filterLength = props.driverOptionalSearchFormValues.driverName.length
        list = list
            .filter(item => item.drive_name.toLowerCase().includes(driverOptionalSearchFormValues.driverName.toLowerCase()))
            .map(item => {
                const targetLength = item.drive_name.length
                const postion = item.drive_name.toLowerCase().indexOf(driverOptionalSearchFormValues.driverName.toLowerCase())
                if (postion > 0) {
                    item.driverNameHighLight = {
                        first: {
                            str: item.drive_name.slice(0, postion),
                            isHighLight: false
                        },
                        middle: {
                            str: item.drive_name.slice(postion, postion + filterLength),
                            isHighLight: true
                        },
                        last: {
                            str: item.drive_name.slice(postion + filterLength, targetLength),
                            isHighLight: false
                        }
                    }
                } else {
                    item.driverNameHighLight = {
                        first: {
                            str: item.drive_name.slice(0, filterLength),
                            isHighLight: true
                        },
                        middle: {
                            str: item.drive_name.slice(filterLength, targetLength),
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

    if (getDriverOptionalList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        //
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={list}
                    // ListEmptyComponent={ListEmptyComponent}
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
                                    {driverOptionalSearchFormValues && driverOptionalSearchFormValues.driverName && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.driverNameHighLight.first.isHighLight && <Text style={globalStyles.styleColor}>{item.driverNameHighLight.first.str}</Text>}
                                        {!item.driverNameHighLight.first.isHighLight && <Text>{item.driverNameHighLight.first.str}</Text>}
                                        {item.driverNameHighLight.middle.isHighLight && <Text style={globalStyles.styleColor}>{item.driverNameHighLight.middle.str}</Text>}
                                        {!item.driverNameHighLight.middle.isHighLight && <Text>{item.driverNameHighLight.middle.str}</Text>}
                                        <Text>{item.driverNameHighLight.last.str}</Text>
                                    </Text>}
                                    {(!driverOptionalSearchFormValues || !driverOptionalSearchFormValues.driverName) && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.drive_name}
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

const mapStateToProps = (state) => ({
    driverOptionalListReducer: state.driverOptionalListReducer,
    driverOptionalSearchFormValues: getFormValues('driverOptionalSearchForm')(state)
})

export default connect(mapStateToProps)(DriverOptionalList)