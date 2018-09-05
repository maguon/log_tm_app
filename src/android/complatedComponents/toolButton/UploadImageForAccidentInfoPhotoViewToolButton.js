import React from 'react'
import { View, Text, Alert } from 'react-native'
import * as actions from '../../../actions'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

const UploadImageForAccidentInfoPhotoViewToolButton = props => {
    const { delImageForAccidentInfo } = props
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={() => {
                Alert.alert(
                    '删除',
                    '确定删除这张照片吗？',
                    [
                        { text: '取消', onPress: () => { }, style: 'cancel' },
                        { text: '确定', onPress: delImageForAccidentInfo },
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
    delImageForAccidentInfo: () => {
        dispatch(actions.uploadImageForAccidentInfo.delImageForAccidentInfo())
    }
})



export default connect(null, mapDispatchToProps)(UploadImageForAccidentInfoPhotoViewToolButton)