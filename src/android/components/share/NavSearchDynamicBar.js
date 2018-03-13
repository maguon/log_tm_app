import React, { Component } from 'react'
import { Header, Title, Button, Icon, Right, Left, Body, Label, Item, Input, Text } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as  selectCarAction from '../../../actions/selectCarAction'

const TextBox = props => {
    const { input: { onChange, ...restProps }, getCarList, getCarListWaiting, cleanCarList} = props
    return (
        <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                placeholderTextColor='#000'
                style={[globalStyles.midText, styles.input]}
                onChangeText={(text) => {
                    onChange(text)
                    if(text.length <= 5){
                        cleanCarList()
                    }else{
                        getCarListWaiting()
                        getCarList()
                    }
                }}
                {...restProps} />
            <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
        </View>
    )
}

const NavSearchDynamicBar = props => {
    const { title, layout, getCarListWaiting, getCarList ,cleanCarList} = props
    return (
        <View style={[styles.container, { width: layout.initWidth }]}>
            <StatusBar hidden={false} />
            <Header
            androidStatusBarColor={styleColor}
             style={globalStyles.styleBackgroundColor}>
                <Left style={styles.left}>
                    <Button transparent onPress={Actions.pop}>
                        <Icon name="arrow-back" style={styles.leftIcon} />
                    </Button>
                </Left>
                <Body style={styles.body}>
                    <Field name='vin' component={TextBox} cleanCarList={cleanCarList} getCarList={getCarList} getCarListWaiting={getCarListWaiting} />
                </Body>
            </Header>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: () => {
        dispatch(selectCarAction.getCarList())
    },
    getCarListWaiting: () => {
        dispatch(selectCarAction.getCarListWaiting())
    },
    cleanCarList:()=>{
        dispatch(selectCarAction.cleanCarList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchCarForm'
})(NavSearchDynamicBar))

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
        flex: 5
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

