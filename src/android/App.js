import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'

//import NavBar from './components/bar/NavBar'
import NavBar from './components/share/NavBar'
import NavSearchDynamicBar from './components/share/NavSearchDynamicBar'
import LeftButton from './components/share/LeftButton'
import TabIcon from './components/TabIcon'
// import SearchBar from './components/Bar/SearchBar'
import TopBar from './components/bar/TopBar'

import Initialization from './views/Initialization'
import Login from './views/Login'

import Home from './views/blockInitial/Home'
import Driver from './views/blockInitial/Driver'
import Truck from './views/blockInitial/Truck'
import Setting from './views/blockInitial/Setting'

import DriverList from './views/DriverList'
import TruckList from './views/TruckList'
import AddDriverFirst from './views/addDriver/First'
import AddDriverSecond from './views/addDriver/Second'
import AddDriverThird from './views/addDriver/Third'
import AddTruckFirst from './views/addTruck/First'
import AddTruckSecond from './views/addTruck/Second'
import AddTruckThird from './views/addTruck/Third'
import AddTruckFourth from './views/addTruck/Fourth'
import AddInsurance from './views/AddInsurance'
import DriverInfo from './views/DriverInfo'
import RichText from './views/RichText'
import FinishRepair from './views/FinishRepair'

import TruckInfo from './views/TruckInfo'
import RepairInfo from './views/RepairInfo'
import RepairEditor from './views/RepairEditor'
//import Password from './views/Password'RepairInfo

import Company from './views/select/Company'
import CompanyType from './views/select/CompanyType'
import DrivingLicenseType from './views/select/DrivingLicenseType'
import Make from './views/select/Make'
import SelectTruck from './views/select/Truck'
import SelectDriver from './views/select/Driver'
import SelectInsurance from './views/select/Insurance'
import SelectAccident from './views/select/Accident'
import SelectRepairStation from './views/select/RepairStation'
import SelectInsuranceType from './views/select/InsuranceType'


import SinglePhotoView from './views/SinglePhotoView'
import PhotoAlbum from './views/PhotoAlbum'
import CustomPhotoView from './views/CustomPhotoView'


import UpdateRepair from './views/UpdateRepair'
import CreateRepair from './views/CreateRepair'
import TruckHomeFilterList from './views/TruckHomeFilterList'
import RetrievePassword from './views/RetrievePassword'
import DemageInfo from './views/demageInfo/DemageInfo'
import DemageList from './views/demageList/DemageList'
import ResponsibilityInfo from './views/responsibilityInfo/ResponsibilityInfo'
import ResponsibilityList from './views/responsibilityList/ResponsibilityList'
import ApplyDamage from './views/ApplyDamage'
import ApplyDamageUploadImage from './views/applyDamageUploadImage/ApplyDamageUploadImage'
import ApplyDamageSubmit from './components/applyDamage/submit/ApplyDamageSubmit'
import DemageListOp from './components/DemageListOp'
import NavSearchStaticBar from './components/share/NavSearchStaticBar'
import ListCennect from './views/select/ListCennect'
import TruckOp from './components/share/TruckOp'
import DriverOp from './components/share/DriverOp'
import PersonalCenter from './views/personalCenter/PersonalCenter'
import UpdatePassword from './views/updatePassword/UpdatePassword'
import ApplyDamageUploadImageSubmit from './components/applyDamageUploadImage/ApplyDamageUploadImageSubmit'
import Orientation from 'react-native-orientation'
// import AddInsurance from './views/AddInsurance'
// import UpdateRepair from './views/UpdateRepair'

