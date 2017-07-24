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
        paddingHorizontal: 10,
        borderColor: '#dddddd',
        paddingVertical: 10,
        //justifyContent: 'space-between',
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

export default class RichTextBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            warnMessageList: []
        }
        this.changeValue = this.changeValue.bind(this)
        this.showRichText = this.showRichText.bind(this)
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
        this.setState({ value: param.value })
        this.props.onValueChange(param.value)
        if (this.props.isRequire) {
            param.flag = !((param.value == this.props.defaultValue) || !param.flag)
        }
        this.props.onRequire(param.flag)
    }

    showRichText() {
        this.props.showRichText({
            onGetValue: this.changeValue,
            richTextValue: this.props.value ? this.props.value : '',
            verifications: this.props.verifications
        })
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

    renderTag() {
        if (this.props.isRequire) {
            return <Text style={{ color: 'red', textAlign: 'left' }}>*</Text>
        }
        else {
            return
        }
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor='rgba(0,0,0,0.1)'
                onPress={this.showRichText}>

                <View style={this.props.containerSytle}>
                    <View style={{ flexDirection: 'row',justifyContent: 'space-between' }}>
                        <Text style={this.props.labelStyle}>{this.renderTag()}{this.props.title}<Text style={this.props.textStyle}>{this.state.value}</Text></Text>
                        
                        <Icon
                            name='ios-arrow-forward'
                            style={this.props.iconSytle} />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}