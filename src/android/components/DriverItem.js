import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

export default class DriverItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#e6ebee', borderRadius: 1,marginTop:10 }}>

                <View style={{ flex: 1, backgroundColor: 'red' }}>

                </View>
                <View style={{ flex: 5 }} >
                    <View style={{ flexDirection: 'row' }} >

                        <View>
                            <Text style={{color:'#00cade'}}>张宝全</Text>
                        </View>
                        <View >
                            <Text>男</Text>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View  >
                            <Text>安吉物流</Text>
                        </View>
                        <View >
                            <Text>辽B12345</Text>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'yellow' }}>

                </View>
            </View>
        )
    }
}