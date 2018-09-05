import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, ListItem, Icon, Left, Right } from 'native-base'
import insuranceTypeList from '../../../config/insuranceType.json'
import globalStyles from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'

const InsureTypeOptionlList = props => {
    const { onSelect, cleanSelected = () => { }, selectedItem } = props
    let list = insuranceTypeList
    if (selectedItem) {
        selected = insuranceTypeList.find(item => item.id == selectedItem.id)
        selected = {
            ...selected,
            isSelectedItem: true
        }
        noSelectedList = insuranceTypeList.filter(item => item.id != selectedItem.id)
        list = [selected, ...noSelectedList]
    }
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => index}
                data={list}
                renderItem={({ item }) => {
                    return (
                        <ListItem onPress={() => onSelect(item)}>
                            <Left>
                                <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>{item.insuranceType}</Text>
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
                }} />
        </Container>
    )
}

export default InsureTypeOptionlList