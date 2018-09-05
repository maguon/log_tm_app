import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, Animated, Easing } from 'react-native'
import { Button, ListItem, Icon, Container } from 'native-base'
import * as actions from '../../../../actions'
import { connect } from 'react-redux'
import { MapView } from 'react-native-amap3d'
import { Geolocation } from "react-native-amap-geolocation"


const maxFlex = 4
const minFlex = 1

//const window = Dimensions.get('window')

class LocationOptionalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            listFlex: new Animated.Value(minFlex),
            arrow: true
        }
    }

    componentDidMount() {
        Geolocation.init({
            ios: "9bd6c82e77583020a73ef1af59d0c759",
            android: "043b24fe18785f33c491705ffe5b6935"
        })

        Geolocation.setOptions({
            interval: 200,
            distanceFilter: 20
        })
        Geolocation.addLocationListener(location => {
            this.setState({ latitude: location.latitude, longitude: location.longitude })
            Geolocation.stop()
        })
        Geolocation.start()
    }

    componentWillReceiveProps(nextProps) {
        const { locationOptionalListReducer: { data: { currentLocation } },
            locationOptionalListReducer, resetGetLocationOptionalListStatus, resetGetRegeoStatue } = nextProps
        if (locationOptionalListReducer.getLocationOptionalList.isResultStatus == 2) {
            if (currentLocation) {
                _coordinate = currentLocation.location.split(',')
                this.mapView.animateTo({
                    coordinate: {
                        latitude: Number(_coordinate[1]),
                        longitude: Number(_coordinate[0])
                    }
                })
            }
            resetGetLocationOptionalListStatus()
        }


        if (locationOptionalListReducer.getRegeo.isResultStatus == 2) {
            if (currentLocation) {
                _coordinate = currentLocation.location.split(',')
                this.mapView.animateTo({
                    coordinate: {
                        latitude: Number(_coordinate[1]),
                        longitude: Number(_coordinate[0])
                    }
                })
            }
            resetGetRegeoStatue()
        }

    }


    render() {
        const { setLocationForOptionalList, getRegeoWaiting, getRegeo,
            locationOptionalListReducer: { data: { locationOptionalList, currentLocation } }, locationOptionalListReducer } = this.props
        //console.log('currentLocation', currentLocation)
        let _coordinate = null
        if (currentLocation) {
            _coordinate = currentLocation.location.split(',')
            // console.log('_coordinate', _coordinate)
        }
        //console.log('this.mapView', this.mapView)

        return (
            <Container>
                <View style={{ flex: 5 }}>
                    <MapView
                        style={{ flex: 1 }}
                        ref={ref => this.mapView = ref}
                        zoomLevel={15}
                        onLongPress={({ nativeEvent }) => {
                            getRegeoWaiting()
                            getRegeo(`${nativeEvent.longitude},${nativeEvent.latitude}`)
                        }}
                        onLocation={({ nativeEvent }) => console.log('nativeEvent', nativeEvent)}
                        coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                        style={StyleSheet.absoluteFill}>
                        {_coordinate&&<MapView.Marker
                            //title="一个可拖拽的标记"
                            onInfoWindowPress={item => console.log('item', item)}
                            coordinate={{ latitude: Number(_coordinate[1]), longitude: Number(_coordinate[0]) }}
                        />}
                    </MapView>
                    {locationOptionalList.length > 0 &&<Button icon small style={{ alignSelf: 'center', backgroundColor: '#fff', position: 'absolute', bottom: 0 }}
                        onPress={() => {
                            Animated.timing(this.state.listFlex, {
                                toValue: this.state.arrow ? maxFlex : minFlex,
                                duration: 200,
                                easing: Easing.linear,// 线性的渐变函数
                            }).start();
                            this.setState({ arrow: !this.state.arrow })
                        }}>
                        {this.state.arrow && <Icon name='ios-arrow-up' style={{ color: '#777' }} />}
                        {!this.state.arrow && <Icon name='ios-arrow-down' style={{ color: '#777' }} />}
                    </Button>}
                </View>
                {locationOptionalList.length > 0 && <Animated.View style={{ flex: this.state.listFlex }}>
                    <FlatList
                        ref={ref => this.posList = ref}
                        style={{ backgroundColor: '#fff' }}
                        keyExtractor={(item, index) => index}
                        data={locationOptionalList}
                        renderItem={({ item }) => {
                            return (
                                <ListItem onPress={() => {
                                    const item_coordinate = item.location.split(',')
                                    this.mapView.animateTo({
                                        coordinate: {
                                            latitude: Number(item_coordinate[1]),
                                            longitude: Number(item_coordinate[0])
                                        },
                                    })
                                    setLocationForOptionalList(item)
                                }}>
                                    <Text>{item.name}</Text>
                                </ListItem>
                            )
                        }} />
                </Animated.View>}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locationOptionalListReducer: state.locationOptionalListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

    resetGetLocationOptionalListStatus: () => {
        dispatch(actions.locationOptionalList.resetGetLocationOptionalListStatus())
    },
    setLocationForOptionalList: (param) => {
        dispatch(actions.locationOptionalList.setLocationForOptionalList(param))
    },
    getRegeo: (param) => {
        dispatch(actions.locationOptionalList.getRegeo(param))
    },
    getRegeoWaiting: () => {
        dispatch(actions.locationOptionalList.getRegeoWaiting())
    },
    resetGetRegeoStatue: () => {
        dispatch(actions.locationOptionalList.resetGetRegeoStatue())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationOptionalList) 