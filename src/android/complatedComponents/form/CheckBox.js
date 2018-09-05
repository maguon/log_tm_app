import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Modal,
    FlatList
} from 'react-native'
import { Icon } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15

export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
        this.renderCheckListItem = this.renderCheckListItem.bind(this)
    }

    renderCheckListItem({ item, onChange, value }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                <View style={{ flex: 1 }} />
                <TouchableOpacity style={{ flex: 5 }} onPress={() => {
                    this.setState({ modalVisible: false })
                    onChange(item)
                }}>
                    {!!value && value.id == item.id && <Text style={[globalStyles.midText, { textAlign: 'center', paddingVertical: 15, color: '#188df2' }]}>{item.value}</Text>}
                    {(!value || !(value.id == item.id)) && <Text style={[globalStyles.midText, { textAlign: 'center', paddingVertical: 15 }]}>{item.value}</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                    this.setState({ modalVisible: false })
                    onChange(null)
                }}>
                    {!!value && value.id == item.id && <Icon name='ios-close-circle-outline' style={{ color: '#188df2', fontSize: 20 }} />}
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let { input: { onChange, value, },
            label = '',
            isRequired = false,
            textStyle = {},
            meta: { error, touched } } = this.props
        return (
            <TouchableOpacity style={styles.body} onPress={() => this.setState({ modalVisible: true })}>
                <View style={styles.item}>
                    <Text style={[globalStyles.midText, textStyle, {}]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[globalStyles.midText, textStyle]}>{value.value}</Text>
                        <Icon name='ios-arrow-down-outline' color='#777' fontSize={15} style={{ fontSize: 18, color: '#bbb', paddingLeft: 15 }} />
                    </View>
                </View>
                {touched && (error && <View style={styles.errView}>
                    <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
                </View>)}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flex: 1
                        }}>
                        <TouchableOpacity style={{ flex: 1, alignSelf: 'stretch' }} onPress={() => this.setState({ modalVisible: false })} />
                        <View style={{
                            backgroundColor: '#fff',
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            borderWidth: 0.5,
                            borderColor: '#ccc',
                        }}>
                            <FlatList
                                data={this.props.itemList}
                                ListHeaderComponent={<View style={{ borderBottomWidth: 1, borderColor: styleColor }}>
                                    <Text style={{ paddingVertical: 15, color: styleColor, textAlign: 'center' }}>{this.props.listTitle}</Text>
                                </View>}
                                renderItem={({ item }) => this.renderCheckListItem({ item, onChange, value })} />
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errView: {
        marginTop: margin
    }
})


// export default CheckBox