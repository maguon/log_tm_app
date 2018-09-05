
import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { Container, Body, Card, CardItem, Button, Spinner, Content } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { RichTextBox, CheckBox } from '../../complatedComponents/form'
import * as actions from '../../../actions'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import { reduxForm, Field, getFormValues } from 'redux-form'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { requiredObj, required } from '../../../util/Validator'


const requiredObjValidator = requiredObj('必选')
const requiredValidator = required('必选')




const { width } = Dimensions.get('window')

const renderItem = props => {
    const { item } = props
    if (item.repair_status == 0) {
        return (
            <TouchableOpacity onPress={() => Actions.accidentRepairEditor({ accidentRepair: item })}>
                <Card style={{ backgroundColor: '#fff', marginLeft: 7.5, marginRight: 7.5, marginTop: 7.5, marginBottom: 7.5 }}>
                    <CardItem header style={{ justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>维修编号：{item.id ? `${item.id}` : ''}</Text>
                        <Text style={globalStyles.midText}>维修中</Text>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column' }}>
                        <Body style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={[globalStyles.smallText]}>{item.repair_date ? `${moment(item.repair_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                        </Body>
                        <Body style={{ flexDirection: 'row' }}>
                            <Text style={globalStyles.smallText}>维修原因：{item.repair_reason ? `${item.repair_reason}` : ''}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity >
        )
    } else {
        return (
            <Card style={{ backgroundColor: '#fff', marginLeft: 7.5, marginRight: 7.5, marginTop: 7.5, marginBottom: 7.5 }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>维修编号：{item.id ? `${item.id}` : ''}</Text>
                    <Text style={[globalStyles.midText, { color: 'red' }]}>维修结束</Text>
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={[globalStyles.smallText]}>{item.repair_date ? `${moment(item.repair_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                        <Text style={[globalStyles.smallText, { marginHorizontal: 15 }]}>至</Text>
                        <Text style={globalStyles.smallText}>{item.end_date ? `${moment(item.end_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row' }}>
                        <Text style={globalStyles.smallText}>维修站：{item.repair_station_name ? `${item.repair_station_name}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row' }}>
                        <Text style={globalStyles.smallText}>维修原因：{item.repair_reason ? `${item.repair_reason}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>维修描述：{item.remark ? `${item.remark}` : ''}</Text>
                    </Body>
                </CardItem>
                <CardItem footer style={{ justifyContent: 'flex-end' }}>
                    <Text style={globalStyles.smallText}>维修金额：{item.repair_money ? `${item.repair_money}` : '0'}元</Text>
                </CardItem>
            </Card>
        )
    }
}


class AccidentRepairList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }

    render() {
        const { accidentRepairListReducer: { data: { accidentRepairList }, getAccidentRepairList }, accident, handleSubmit } = this.props
        // console.log('this.props', this.props)
        if (getAccidentRepairList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <FlatList
                        ListHeaderComponent={() => {
                            if (accidentRepairList.some(item => item.repair_status == 0)) {
                                return <View />
                            } else {
                                return (
                                    <Button full style={[globalStyles.styleBackgroundColor, { margin: 7.5 }]} onPress={() => this.setState({ modalVisible: true })}>
                                        <Text style={[globalStyles.midText, { color: '#fff' }]}>新增维修</Text>
                                    </Button>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{ padding: 7.5 }}
                        data={accidentRepairList}
                        renderItem={renderItem} />
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setState({ modalVisible: false })}
                    >
                        <Container
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                alignItems: 'stretch',
                                justifyContent: 'center'
                            }}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.setState({ modalVisible: false })} />
                            <Content
                                style={{
                                    position: 'absolute',
                                    width: width
                                }}
                                contentContainerStyle={{
                                    backgroundColor: '#fff',
                                    borderWidth: 0.5,
                                    borderColor: '#ccc',
                                    marginHorizontal: 15,
                                }}>
                                <View style={{
                                    padding: 7.5,
                                    backgroundColor: '#f5f5f5',
                                    borderBottomWidth: 0.5,
                                    borderColor: '#ddd',
                                }}>
                                    <View style={{ padding: 7.5 }}>
                                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>事故编号：{accident.id ? `${accident.id}` : ''}</Text>
                                    </View>
                                    <View style={{ padding: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialCommunityIcons name='truck' />
                                            <Text style={[globalStyles.midText, { paddingLeft: 5 }]}>{accident.truck_type == 1 && '车头'}{accident.truck_type == 2 && '挂车'}：{accident.truck_num ? `${accident.truck_num}` : ''}</Text>
                                        </View>
                                        <Text style={globalStyles.midText}>王保全</Text>
                                    </View>
                                    <View style={{ padding: 7.5, flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name='alert-circle' style={{ color: 'red' }} />
                                        <Text style={[globalStyles.midText, { paddingLeft: 5 }]}>右后杠损坏</Text>
                                    </View>
                                </View>
                                <View>
                                    <Field name='repairReason' label='事故描述' component={RichTextBox} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 13 }}>
                                    <Button style={{ flex: 1, margin: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb' }} onPress={() => this.setState({ modalVisible: false })}>
                                        <Text style={[globalStyles.midText, { color: '#fff' }]}>取消</Text>
                                    </Button>
                                    <Button style={{ flex: 1, margin: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: styleColor }} onPress={() => {
                                        handleSubmit()
                                        this.setState({ modalVisible: false })
                                    }}>
                                        <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                                    </Button>
                                </View>
                            </Content>
                        </Container>
                    </Modal>
                </Container>
            )
        }
    }
}



const mapStateToProps = (state) => {
    return {
        accidentRepairListReducer: state.accidentRepairListReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'createAccidentRepairForm',
    onSubmit: (values, dispatch, props) => {
        // console.log('onSubmitprops', props)
        dispatch(actions.accidentRepairList.createAccidentRepair({
            accidentId: props.accident.id,
            truckId: props.accident.truck_id,
            repairType: 1,
            ...values
        }))
    }
})(AccidentRepairList))