import React, { Component } from 'react'
import { Text, View ,StyleSheet,ActivityIndicator} from 'react-native'
import globalStyles,{styleColor} from '../../../GlobalStyles'

const ListFooter = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

export default ListFooter

const styles = StyleSheet.create({
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