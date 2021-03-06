import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import SharePhotoView from '../complatedComponents/share/SharePhotoView'
import * as actions from '../../actions'

const uploadImageForAccidentInfoPhotoView = props => {
    const { uploadImageForAccidentInfoReducer: { data: { imageList, index } }, setIndexForUploadImageForAccidentInfo } = props
    const { communicationSettingReducer: { data: { file_host } } } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item}`), index }}
            onIndexChanged={(index) => setIndexForUploadImageForAccidentInfo({ index })} />
    )
}

const mapStateToProps = (state) => ({
    uploadImageForAccidentInfoReducer: state.uploadImageForAccidentInfoReducer,
    communicationSettingReducer: state.communicationSettingReducer
})

const mapDispatchToProps = (dispatch) => ({
    setIndexForUploadImageForAccidentInfo: param => {
        dispatch(actions.uploadImageForAccidentInfo.setIndexForUploadImageForAccidentInfo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(uploadImageForAccidentInfoPhotoView)