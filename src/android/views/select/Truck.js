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
import {
    getTruckList
} from '../../../actions/SelectTruckAction'

class Truck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            truckNum: ''
        }
        this.tractorListFilter = this.tractorListFilter.bind(this)
        this._onPress=this._onPress.bind(this)
    }

    static defaultProps = {
        initParam: {
            type: 1
        }
    }

    componentDidMount() {
        this.props.getTruckList(
            {
                OptionalParam: {
                    truckType: this.props.initParam.type
                }
            }
        )
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    tractorListFilter() {
        return this.props.selectTruckReducer.data.tractorList.filter((item) => {
            return item.truck_num.toUpperCase().indexOf(this.state.truckNum) >= 0 || item.truck_num.toLowerCase().indexOf(this.state.truckNum) >= 0
        })
    }

    render() {
        
        return (
            <View>
                <View style={{ backgroundColor: '#edf1f4' }}>
                    <TextBox
                        title='检索车牌：'
                        value={this.state.truckNum}
                        defaultValue={''}
                        containerSytle={{
                            backgroundColor: '#edf1f4',
                            borderBottomWidth: 0.5,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderColor: '#dddddd'
                        }}
                        onValueChange={(param) => this.setState({ truckNum: param })}
                        placeholder='请输入车牌号'
                    />
                </View>
                <FlatList showsVerticalScrollIndicator={false}
                    data={this.tractorListFilter()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableNativeFeedback key={item.id} onPress={() => this._onPress({ id: item.id, value: item.truck_num })} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View key={item.id} style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                                    <Text>{item.truck_num}</Text>
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
        selectTruckReducer: state.selectTruckReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckList: (param) => {
        dispatch(getTruckList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Truck)