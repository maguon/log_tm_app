import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import RichTextBox from '../components/form/RichTextBox'
import * as RouterDirection from '../../util/RouterDirection'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../GlobalStyles'

export default class AddRepair extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repairReason: ''
        }
        this.OnRepairSave=this.OnRepairSave.bind(this)
    }

    OnRepairSave() {
        this.props.OnRepairSave({ repairReason: this.state.repairReason })
        Actions.pop()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderColor: '#e3e3e3', borderBottomWidth: 0.5 }}>
                    <Text style={{ fontSize: 12 }}>维修日期：{new Date().toLocaleDateString()}</Text>
                </View>
                <RichTextBox
                    title='维修原因：'
                    //verifications={[{
                    //     type: 'isLength',
                    //      arguments: [0, 300],
                    //      message: '长度0-300位'
                    //  }]}
                    // value={remark}
                    value={this.state.repairReason}
                    onValueChange={(param) => this.setState({ repairReason: param })}
                    showRichText={RouterDirection.richText(this.props.parent)}
                />

                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Button full onPress={this.OnRepairSave} style={{ backgroundColor: styleColor }}>
                        <Text style={{ color: '#fff' }}>保存信息</Text>
                    </Button>
                </View>
            </View>
        )
    }
}