import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Action, Switch, Reducer } from 'react-native-router-flux'
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
import AddDriverFirst from './views/addDriver/First'
import DriverInfo from './views/DriverInfo'
import RichText from './views/RichText'


import DriverCompany from './views/select/DriverCompany'
import DrivingLicenseType from './views/select/DrivingLicenseType'


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

// const mapStateToProps = (state) => {
//     return {
//         LoginReducer: state.LoginReducer
//     }
// }

export default class App extends Component {
    constructor(props) {
        super(props)
        // this.reducerCreate = this.reducerCreate.bind(this)
    }

    componentWillMount() {
        // Orientation.lockToPortrait()
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

    render() {
        console.disableYellowBox = true
        return (
            <Router
                //createReducer={this.reducerCreate} 
                getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    <Scene key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        initial={true}
                        key="mainRoot"
                        //component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            /*if (props.LoginReducer.user.mobile
                                && props.LoginReducer.user.token
                                && props.LoginReducer.user.userId
                                && props.LoginReducer.user.userStatus
                                && props.LoginReducer.user.userType) {*/
                            return 'main'
                            /*} else {
                                return 'login'
                            }*/
                        }}
                    >
                        <Scene key="login" component={Login} hideNavBar hideTabBar />
                        <Scene key="main" initial={true} tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home" initial={true} component={Home} title='车辆管理' hideNavBar={false} navBar={TopBar} />
                                <Scene key="driverListAtHomeBlock" component={DriverList} title='司机列表' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="driverInfoAtHomeBlock" component={DriverInfo} title='司机详情' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDriverCompanyAtHomeBlock" component={DriverCompany} title='所属公司' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDrivingLicenseTypeAtHomeBlock" component={DrivingLicenseType} title='驾照类型' hideNavBar={false} navBar={NavBar} hideTabBar={true} />

                            </Scene>
                            <Scene key="truckBlock" icon={TabIcon} online='ios-car' outline='ios-car-outline' >
                                <Scene key="truck" initial={true} component={Truck} title='车辆信息' hideNavBar={false} navBar={TopBar} />

                            </Scene>
                            <Scene key="driverBlock" icon={TabIcon} initial={true} online='ios-pin' outline='ios-pin-outline'>
                                <Scene key="driver" component={Driver} title='司机信息' hideNavBar={false} navBar={TopBar} />

                                <Scene key="addDriverFirst" component={AddDriverFirst}  initial={true}  title='增加司机' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="driverListAtDriverBlock" component={DriverList} title='司机列表' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="richTextAtDriverBlock" component={RichText} title='备注' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="driverInfoAtDriverBlock" component={DriverInfo} title='司机详情' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDriverCompanyAtDriverBlock" component={DriverCompany} title='所属公司' hideNavBar={false} navBar={NavBar} hideTabBar={true} />
                                <Scene key="selectDrivingLicenseTypeAtDriverBlock" component={DrivingLicenseType} title='驾照类型' hideNavBar={false} navBar={NavBar} hideTabBar={true} />

                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} initial={true} title='设置' hideNavBar={false} navBar={TopBar} />

                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>

        )
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     changeScene: (param) => {
//         dispatch(sceneAction.changeScene(param))
//     }
// })

// export default connect((state) => { return {} }, mapDispatchToProps)(App)