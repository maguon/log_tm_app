import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native'
import { Button, Ion } from 'native-base'
import { connect } from 'react-redux'
import { getRepairStationList } from '../../../actions/selectRepairStationAction'
import { Actions } from 'react-native-router-flux'

class Accident extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }
    componentDidMount() {
        this.props.getRepairStationList()
    }

    _onPress(param) {
        this.props.onSelect({ id: param.id, value: param.repair_station_name })
        Actions.pop()
    }

    renderItem() {
        return this.props.selectRepairStationReducer.data.repairStationList.map((item, i) => {
            return <TouchableNativeFeedback key={i} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                    <Text>{item.repair_station_name}</Text>
                </View>
            </TouchableNativeFeedback>
        })
    }

    render() {
        return (
            <ScrollView>
                {this.renderItem()}
            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectRepairStationReducer: state.selectRepairStationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRepairStationList: (param) => {
        dispatch(getRepairStationList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Accident)