import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    DatePickerAndroid
} from 'react-native'

import { Icon } from 'native-base'
import { validate } from '../../../util/Validator'

const styles = StyleSheet.create({
    containerSytle: {
        borderBottomWidth: 0.5,
        // paddingHorizontal: 10,
        borderColor: '#dddddd',
        paddingVertical: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        //alignItems: 'center'
    },
    labelStyle: {
        fontSize: 12,
        //flex: 4,
        //textAlign: 'right'
    },
    textStyle: {
        fontSize: 12,
        //flex: 12
    },
    messageSytle: {
        color: 'red',
        fontSize: 10
    }
})

const baseStyles = {
    iconSytle: {
        fontSize: 18,
        //flex: 1,
        //textAlign: 'right',
        color: '#7a7a7a'
    }
}

export default class DateTimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTime: '',
            warnMessageList: []
        }
        this.changeDateTime = this.changeDateTime.bind(this)
    }

    componentWillMount() {
        this.setState({ dataTime: this.props.defaultValue })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({ dataTime: nextProps.value })
        } else {
            this.setState({ dataTime: nextProps.defaultValue })
        }
    }

    changeDateTime(value) {
        let state = { dataTime: value }
        let warnMessageList = validate(value, this.props.verifications)
        if (warnMessageList.length > 0) {
            state.warnMessageList = warnMessageList
        } else {
            state.warnMessageList = []
        }
        this.setState({ ...state })
        this.props.onValueChange(value)
        let flag = !(warnMessageList.length > 0)

        if (this.props.isRequire) {
            flag = !((value == this.props.defaultValue) || !flag)
        }
        this.props.onRequire(flag)
    }

    static defaultProps = {
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        textStyle: styles.textStyle,
        iconSytle: baseStyles.iconSytle,
        messageSytle: styles.messageSytle,
        onRequire: (param) => { }
    }


    async showPicker(options) {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                this.changeDateTime(`${year}-${month + 1}-${day}`)
            }
        } catch ({ code, message }) {
            console.warn(`Error in example : `, message)
        }
    }

    renderValidateMessage() {
        let warnMessage
        if (this.state.warnMessageList.length > 0) {
            warnMessage = this.state.warnMessageList.reduce((acc, val) => {
                return `${acc}${val}  `
            }, '')
            warnMessage = (<View style={{ alignSelf: 'flex-start', paddingLeft: 10 }}>
                <Text style={this.props.messageSytle}>{warnMessage}</Text>
            </View>)
        }
        return warnMessage
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor='rgba(0,0,0,0.1)'
                onPress={() => this.showPicker({ date: new Date(), mode: 'spinner' })}>

                <View style={this.props.containerSytle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 10, textAlign: 'right', color: 'red' }}>{this.props.isRequire && '*'}</Text>
                            <Text style={this.props.labelStyle}>{this.props.title} </Text>
                            <Text style={this.props.textStyle}>{this.state.dataTime}</Text>
                        </View>
                        {/*<Text style={this.props.labelStyle}>{this.props.isRequire && '*'}{this.props.title}<Text style={this.props.textStyle}>{this.state.dataTime}</Text></Text>*/}

                        <Icon
                            name='md-calendar'
                            style={this.props.iconSytle} />
                    </View>
                    {this.renderValidateMessage()}

                </View>

            </TouchableHighlight>
        )
    }
}