// import Orientation from 'react-native-orientation'
// import * as sceneAction from '../actions/SceneAction'

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {

    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        Orientation.lockToPortrait()
    }


    render() {
        console.disableYellowBox = true
        return (
            <Router
                getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.loginReducer.data
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            <Scene key="retrievePassword"
                                LeftButton={LeftButton}
                                title='找回密码'
                                component={RetrievePassword}
                                hideTabBar
                                hideNavBar={false}
                                navBar={NavBar} />
                        </Scene>
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home" initial={true} component={Home} title='车辆管理' hideNavBar={false} navBar={NavBar} />
                                <Scene key="driverListAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={DriverList}
                                    title='司机列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="driverInfoAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={DriverInfo}
                                    title='司机详情'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectCompanyTypeAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={CompanyType}
                                    title='公司类型'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="truckInfoAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={TruckInfo}
                                    title='车辆信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="truckListAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={TruckList}
                                    title='车辆信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="truckHomeFilterList"
                                    LeftButton={LeftButton}
                                    component={TruckHomeFilterList}
                                    title='车辆列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectCompanyAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={Company}
                                    title='所属公司'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectRepairStationAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={SelectRepairStation}
                                    title='维修站列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />




                                <Scene key="selectAccidentAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={SelectAccident}
                                    title='事故列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectDrivingLicenseTypeAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={DrivingLicenseType}
                                    title='驾照类型'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectInsuranceAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={SelectInsurance}
                                    title='选择保险公司'
                                    ideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectInsuranceTypeAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={SelectInsuranceType}
                                    title='选择保险险种'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectTruckAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={SelectTruck}
                                    title='选择车头'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectDriverAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={SelectDriver}
                                    title='选择司机'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectMakeAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={Make}
                                    title='选择品牌'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="richTextAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={RichText}
                                    title='备注'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="singlePhotoViewAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={SinglePhotoView}
                                    hideNavBar
                                    hideTabBar />
                                <Scene key="customPhotoViewAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={CustomPhotoView}
                                    hideNavBar
                                    hideTabBar />
                                <Scene key="addInsuranceAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={AddInsurance}
                                    title='新增保单'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="createRepairAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={CreateRepair}
                                    title='开始维修'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                {/* <Scene key="updateRepairAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={UpdateRepair}
                                    title='维修完毕'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} /> */}
                                <Scene key="listCennectNavAtHomeBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    hideNavBar={false} />
                                <Scene key="finishRepairAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={FinishRepair}
                                    title='维修完毕'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="repairInfoAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={RepairInfo}
                                    title='维修信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="repairEditorAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={RepairEditor}
                                    title='维修信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                            </Scene>
                            <Scene key="truckBlock" icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                                <Scene key="truck"
                                    initial={true}
                                    RightButton={TruckOp}
                                    component={Truck}
                                    title='车辆信息'
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="truckInfoAtTruckBlock"
                                    component={TruckInfo}
                                    LeftButton={LeftButton}
                                    title='车辆信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="truckListAtTruckBlock"
                                    component={TruckList}
                                    LeftButton={LeftButton}
                                    title='车辆信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="addTruckFirst"
                                    component={AddTruckFirst}
                                    LeftButton={LeftButton}
                                    title='新增车辆'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="addTruckSecond"
                                    component={AddTruckSecond}
                                    LeftButton={LeftButton}
                                    title='新增车辆'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="addTruckThird"
                                    LeftButton={LeftButton}
                                    component={AddTruckThird}
                                    title='新增车辆'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="addTruckFourth"
                                    LeftButton={LeftButton}
                                    component={AddTruckFourth}
                                    title='新增车辆'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="addInsuranceAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={AddInsurance}
                                    title='新增保单'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectMakeAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={Make}
                                    title='选择品牌'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectCompanyTypeAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={CompanyType}
                                    title='公司类型'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectCompanyAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={Company}
                                    title='所属公司'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectTruckAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={SelectTruck}
                                    title='选择车头'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectDriverAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={SelectDriver}
                                    title='选择司机'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectInsuranceAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={SelectInsurance}
                                    title='选择保险公司'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectInsuranceTypeAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={SelectInsuranceType}
                                    title='选择保险险种'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="createRepairAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={CreateRepair}
                                    title='开始维修'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="updateRepairAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={UpdateRepair}
                                    title='维修完毕'
                                    LeftButton={LeftButton}
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="richTextAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={RichText}
                                    title='备注'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="singlePhotoViewAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={SinglePhotoView}
                                    hideNavBar
                                    hideTabBar />
                                <Scene key="customPhotoViewAtTruckBlock"
                                    component={CustomPhotoView}
                                    hideNavBar
                                    hideTabBar />

                                <Scene key="finishRepairAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={FinishRepair}
                                    title='维修完毕'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="repairInfoAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={RepairInfo}
                                    title='维修信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="repairEditorAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={RepairEditor}
                                    title='维修信息'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="listCennectNavAtTruckBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    hideNavBar={false} />
                                <Scene key="selectAccidentAtTruckBlock"
                                    LeftButton={LeftButton}
                                    component={SelectAccident}
                                    title='事故列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                            </Scene>
                            <Scene key="driverBlock" icon={TabIcon} online='ios-contact' outline='ios-contact-outline'>
                                <Scene key="driver"
                                    initial={true}
                                    RightButton={DriverOp}
                                    component={Driver}
                                    title='司机信息'
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="addDriverFirst"
                                    LeftButton={LeftButton}
                                    component={AddDriverFirst}
                                    title='新增司机'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="addDriverSecond"
                                    LeftButton={LeftButton}
                                    component={AddDriverSecond}
                                    title='新增司机'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="addDriverThird"
                                    LeftButton={LeftButton}
                                    component={AddDriverThird}
                                    title='新增司机'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="singlePhotoViewAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={SinglePhotoView}
                                    hideNavBar
                                    hideTabBar />
                                <Scene key="driverListAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={DriverList}
                                    title='司机列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="richTextAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={RichText}
                                    title='备注'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="driverInfoAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={DriverInfo}
                                    title='司机详情'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectCompanyTypeAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={CompanyType}
                                    title='公司类型'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectCompanyAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={Company}
                                    title='所属公司'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectDrivingLicenseTypeAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={DrivingLicenseType}
                                    title='驾照类型'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="selectTruckAtDriverBlock"
                                    LeftButton={LeftButton}
                                    component={SelectTruck}
                                    title='选择车头'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting"
                                    component={Setting}
                                    initial={true}
                                    title='设置'
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="updatePassword"
                                    LeftButton={LeftButton}
                                    component={UpdatePassword}
                                    title='修改密码'
                                    navBar={NavBar}
                                    hideTabBar
                                    hideNavBar={false} />
                                <Scene key="selectDriverAtSettingBlock"
                                    component={SelectDriver}
                                    title='选择司机'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar={true} />
                                <Scene key="applyDamage" component={ApplyDamage}
                                    LeftButton={LeftButton}
                                    RightButton={ApplyDamageSubmit}
                                    title='质损申请'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="applyDamageUploadImage"
                                    component={ApplyDamageUploadImage}
                                    LeftButton={LeftButton}
                                    RightButton={ApplyDamageUploadImageSubmit}
                                    title='质损申请'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="demageInfo"
                                    LeftButton={LeftButton}
                                    component={DemageInfo}
                                    title='质损详情'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="demageList"
                                    LeftButton={LeftButton}
                                    component={DemageList}
                                    title='我的质损'
                                    hideTabBar
                                    RightButton={DemageListOp}
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="listCennectAtSettingBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchStaticBar}
                                    LeftButton={LeftButton}
                                    hideNavBar={false} />
                                <Scene key="listCennectDynamic"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchDynamicBar}
                                    hideNavBar={false} />
                                <Scene key="singlePhotoViewAtSettingBlock"
                                    component={PhotoAlbum}
                                    hideNavBar
                                    hideTabBar />
                                <Scene key="responsibilityInfo"
                                    LeftButton={LeftButton}
                                    component={ResponsibilityInfo}
                                    title='责任详情'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="responsibilityList"
                                    LeftButton={LeftButton}
                                    component={ResponsibilityList}
                                    title='我的责任'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="personalCenter"
                                    LeftButton={LeftButton}
                                    component={PersonalCenter}
                                    title='个人中心'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}
