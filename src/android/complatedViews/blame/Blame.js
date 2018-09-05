import React from 'react'
import { View, Text, InteractionManager, Image } from 'react-native'
import { Container, Icon, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base'
import globalStyles from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as actions from '../../../actions'
import { connect } from 'react-redux'

const Blame = props => {
    const { getPeccancyList, getPeccancyListWaiting, getOveruseDieselOilList, getOveruseDieselOilListWaiting, getAccidentListWaiting, getAccidentList } = props
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
                                <Text style={globalStyles.smallText}>待处理  12</Text>
                                <Text style={[globalStyles.smallText, { paddingLeft: 15 }]}>处理中  45</Text>
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
                                <Text style={globalStyles.smallText}>未扣笔数 12</Text>
                                <Text style={[globalStyles.smallText, { paddingLeft: 15 }]}>未扣金额 30000元</Text>
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
                                <Text style={globalStyles.smallText}>未扣笔数 12</Text>
                                <Text style={[globalStyles.smallText, { paddingLeft: 15 }]}>未扣金额 30000元</Text>
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
const mapStateToProps = (state) => {
    return {

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
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Blame)