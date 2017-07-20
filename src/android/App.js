import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Action, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'

// import NavBar from './components/Bar/NavBar'
import TabIcon from './components/TabIcon'
// import SearchBar from './components/Bar/SearchBar'
// import TopBar from './components/Bar/TopBar'


import Initialization from './views/Initialization'
import Login from './views/Login'


import Home from './views/blockInitial/Home'
import Driver from './views/blockInitial/Driver'
import Truck from './views/blockInitial/Truck'
import Setting from './views/blockInitial/Setting'

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
                                <Scene key="home" initial={true} component={Home} hideNavBar />

                            </Scene>
                            <Scene key="truckBlock" icon={TabIcon} online='ios-car' outline='ios-car-outline' >
                                <Scene key="truck" initial={true} component={Truck} hideNavBar />

                            </Scene>
                            <Scene key="driverBlock" icon={TabIcon} online='ios-pin' outline='ios-pin-outline'>
                                <Scene key="driver" component={Driver} initial={true} hideNavBar />

                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} hideNavBar={true} />

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