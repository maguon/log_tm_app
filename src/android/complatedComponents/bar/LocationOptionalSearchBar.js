import React from 'react'
import { Header, Button, Icon, Left, Body, Right } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

const TextBox = props => {
    const { input: { onChange, ...restProps }, getLocationOptionalList, getLocationOptionalListWaiting } = props
    return (
        <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                placeholderTextColor='#000'
                style={[globalStyles.midText, styles.input]}
                onChangeText={onChange}
                {...restProps} />
            <TouchableOpacity onPress={() => {
                console.log('restProps', restProps)
                if (restProps.value) {
                    getLocationOptionalListWaiting()
                    getLocationOptionalList({ keyword: restProps.value })
                }
            }}>
                <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
            </TouchableOpacity>
        </View>
    )
}

const DriverOptionalSearchBar = props => {
    const { layout, getLocationOptionalList, getLocationOptionalListWaiting, onSelect,
        locationOptionalListReducer: { data: { currentLocation } } } = props
    // console.log('onSelect', onSelect)
    return (
        <View style={[styles.container, { width: layout.initWidth }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={styleColor}
                style={globalStyles.styleBackgroundColor}>
                <Left style={styles.left}>
                    <Button transparent onPress={() => {
                        Actions.pop()
                    }}>
                        <Icon name="arrow-back" style={styles.leftIcon} />
                    </Button>
                </Left>
                <Body style={styles.body}>
                    <Field
                        name='keyWords'
                        component={TextBox}
                        getLocationOptionalList={getLocationOptionalList}
                        getLocationOptionalListWaiting={getLocationOptionalListWaiting}
                    />
                </Body>
                <Right>
                    <Button transparent onPress={() => {
                        if (currentLocation) {
                            onSelect(currentLocation)
                        }
                    }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>选定</Text>
                    </Button>
                </Right>
            </Header>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        locationOptionalListReducer: state.locationOptionalListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getLocationOptionalList: (param) => {
        dispatch(actions.locationOptionalList.getLocationOptionalList(param))
    },
    getLocationOptionalListWaiting: () => {
        dispatch(actions.locationOptionalList.getLocationOptionalListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'locationOptionalSearchForm'
    })(DriverOptionalSearchBar)
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 4
    },
    leftIcon: {
        color: '#fff'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 3
    },
    input: {
        flex: 1,
        paddingVertical: 0
    },
    inputIcon: {
        paddingHorizontal: 5,
        color: '#fff'
    }
})

