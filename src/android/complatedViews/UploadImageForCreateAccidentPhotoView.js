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
import { file_host } from '../../config/Host'
import SharePhotoView from '../complatedComponents/share/SharePhotoView'
import * as actions from '../../actions'

const UploadImageForCreateAccidentPhotoView = props => {
    const { uploadImageForCreateAccidentReducer: { data: { imageList, index } }, setIndexForUploadImageForCreateAccident } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item}`), index }}
            onIndexChanged={(index) => setIndexForUploadImageForCreateAccident({ index })} />
    )
}

const mapStateToProps = (state) => ({
    uploadImageForCreateAccidentReducer: state.uploadImageForCreateAccidentReducer
})

const mapDispatchToProps = (dispatch) => ({
    setIndexForUploadImageForCreateAccident: param => {
        dispatch(actions.uploadImageForCreateAccident.setIndexForUploadImageForCreateAccident(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageForCreateAccidentPhotoView)