import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import { Button } from 'native-base'


export default class Insurance extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[]}
                    renderItem={({ item }) => {
                        return <View>
                            <Text>{item.insure_name}</Text>
                        </View>
                    }}
                />

            </View>
        )
    }
}