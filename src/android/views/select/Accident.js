import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableNativeFeedback,
    ScrollView,
    InteractionManager
} from 'react-native'
import { Button, Ion } from 'native-base'
import { connect } from 'react-redux'
import { getTruckAccidentList } from '../../../actions/selectAccidentAction'
import { Actions } from 'react-native-router-flux'

class Accident extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.getTruckAccidentList({
                OptionalParam: {
                    truckId: this.props.truckId
                }
            })
        })
        //console.log(this.props.truckId)
    }

    _onPress(param) {
        this.props.onSelect({ id: param.id, value: param.address })
        Actions.pop()
    }

    renderItem() {
        return this.props.selectAccidentReducer.data.accidentList.map((item, i) => {
            return <TouchableNativeFeedback key={i} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                    <Text style={{ fontWeight: 'bold' }}>事故编号：{item.id}</Text>
                    <Text>{item.address}</Text>
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
        selectAccidentReducer: state.selectAccidentReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckAccidentList: (param) => {
        dispatch(getTruckAccidentList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Accident)