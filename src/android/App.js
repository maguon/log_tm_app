import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'

import NavBar from './components/bar/NavBar'
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

import TruckInfo from './views/TruckInfo'
import Password from './views/Password'

import Company from './views/select/Company'
import CompanyType from './views/select/CompanyType'
import DrivingLicenseType from './views/select/DrivingLicenseType'
import Make from './views/select/Make'
import SelectTruck from './views/select/Truck'
import SelectDriver from './views/select/Driver'
import SelectInsurance from './views/select/Insurance'
import SelectInsuranceType from './views/select/InsuranceType'


import SinglePhotoView from './views/SinglePhotoView'
import CustomPhotoView from './views/CustomPhotoView'


import UpdateRepair from './views/UpdateRepair'
import AddRepair from './views/AddRepair'
import TruckHomeFilterList from './views/TruckHomeFilterList'
import Orientation from 'react-native-orientation'
// import AddInsurance from './views/AddInsurance'
// import AddRepair from './views/AddRepair'
// import UpdateRepair from './views/UpdateRepair'

// import Orientation from 'react-native-orientation'
// import * as sceneAction from '../actions/SceneAction'

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#ccc',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ccc',
    },
    navigationBarStyle: {

    }
})

const mapStateToProps = (state) => {
    return {
        LoginReducer: state.userReducer
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
        // this.reducerCreate = this.reducerCreate.bind(this)
    }

    componentWillMount() {
         Orientation.lockToPortrait()
    }

    // reducerCreate(params) {
    //     const defaultReducer = Reducer(params)
    //     return (state, action) => {
    //         if (action.type == 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
    //             if (action.scene.name != 'mainRoot') {
    //                 this.props.changeScene(action.scene.name)
    //             }
    //         }
    //         return defaultReducer(state, action)
    //     }
    // }

    // test() {
    //     console.log('111')
    //     Actions.addTruckFirst()

    // }


    render() {
        console.disableYellowBox = true
        return (
            <Router
                //createReducer={this.reducerCreate} 
                getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            if (props.LoginReducer.user.mobile
                                && props.LoginReducer.user.token
                                && props.LoginReducer.user.userId
                                && props.LoginReducer.user.userStatus
                                && props.LoginReducer.user.userType) {
                                return 'main'
                            } else {
                                return 'login'
                            }
                        }}
                    >
                        <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home" initial={true} component={Home} title='车辆管理' hideNavBar={false} navBar={TopBar} />
                                <Scene key="driverListAtHomeBlock" rightType={1} component={DriverList} title='司机列表' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="driverInfoAtHomeBlock" component={DriverInfo} title='司机详情' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectCompanyTypeAtHomeBlock" component={CompanyType} title='公司类型' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="truckInfoAtHomeBlock" rightType={1} component={TruckInfo} title='车辆信息' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="truckListAtHomeBlock" component={TruckList} title='车辆信息' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="truckHomeFilterList" component={TruckHomeFilterList} title='车辆列表' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectCompanyAtHomeBlock" component={Company} title='所属公司' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDrivingLicenseTypeAtHomeBlock" component={DrivingLicenseType} title='驾照类型' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectInsuranceAtHomeBlock" component={SelectInsurance} title='选择保险公司' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectInsuranceTypeAtHomeBlock" component={SelectInsuranceType} title='选择保险险种' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectTruckAtHomeBlock" component={SelectTruck} title='选择车头' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDriverAtHomeBlock" component={SelectDriver} title='选择司机' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectMakeAtHomeBlock" component={Make} title='选择品牌' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="richTextAtHomeBlock" component={RichText} title='备注' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="singlePhotoViewAtHomeBlock" component={SinglePhotoView} hideNavBar hideTabBar />
                                <Scene key="customPhotoViewAtHomeBlock" component={CustomPhotoView} hideNavBar hideTabBar />
                                <Scene key="addInsuranceAtHomeBlock" component={AddInsurance} title='新增保单' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addRepairAtHomeBlock" component={AddRepair} title='开始维修' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="updateRepairAtHomeBlock" component={UpdateRepair} title='维修完毕' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                            </Scene>
                            <Scene key="truckBlock" icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                                <Scene key="truck" initial={true} rightType={1} onPressRight={() => Actions.addTruckFirst()} component={Truck} title='车辆信息' hideNavBar={false} navBar={TopBar} />
                                <Scene key="truckInfoAtTruckBlock" rightType={1} component={TruckInfo} title='车辆信息' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="truckListAtTruckBlock" component={TruckList} title='车辆信息' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addTruckFirst" component={AddTruckFirst} title='新增车辆' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addTruckSecond" component={AddTruckSecond} title='新增车辆' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addTruckThird" component={AddTruckThird} title='新增车辆' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addTruckFourth" component={AddTruckFourth} title='新增车辆' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addInsuranceAtTruckBlock" component={AddInsurance} title='新增保单' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectMakeAtTruckBlock" component={Make} title='选择品牌' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectCompanyTypeAtTruckBlock" component={CompanyType} title='公司类型' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectCompanyAtTruckBlock" component={Company} title='所属公司' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectTruckAtTruckBlock" component={SelectTruck} title='选择车头' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDriverAtTruckBlock" component={SelectDriver} title='选择司机' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectInsuranceAtTruckBlock" component={SelectInsurance} title='选择保险公司' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectInsuranceTypeAtTruckBlock" component={SelectInsuranceType} title='选择保险险种' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addRepairAtTruckBlock" component={AddRepair} title='开始维修' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="updateRepairAtTruckBlock" component={UpdateRepair} title='维修完毕' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="richTextAtTruckBlock" component={RichText} title='备注' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="singlePhotoViewAtTruckBlock" component={SinglePhotoView} hideNavBar hideTabBar />
                                <Scene key="customPhotoViewAtTruckBlock" component={CustomPhotoView} hideNavBar hideTabBar />
                            </Scene>
                            <Scene key="driverBlock" icon={TabIcon} online='ios-contact' outline='ios-contact-outline'>
                                <Scene key="driver" initial={true} rightType={1} onPressRight={() => Actions.addDriverFirst()} component={Driver} title='司机信息' hideNavBar={false} navBar={TopBar} />
                                <Scene key="addDriverFirst" component={AddDriverFirst} title='新增司机' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addDriverSecond" component={AddDriverSecond} title='新增司机' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="addDriverThird" component={AddDriverThird} title='新增司机' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="singlePhotoViewAtDriverBlock" component={SinglePhotoView} hideNavBar hideTabBar />
                                <Scene key="driverListAtDriverBlock" component={DriverList} title='司机列表' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="richTextAtDriverBlock" component={RichText} title='备注' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="driverInfoAtDriverBlock" rightType={1} component={DriverInfo} title='司机详情' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectCompanyTypeAtDriverBlock" component={CompanyType} title='公司类型' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectCompanyAtDriverBlock" component={Company} title='所属公司' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDrivingLicenseTypeAtDriverBlock" component={DrivingLicenseType} title='驾照类型' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectTruckAtDriverBlock" component={SelectTruck} title='选择车头' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} initial={true} title='设置' hideNavBar={false} navBar={TopBar} />
                                <Scene key="password" component={Password} title='修改密码' navBar={NavBar} hideTabBar hideNavBar={false} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>

        )
    }
}
