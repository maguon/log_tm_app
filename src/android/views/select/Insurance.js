import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import {
    getInsuranceList,
    resetGetInsuranceList
} from '../../../actions/SelectInsuranceAction'
import { Actions } from 'react-native-router-flux'

class Insurance extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    componentDidMount() {
        this.props.getInsuranceList()
    }

    _onPress(param) {
        this.props.onSelect({ id: param.id, value: param.insure_name })
        Actions.pop()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.selectInsuranceReducer.data.insuranceList}
                    renderItem={({ item, i }) => {
                        return (
                            <TouchableNativeFeedback key={i} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                                    <Text>{item.insure_name}</Text>
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
        selectInsuranceReducer: state.selectInsuranceReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getInsuranceList: () => {
        dispatch(getInsuranceList())
    },
    resetGetInsuranceList: () => {
        dispatch(resetGetInsuranceList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Insurance)