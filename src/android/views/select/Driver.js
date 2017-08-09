import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import { Button, Icon } from 'native-base'
import TextBox from '../../components/form/TextBox'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { getDriverList } from '../../../actions/SelectDriverAction'

class Driver extends Component {
    constructor(props) {
        super(props)
        this.state = {
            driveName: ''
        }
        this.driverListFilter = this.driverListFilter.bind(this)
        this._onPress = this._onPress.bind(this)
    }

    static defaultProps = {
        initParam: {
            type: 1
        }
    }

    componentDidMount() {
        this.props.getDriverList()
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    driverListFilter() {
        console.log(this.props.selectDriverReducer)
        return this.props.selectDriverReducer.data.driverList.filter((item) => {
            return item.drive_name.indexOf(this.state.driveName) >= 0 
        })
    }

    render() {
        return (
            <View>
                <View style={{ backgroundColor: '#edf1f4' }}>
                    <TextBox
                        title='检索司机：'
                        value={this.state.driveName}
                        defaultValue={''}
                        containerSytle={{
                            backgroundColor: '#edf1f4',
                            borderBottomWidth: 0.5,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderColor: '#dddddd'
                        }}
                        onValueChange={(param) => this.setState({ driveName: param })}
                        placeholder='请输入司机姓名'
                    />
                </View>
                <FlatList showsVerticalScrollIndicator={false}
                    data={this.driverListFilter()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableNativeFeedback key={item.id} onPress={() => this._onPress({ id: item.id, value: item.drive_name })} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View key={item.id} style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                                    <Text>{item.drive_name}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    }}
                />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        selectDriverReducer: state.selectDriverReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverList: (param) => {
        dispatch(getDriverList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Driver)