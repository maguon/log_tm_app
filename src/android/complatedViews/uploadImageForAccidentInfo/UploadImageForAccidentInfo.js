import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Modal,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Spinner } from 'native-base'
import CameraButton from '../../components/share/CameraButton'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as actions from '../../../actions'
import ImageItem from '../../components/share/ImageItem'
import { Actions } from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const window = Dimensions.get('window')
const containerWidth = window.width / 2 - 5
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadAccidentImageWaiting, uploadAccidentImage, setIndexForUploadImageForAccidentInfo, file_host, accident } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadAccidentImageWaiting, uploadAccidentImage, accident })
    } else {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    setIndexForUploadImageForAccidentInfo({ index: index - 1 })
                    Actions.uploadImageForAccidentInfoPhotoView()
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, uploadAccidentImageWaiting, uploadAccidentImage, accident } = props
    console.log('renderItemCameraButtonProps', props)
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={param => uploadAccidentImage({ cameraReses: param, accidentId: accident.id, vheNo: accident.truck_num })}
                _cameraStart={uploadAccidentImageWaiting}
            />
        </View>
    )
}


const renderListEmpty = props => {
    const { uploadAccidentImageWaiting, uploadAccidentImage, accident } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={param => uploadAccidentImage({ cameraReses: param, accidentId: accident.id, vheNo: accident.truck_num })}
                    _cameraStart={uploadAccidentImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传车辆视频或照片</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View>
        </View>
    )
}

const UploadImageForAccidentInfo = props => {
    const { parent, uploadAccidentImageWaiting, uploadAccidentImage, setIndexForUploadImageForAccidentInfo, accident,
        uploadImageForAccidentInfoReducer: { data: { imageList }, uploadAccidentImage: { isResultStatus }, getImageForCreateAccident } } = props
    const { communicationSettingReducer: { data: { file_host } } } = props
    if (getImageForCreateAccident.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container >
                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item, index) => index}
                    data={imageList.length > 0 ? ['isCameraButton', ...imageList] : []}
                    numColumns={2}
                    ListEmptyComponent={() => renderListEmpty({ uploadAccidentImageWaiting, uploadAccidentImage, accident })}
                    renderItem={({ item, index }) => renderItem({
                        parent, item, index, imageList, file_host, uploadAccidentImageWaiting, uploadAccidentImage, accident, setIndexForUploadImageForAccidentInfo
                    })} />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={isResultStatus == 1}
                                style={styles.modalActivityIndicator}
                                size="large" />
                            <Text style={styles.modalText}>正在上传图片...</Text>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    cameraButtonContainer: {
        marginTop: 50
    },
    subtitleContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    tagText: {
        color: 'red'
    },
    itemContainer: {
        margin: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatList: {
        padding: 5
    },
    itemCameraButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: containerWidth,
        height: containerHeight
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
})

const mapStateToProps = (state) => {
    return {
        uploadImageForAccidentInfoReducer: state.uploadImageForAccidentInfoReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadAccidentImage: (param) => {
        dispatch(actions.uploadImageForAccidentInfo.uploadAccidentImage(param))
    },
    uploadAccidentImageWaiting: () => {
        dispatch(actions.uploadImageForAccidentInfo.uploadAccidentImageWaiting())
    },
    setIndexForUploadImageForAccidentInfo: param => {
        dispatch(actions.uploadImageForAccidentInfo.setIndexForUploadImageForAccidentInfo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageForAccidentInfo)