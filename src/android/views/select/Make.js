import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { getMakeList } from '../../../actions/SelectMakeAction'
import { Actions } from 'react-native-router-flux'

class Make extends Component {
    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        this._onPress=this._onPress.bind(this)
    }

    componentDidMount() {
        this.props.getMakeList()
    }

    _onPress(param) {
        this.props.onSelect({ id: param.id, value: param.brand_name })
        Actions.pop()
    }

    renderItem() {
        return this.props.selectMakeReducer.data.makeList.map((item, i) => {
            return <TouchableNativeFeedback key={i} onPress={()=>this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                    <Text>{item.brand_name}</Text>
                </View>
            </TouchableNativeFeedback>
        })
    }

    render() {
        return (
            <View>
                {this.renderItem()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectMakeReducer: state.selectMakeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMakeList: () => {
        dispatch(getMakeList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Make)