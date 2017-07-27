import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    Image
} from 'react-native'
import { Button, Icon } from 'native-base'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View >
                        <View >
                            <Text>Home</Text>
                        </View>
                        <View>
                            <View>
                                <View>
                                    <Image source={{ uri: 'service_truck_4x' }} style={{ width: 40, height: 44 }} />
                                </View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                                <View>
                                    <Text>Home</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}