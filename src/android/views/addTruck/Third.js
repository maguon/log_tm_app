import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import PanelSingleItem from '../../components/camera/PanelSingleItem'
import PanelCustomItem from '../../components/camera/PanelCustomItem'
import { connect } from 'react-redux'
import Camera from '../../components/camera/Camera'
import {
    updateDrivingImage,
    updateLicenseImage,
    createTruckImage,
    resetUpdateDrivingImage,
    resetUpdateLicenseImage,
    resetCreateTruckImage
} from '../../../actions/AddTruckThirdAction'

class Third extends Component {
    constructor(props) {
        super(props)
        this.updateDrivingImage = this.updateDrivingImage.bind(this)
        this.updateLicenseImage = this.updateLicenseImage.bind(this)
        this.renderImageList = this.renderImageList.bind(this)
    }

    static defaultProps = {
        initParam: {
            truckId: 172,
            type: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        const { updateDrivingImage, updateLicenseImage, createTruckImage, data } = nextProps.addTruckThirdReducer
        /*updateDrivingImage*/
        if (updateDrivingImage.isExecStatus == 2) {
            if (updateDrivingImage.isResultStatus == 0) {
                console.log('updateDrivingImage成功')
            }
            else if (updateDrivingImage.isResultStatus == 1) {
                console.log('updateDrivingImage错误')
            }
            else if (updateDrivingImage.isResultStatus == 2) {
                console.log('updateDrivingImage失败')
            }
            else if (updateDrivingImage.isResultStatus == 3) {
                console.log('updateDrivingImage服务错误')
            }
        }
        /************************************ */

        /*updateLicenseImage*/
        if (updateLicenseImage.isExecStatus == 2) {
            if (updateLicenseImage.isResultStatus == 0) {
                console.log('updateLicenseImage成功')
            }
            else if (updateLicenseImage.isResultStatus == 1) {
                console.log('updateLicenseImage错误')
            }
            else if (updateLicenseImage.isResultStatus == 2) {
                console.log('updateLicenseImage失败')
            }
            else if (updateLicenseImage.isResultStatus == 3) {
                console.log('updateLicenseImage服务错误')
            }
        }
        /************************************ */

        /*createTruckImage*/
        if (createTruckImage.isExecStatus == 2) {
            if (createTruckImage.isResultStatus == 0) {
                console.log('createTruckImage成功')
            }
            else if (createTruckImage.isResultStatus == 1) {
                console.log('createTruckImage错误')
            }
            else if (createTruckImage.isResultStatus == 2) {
                console.log('createTruckImage失败')
            }
            else if (createTruckImage.isResultStatus == 3) {
                console.log('createTruckImage服务错误')
            }
        }
        /************************************ */
    }

    updateDrivingImage(param) {
        this.props.updateDrivingImage({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.initParam.truckId
            },
            OptionalParam: {
                imageType: 2
            },
            putParam: {
                imageType: 1
            },
            postFileParam: {
                ...param.postFileParam,
                key: "image"
            }
        })
    }

    updateLicenseImage(param) {
        this.props.updateLicenseImage({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.initParam.truckId
            },
            OptionalParam: {
                imageType: 2
            },
            putParam: {
                imageType: 2
            },
            postFileParam: {
                ...param.postFileParam,
                key: "image"
            }
        })
    }
    // [<View style={{ flexDirection: 'row' }}>
    //                     {!this.props.addTruckThirdReducer.data.drivingImage ?
    //                         <Camera title='上传行驶证照片' onGetPhoto={this.updateDrivingImage} /> :
    //                         <PanelSingleItem title='行驶证' imageUrl={this.props.addTruckThirdReducer.data.drivingImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
    //                     {!this.props.addTruckThirdReducer.data.licenseImage ?
    //                         <Camera title='上传营运证照片' onGetPhoto={this.updateLicenseImage} /> :
    //                         <PanelSingleItem title='营运证' imageUrl={this.props.addTruckThirdReducer.data.licenseImage} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
    //                 </View>, <View style={{ flexDirection: 'row' }}>
    //                     <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
    //                     <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
    //                 </View>, <View style={{ flexDirection: 'row' }}>
    //                     <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
    //                     <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
    //                 </View>,
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
    //                     <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
    //                 </View>,
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <Camera title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
    //                 </View>]

    renderImageList() {
        let { truckImageList } = this.props.addTruckThirdReducer.data
        const imageListHead = [<View style={{ flexDirection: 'row' }}>
            {!this.props.addTruckThirdReducer.data.drivingImage ?
                <Camera title='上传行驶证照片' onGetPhoto={this.updateDrivingImage} /> :
                <PanelSingleItem title='行驶证' imageUrl={this.props.addTruckThirdReducer.data.drivingImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
            {!this.props.addTruckThirdReducer.data.licenseImage ?
                <Camera title='上传营运证照片' onGetPhoto={this.updateLicenseImage} /> :
                <PanelSingleItem title='营运证' imageUrl={this.props.addTruckThirdReducer.data.licenseImage} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
        </View>]

        let imageListFoot
        if (truckImageList.length % 2 == 0) {
            imageListFoot = [<View style={{ flexDirection: 'row' }}>
                <Camera title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
            </View>]
        } else {
            const lastImage = truckImageList.pop()
            imageListFoot = [<View style={{ flexDirection: 'row' }}>
                <PanelCustomItem imageUrl={lastImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                <Camera title='上传车辆照片' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
            </View>]
        }

        const imageBody = truckImageList.reduce((sum, value) => {
            if (sum.length % 2 == 0) {
                return [...sum, [value]]
            } else {
                return [...sum, [...sum[length - 1], value]]
            }
        }, []).map((item, i) => {
            let cItem = item.map((citem, j) => {
                if (j % 2 == 0) {
                    return <PanelCustomItem key={j} imageUrl={item} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                } else {
                    return <PanelCustomItem key={j} imageUrl={item} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                }
                return <View style={{ flexDirection: 'row' }}>
                    {cItem}
                </View>
            })
        })
        return [...imageListHead,...imageBody,...imageListFoot]
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator
                    stepList={[{ step: '1', title: '基本信息' },
                    { step: '2', title: '关联信息' },
                    { step: '3', title: '上传照片' },
                    { step: '4', title: '车保信息' }]}
                    current={2} />
                <FlatList showsVerticalScrollIndicator={false}
                    data={this.renderImageList()}
                    renderItem={({ item }) => item}
                />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        addTruckThirdReducer: state.addTruckThirdReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateDrivingImage: (param) => {
        dispatch(updateDrivingImage(param))
    },
    updateLicenseImage: (param) => {
        dispatch(updateLicenseImage(param))
    },
    createTruckImage: (param) => {
        dispatch(createTruckImage(param))
    },
    resetUpdateDrivingImage: () => {
        dispatch(resetUpdateDrivingImage())
    },
    resetUpdateLicenseImage: () => {
        dispatch(resetUpdateLicenseImage())
    },
    resetCreateTruckImage: () => {
        dispatch(resetCreateTruckImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Third)