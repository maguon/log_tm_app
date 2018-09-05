import React from 'react'
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Container, Spinner, ListItem, Left, Icon, Right } from 'native-base'
import { getFormValues } from 'redux-form'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import user_role from '../../../../util/user_role.json'
import { Actions } from 'react-native-router-flux'


const UserOptionalList = props => {
    const { userOptionalListReducer: { data: { userOptionalList }, getUserOptionalList },
        onSelect, cleanSelected = () => { }, selectedItem, userOptionalSearchFormValues } = props
    const userRole = new Map(user_role)

    let list = userOptionalList
    if (selectedItem) {
        selected = userOptionalList.find(item => item.uid == selectedItem.id)
        selected = {
            ...selected,
            isSelectedItem: true
        }
        noSelectedList = userOptionalList.filter(item => item.uid != selectedItem.id)
        list = [selected, ...noSelectedList]
    }

    if (userOptionalSearchFormValues && userOptionalSearchFormValues.userName) {
        const filterLength = userOptionalSearchFormValues.userName.length
        list = list
            .filter(item => item.real_name.toLowerCase().includes(userOptionalSearchFormValues.userName.toLowerCase()))
            .map(item => {
                const targetLength = item.real_name.length
                const postion = item.real_name.toLowerCase().indexOf(userOptionalSearchFormValues.userName.toLowerCase())
                if (postion > 0) {
                    item.highLight = {
                        first: {
                            str: item.real_name.slice(0, postion),
                            isHighLight: false
                        },
                        middle: {
                            str: item.real_name.slice(postion, postion + filterLength),
                            isHighLight: true
                        },
                        last: {
                            str: item.real_name.slice(postion + filterLength, targetLength),
                            isHighLight: false
                        }
                    }
                } else {
                    item.highLight = {
                        first: {
                            str: item.real_name.slice(0, filterLength),
                            isHighLight: true
                        },
                        middle: {
                            str: item.real_name.slice(filterLength, targetLength),
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

    if (getUserOptionalList.isResultStatus == 1) {
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
                                    {userOptionalSearchFormValues && userOptionalSearchFormValues.userName && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.highLight.first.isHighLight && <Text style={globalStyles.styleColor}>{item.highLight.first.str}</Text>}
                                        {!item.highLight.first.isHighLight && <Text>{item.highLight.first.str}</Text>}
                                        {item.highLight.middle.isHighLight && <Text style={globalStyles.styleColor}>{item.highLight.middle.str}</Text>}
                                        {!item.highLight.middle.isHighLight && <Text>{item.highLight.middle.str}</Text>}
                                        <Text>{item.highLight.last.str}</Text>
                                    </Text>}
                                    {(!userOptionalSearchFormValues || !userOptionalSearchFormValues.userName) && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.real_name}    {`(${userRole.get(item.type)})`}
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
        userOptionalListReducer: state.userOptionalListReducer,
        userOptionalSearchFormValues: getFormValues('userOptionalSearchForm')(state)
    }
}


export default connect(mapStateToProps)(UserOptionalList) 
