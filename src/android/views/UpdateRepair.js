import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import RichTextBox from '../components/form/RichTextBox'
import * as RouterDirection from '../../util/RouterDirection'
import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import { Actions } from 'react-native-router-flux'

export default class UpdateRepair extends Component {
    constructor(props) {
        super(props)
        this.state={
            remark:'',
            repairMoney:''
        }
        this.onRepairUpdate=this.onRepairUpdate.bind(this)
    }

    onRepairUpdate(){
        this.props.onRepairUpdate({
            remark:this.state.remark,
            repairMoney:this.state.repairMoney
        })
        Actions.pop()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderColor: '#e3e3e3', borderBottomWidth: 0.5 }}>
                    <Text style={{ fontSize: 12 }}>结束日期：{new Date().toLocaleDateString()}</Text>
                </View>
                <RichTextBox
                    title='维修描述：'
                    value={this.state.remark}
                    onValueChange={(param) => this.setState({ remark: param })}
                    showRichText={RouterDirection.richText(this.props.parent)}
                />
                <TextBox
                    title='维修金额：'
                    value={this.state.repairMoney}
                    onValueChange={(param) => this.setState({ repairMoney: param })}
                    placeholder='请输入维修金额'
                />
                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Button full onPress={this.onRepairUpdate} style={{ backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>保存信息</Text>
                    </Button>
                </View>
            </View>
        )
    }
}