import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Spinner, Left, Icon, Right, ListItem } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { Actions } from 'react-native-router-flux'

const InsureCompanyOptionalList = props => {
    console.log('props', props)
    const { insureCompanyOptionalListReducer: { data: { insureCompanyOptionalList }, getInsureCompanyOptionalList },
        onSelect, cleanSelected, selectedItem } = props
    let list = insureCompanyOptionalList
    if (selectedItem) {
        selected = insureCompanyOptionalList.find(item => item.id == selectedItem.id)
        selected = {
            ...selected,
            isSelectedItem: true
        }
        noSelectedList = insureCompanyOptionalList.filter(item => item.id != selectedItem.id)
        list = [selected, ...noSelectedList]
    }
    if (getInsureCompanyOptionalList.isResultStatus == 1) {
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
                    renderItem={({ item }) => {
                        return (
                            <ListItem onPress={() => onSelect(item)}>
                                <Left>
                                    <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>{item.insure_name}</Text>
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
}

const mapStateToProps = (state) => ({
    insureCompanyOptionalListReducer: state.insureCompanyOptionalListReducer
})

export default connect(mapStateToProps)(InsureCompanyOptionalList)