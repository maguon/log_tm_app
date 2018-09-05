import React from 'react'
import { View, Text,Alert } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

const UploadImageForCreateAccidentPhotoViewToolButton = props => {
    const {delImageForCreateAccident} =props
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={()=>{
                Alert.alert(
                    '删除',
                    '确定删除这张照片吗？',
                    [
                      {text: '取消', onPress: () => {}, style: 'cancel'},
                      {text: '确定', onPress: delImageForCreateAccident},
                    ],
                    { cancelable: false }
                )
                  
            }}>
                <Icon name='ios-trash' style={{ color: '#fff' }} />
            </Button>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => ({
    delImageForCreateAccident: () => {
        dispatch(actions.uploadImageForCreateAccident.delImageForCreateAccident())
    }
})

export default connect(null, mapDispatchToProps)(UploadImageForCreateAccidentPhotoViewToolButton)