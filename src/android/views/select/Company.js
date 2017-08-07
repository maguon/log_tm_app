import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native'
import { Button, Ion } from 'native-base'
import { connect } from 'react-redux'
import { getCompanyList } from '../../../actions/SelectCompanyAction'
import { Actions } from 'react-native-router-flux'

class Company extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }
    componentDidMount() {
        this.props.getCompanyList({ OptionalParam: { operateType: this.props.initParam.operateType } })
    }

    _onPress(param) {
        this.props.initParam.onSelect({ id: param.id, value: param.company_name })
        // console.log(param)
        Actions.pop({ popNum: 2 })
    }

    renderItem() {
        return this.props.selectCompanyReducer.data.companyList.map((item, i) => {
            return <TouchableNativeFeedback key={i} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                    <Text>{item.company_name}</Text>
                </View>
            </TouchableNativeFeedback>
        })
    }

    render() {
        // console.log(this.props)
        return (
            <View>
                {this.renderItem()}
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectCompanyReducer: state.selectCompanyReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCompanyList: (param) => {
        dispatch(getCompanyList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Company)