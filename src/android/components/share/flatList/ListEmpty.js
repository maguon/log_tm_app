import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import { Thumbnail } from 'native-base'
import globalStyles from '../../../GlobalStyles'

const ListEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无质损记录</Text>
        </View>
    )
}

export default ListEmpty


const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    }
})