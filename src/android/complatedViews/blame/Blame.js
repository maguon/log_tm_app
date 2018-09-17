import React, { Component } from 'react'
import { View, Text, InteractionManager, Image } from 'react-native'
import { Container, Icon, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as actions from '../../../actions'
import { connect } from 'react-redux'


class Blame extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getExceedOilStatisticsWaiting, getExceedOilStatistics, getPeccancyStatistics, getPeccancyStatisticsWaiting,
            getTruckAccidentStatistics, getTruckAccidentStatisticsWaiting } = this.props
        getTruckAccidentStatisticsWaiting()
        getExceedOilStatisticsWaiting()
        getPeccancyStatisticsWaiting()
        InteractionManager.runAfterInteractions(() => {
            getExceedOilStatistics()
            getPeccancyStatistics()
            getTruckAccidentStatistics()
        })
    }

    render() {
        const { getPeccancyList, getPeccancyListWaiting, getOveruseDieselOilList, getOveruseDieselOilListWaiting, getAccidentListWaiting,
            getAccidentList, blameReducer: { data: { peccancyStatistics, overuseDieselOilStatistics, accidentStatistics } } } = this.props
        // console.log('this.props', this.props)
        return (
            <Container style={{ backgroundColor: '#f5f5f5' }}>
                <Content>
                    <List>
                        <ListItem thumbnail last style={{ backgroundColor: '#fff', marginTop: 15 }}
                            onPress={() => {
                                getAccidentListWaiting()
                                Actions.accidentList()
                                InteractionManager.runAfterInteractions(getAccidentList)
                            }}>
                            <Left>
                                <Thumbnail square source={{ uri: 'accident_icon' }} />
                            </Left>
                            <Body>
                                <Text style={[globalStyles.midText, globalStyles.styleColor]}>事故管理</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={globalStyles.smallText}>待处理  {accidentStatistics.waiting ? `${accidentStatistics.waiting}` : '0'}</Text>
                                    <Text style={[globalStyles.smallText, { paddingLeft: 15 }]}>处理中  {accidentStatistics.doing ? `${accidentStatistics.doing}` : '0'}</Text>
                                </View>
                            </Body>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem thumbnail last style={{ backgroundColor: '#fff', marginTop: 15 }}
                            onPress={() => {
                                getPeccancyListWaiting()
                                Actions.peccancyList()
                                InteractionManager.runAfterInteractions(getPeccancyList)
                            }}>
                            <Left>
                                <Thumbnail square source={{ uri: 'peccancy_icon' }} />
                            </Left>
                            <Body>
                                <Text style={[globalStyles.midText, globalStyles.styleColor]}>违章扣款</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={globalStyles.smallText}>未扣笔数 {peccancyStatistics.peccancy_count ? `${peccancyStatistics.peccancy_count}` : '0'}</Text>
                                    <Text style={[globalStyles.smallText, { paddingLeft: 15 }]}>未扣金额 {peccancyStatistics.fine_money ? `${peccancyStatistics.fine_money}` : '0'}元</Text>
                                </View>
                            </Body>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem thumbnail last style={{ backgroundColor: '#fff', marginTop: 15 }}
                            onPress={() => {
                                getOveruseDieselOilListWaiting()
                                Actions.overuseDieselOilList()
                                InteractionManager.runAfterInteractions(getOveruseDieselOilList)
                            }}>
                            <Left>
                                <Thumbnail square source={{ uri: 'overuse_diesel_oil_icon' }} />
                            </Left>
                            <Body>
                                <Text style={[globalStyles.midText, globalStyles.styleColor]}>超油扣款</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={globalStyles.smallText}>未扣笔数 {overuseDieselOilStatistics.exceed_oil_count ? `${overuseDieselOilStatistics.exceed_oil_count}` : '0'}</Text>
                                    <Text style={[globalStyles.smallText, { paddingLeft: 15 }]}>未扣金额 {overuseDieselOilStatistics.exceed_oil_money ? `${overuseDieselOilStatistics.exceed_oil_money}` : '0'}元</Text>
                                </View>
                            </Body>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blameReducer: state.blameReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAccidentList: () => {
        dispatch(actions.accidentList.getAccidentList())
    },
    getAccidentListWaiting: () => {
        dispatch(actions.accidentList.getAccidentListWaiting())
    },
    getOveruseDieselOilList: () => {
        dispatch(actions.overuseDieselOilList.getOveruseDieselOilList())
    },
    getOveruseDieselOilListWaiting: () => {
        dispatch(actions.overuseDieselOilList.getOveruseDieselOilListWaiting())
    },
    getPeccancyList: () => {
        dispatch(actions.peccancyList.getPeccancyList())
    },
    getPeccancyListWaiting: () => {
        dispatch(actions.peccancyList.getPeccancyListWaiting())
    },
    getExceedOilStatistics: () => {
        dispatch(actions.blame.getExceedOilStatistics())
    },
    getExceedOilStatisticsWaiting: () => {
        dispatch(actions.blame.getExceedOilStatisticsWaiting())
    },
    getPeccancyStatistics: () => {
        dispatch(actions.blame.getPeccancyStatistics())
    },
    getPeccancyStatisticsWaiting: () => {
        dispatch(actions.blame.getPeccancyStatisticsWaiting())
    },
    getTruckAccidentStatistics: () => {
        dispatch(actions.blame.getTruckAccidentStatistics())
    },
    getTruckAccidentStatisticsWaiting: () => {
        dispatch(actions.blame.getTruckAccidentStatisticsWaiting())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Blame)