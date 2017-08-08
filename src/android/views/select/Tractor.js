import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import { Button, Icon } from 'native-base'
import TextBox from '../../components/form/TextBox'
import { connect } from 'react-redux'

class Tractor extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
    }

    static defaultProps = {
        initParam: {
            type: 1
        }
    }

    onSelect(param) {
        console.log(param)
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <View style={{ backgroundColor: '#edf1f4' }}>
                    <TextBox
                        title='检索车牌：'
                        //value={this.state.queryCar.vinCode}
                        defaultValue={''}
                        containerSytle={{
                            backgroundColor: '#edf1f4',
                            borderBottomWidth: 0.5,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderColor: '#dddddd'
                        }}
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 17],
                            message: '长度不能超过17位'
                        }]}*/
                        onValueChange={(param) => this.onSelect({ theCode: param })}
                        //onRequire={(param) => this.setState({ vinRequire: param })}
                        placeholder='请输入车牌号'
                    />
                    {/*<Text>车头</Text>*/}
                </View>
                {/*<FlatList showsVerticalScrollIndicator={false}
                    data={[]}
                    renderItem={({ item }) => {
                        return (
                            <View>
                            </View>
                        )
                    }}
                />*/}
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createTruckFirst: (param) => {

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tractor)