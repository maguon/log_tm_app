import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import ImageItem from '../../share/ImageItem'
import globalStyles from '../../../GlobalStyles'
import { connect } from 'react-redux'
import { file_host } from '../../../../config/Host'
import * as routerDirection from '../../../../util/RouterDirection'

const renderItem = props => {
    const { item, index, parent, demageImageList } = props
    return (
        <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => routerDirection.singlePhotoView(parent)({ initParam: { imageUrlList: demageImageList.map(url => `${file_host}/image/${url.url}`), index } })} >
            <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
        </TouchableOpacity>
    )
}

const renderListEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={globalStyles.midText}>暂无照片</Text>
        </View>
    )
}

const ImageListForDemageInfo = props => {
    const { imageListForDemageReducer: { data: { demageImageList } }, parent } = props
    return (
        <FlatList
            style={styles.flatList}
            data={demageImageList}
            numColumns={2}
            ListEmptyComponent={renderListEmpty}
            renderItem={({ item, index }) => renderItem({ item, index, parent, demageImageList })} />
    )
}

const mapStateToProps = (state) => {
    return {
        imageListForDemageReducer: state.imageListForDemageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ImageListForDemageInfo)

const styles = StyleSheet.create({
    itemContainer: {
        margin: 5
    },
    flatList: {
        padding: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

