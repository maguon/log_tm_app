import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Dimensions,
    StatusBar
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import PanelSingleItem from '../../components/camera/PanelSingleItem'
import PanelCustomItem from '../../components/camera/PanelCustomItem'
import Camera from '../../components/camera/Camera'
import { connect } from 'react-redux'

const window = Dimensions.get('window')

class Third extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        initParam: {
            driverId: 117
        }
    }


    componentWillReceiveProps(nextProps) {
        const { updateDrivingImage, updateLicenseImage } = nextProps.addDriverThirdReducer
        /*updateDrivingImage*/
        if (updateDrivingImage.isExecStatus == 2) {
            if (updateDrivingImage.isResultStatus == 0) {
                console.log('updateDrivingImage执行成功')
            }
            else if (updateDrivingImage.isResultStatus == 1) {
                console.log('updateDrivingImage错误')
            }
            else if (updateDrivingImage.isResultStatus == 2) {
                console.log('updateDrivingImage失败')
            }
            else if (updateDrivingImage.isResultStatus == 3) {
                console.log('updateDrivingImage服务器错误')
            }
        }
        /************************************ */

        /*updateLicenseImage*/
        if (updateLicenseImage.isExecStatus == 2) {
            if (updateLicenseImage.isResultStatus == 0) {
                console.log('updateLicenseImage执行成功')
            }
            else if (updateLicenseImage.isResultStatus == 1) {
                console.log('updateLicenseImage错误')
            }
            else if (updateLicenseImage.isResultStatus == 2) {
                console.log('updateLicenseImage失败')
            }
            else if (updateLicenseImage.isResultStatus == 3) {
                console.log('updateLicenseImage服务器错误')
            }
        }
        /************************************ */
    }

    render() {
        let btnPaddingTop = window.height - (((window.width - 30) / 32 * 9 + 10) * 5) - 54 - StatusBar.currentHeight - 60 - 40
        btnPaddingTop = btnPaddingTop > 10 ? btnPaddingTop : 10
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '绑定货车' }, { step: '3', title: '上传照片' }]} current={2} />
                {/* <FlatList showsVerticalScrollIndicator={false}
                    data={[<View style={{ flexDirection: 'row' }}>
                        <PanelSingleItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                    </View>,
                    <View style={{ flexDirection: 'row' }}>
                        <Camera containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    </View>,
                    <View style={{ paddingTop: btnPaddingTop,paddingBottom:10, paddingHorizontal: 10 }}>
                        <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>完成</Text>
                        </Button>
                    </View>]}
                    renderItem={({ item }) => item}
                /> */}
                <View key={'w'} style={{ flexDirection: 'row' }}>
                    <Camera title='上传行驶证照片' onGetPhoto={this.updateDrivingImage} />
                    <Camera title='上传营运证照片' onGetPhoto={this.updateLicenseImage} />
                    {/* {!this.props.addTruckThirdReducer.data.drivingImage ?
                 :
                <PanelSingleItem onUpdateImage={this.onPressUpdateDrivingImage} onShowPhoto={this.onShowDrivingImage} title='行驶证' imageUrl={this.props.addTruckThirdReducer.data.drivingImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
            {!this.props.addTruckThirdReducer.data.licenseImage ?
                :
                <PanelSingleItem title='营运证' onUpdateImage={this.onPressUpdateLicenseImage} onShowPhoto={this.onShowLicenseImage} imageUrl={this.props.addTruckThirdReducer.data.licenseImage} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />} */}
                </View>
                <View style={{ paddingTop: btnPaddingTop, paddingBottom: 10, paddingHorizontal: 10 }}>
                    <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>完成</Text>
                    </Button>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        addDriverThirdReducer: state.addDriverThirdReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Third)
