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
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    containerSytle: {
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        flex: 1,
        borderColor: '#dddddd',
        paddingRight: 10
        //alignItems: 'center',
        //backgroundColor: 'blue'
    },
    labelStyle: {
        fontSize: 12,
    },
    textStyle: {
        fontSize: 12,
    },
    messageSytle: {
        color: 'red',
        fontSize: 10
    }
})

const baseStyles = {
    iconSytle: {
        fontSize: 18,
        //textAlign: 'right',
        color: '#7a7a7a'
    }
}

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            warnMessageList: []
        }
        this.changeValue = this.changeValue.bind(this)
        this.showList = this.showList.bind(this)
        this.renderEnable = this.renderEnable.bind(this)
        this.renderDisable = this.renderDisable.bind(this)
    }

    componentWillMount() {
        this.setState({ value: this.props.defaultValue })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({ value: nextProps.value })
        } else {
            this.setState({ value: nextProps.defaultValue })
        }
    }

    changeValue(param) {
        let state = {}
        if (!this.props.value) {
            state.value = param.value
        }
        let warnMessageList = validate(param.value, this.props.verifications)
        if (warnMessageList.length > 0) {
            state.warnMessageList = warnMessageList
        } else {
            state.warnMessageList = []
        }
        this.setState({ ...state })
        this.props.onValueChange(param)
        let flag = !(warnMessageList.length > 0)
        if (this.props.isRequire) {
            flag = !((param.value == this.props.defaultValue) || !flag)
        }
        this.props.onRequire(flag)
    }



    showList() {
        this.props.showList({ onSelect: this.changeValue })
    }

    static defaultProps = {
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        textStyle: styles.textStyle,
        iconSytle: baseStyles.iconSytle,
        messageSytle: styles.messageSytle,
        onRequire: (param) => { },
        isEnable: true,
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

    renderEnable() {
        return (
            <TouchableHighlight
                underlayColor='rgba(0,0,0,0.1)'
                onPress={this.showList}>
                <View style={this.props.containerSytle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 10, textAlign: 'right', color: 'red' }}>{this.props.isRequire && '*'}</Text>
                            <Text style={this.props.labelStyle}>{this.props.title} </Text>
                            <Text style={this.props.textStyle}>{this.state.value}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            style={this.props.iconSytle} />
                    </View>
                    {this.renderValidateMessage()}
                </View>
            </TouchableHighlight>
        )
    }
    renderDisable() {
        return (
            <View style={[this.props.containerSytle, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: 10, textAlign: 'right', color: 'red' }}>{this.props.isRequire && '*'}</Text>
                        <Text style={this.props.labelStyle}>{this.props.title}</Text>
                        <Text style={this.props.textStyle}>{this.state.value}</Text>
                    </View>
                    <Icon
                        name='ios-arrow-forward'
                        style={this.props.iconSytle} />
                </View>
                {this.renderValidateMessage()}
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.props.isEnable ? this.renderEnable() : this.renderDisable()}
            </View>

        )
    }
}



