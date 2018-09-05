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


const TruckOptionalList = props => {
    const { onSelect, cleanSelected, selectedItem, truckOptionalListReducer: { data: { truckOptionalList }, getTruckOptionalList }, formValues } = props
    let list = truckOptionalList
    if (selectedItem) {
        selected = truckOptionalList.find(item => item.id == selectedItem.id)
        selected = {
            ...selected,
            isSelectedItem: true
        }
        noSelectedList = truckOptionalList.filter(item => item.id != selectedItem.id)
        list = [selected, ...noSelectedList]
    }
    if (formValues && formValues.truckNum) {
        const filterLength = formValues.truckNum.length
        list = list
            .filter(item => item.truck_num.toLowerCase().includes(formValues.truckNum.toLowerCase()))
            .map(item => {
                const targetLength = item.truck_num.length
                const postion = item.truck_num.toLowerCase().indexOf(formValues.truckNum.toLowerCase())
                if (postion > 0) {
                    item.truckNameHighLight = {
                        first: {
                            str: item.truck_num.slice(0, postion),
                            isHighLight: false
                        },
                        middle: {
                            str: item.truck_num.slice(postion, postion + filterLength),
                            isHighLight: true
                        },
                        last: {
                            str: item.truck_num.slice(postion + filterLength, targetLength),
                            isHighLight: false
                        }
                    }
                } else {
                    item.truckNameHighLight = {
                        first: {
                            str: item.truck_num.slice(0, filterLength),
                            isHighLight: true
                        },
                        middle: {
                            str: item.truck_num.slice(filterLength, targetLength),
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

    if (getTruckOptionalList.isResultStatus == 1) {
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
                                    {formValues && formValues.truckNum && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.truckNameHighLight.first.isHighLight && <Text style={globalStyles.styleColor}>{item.truckNameHighLight.first.str}</Text>}
                                        {!item.truckNameHighLight.first.isHighLight && <Text>{item.truckNameHighLight.first.str}</Text>}
                                        {item.truckNameHighLight.middle.isHighLight && <Text style={globalStyles.styleColor}>{item.truckNameHighLight.middle.str}</Text>}
                                        {!item.truckNameHighLight.middle.isHighLight && <Text>{item.truckNameHighLight.middle.str}</Text>}
                                        <Text>{item.truckNameHighLight.last.str}</Text>
                                    </Text>}
                                    {(!formValues || !formValues.truckNum) && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.truck_num}
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
    truckOptionalListReducer: state.truckOptionalListReducer,
    formValues: getFormValues('truckOptionalSearchForm')(state)
})

export default connect(mapStateToProps)(TruckOptionalList)