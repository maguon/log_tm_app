import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import RichTextBox from '../components/form/RichTextBox'
import * as RouterDirection from '../../util/RouterDirection'
import { Button, Container, Content } from 'native-base'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../GlobalStyles'


export default class UpdateRepair extends Component {
    constructor(props) {
        super(props)
        this.state = {
            remark: '',
            repairMoney: '',
            repairStationId: 0,
            repairStation: ''
        }
        this.onRepairUpdate = this.onRepairUpdate.bind(this)
    }

    onRepairUpdate() {
        this.props.onRepairUpdate({
            remark: this.state.remark,
            repairMoney: this.state.repairMoney,
            repairStationId: this.state.repairStationId
        })
        Actions.pop()
    }

    render() {
        return (
            <Container>
                <Content>
                    <Select
                        title='维修站：'
                        isRequire={true}
                        value={this.state.repairStationId ? `${this.state.repairStation}` : '请选择'}
                        showList={Actions.selectRepairStationAtHomeBlock}
                        onValueChange={(param) => {
                            this.setState({ repairStationId: param.id, repairStation: param.value })
                        }}
                        defaultValue={'请选择'}
                    />
                    <TextBox
                        title='维修金额：'
                        isRequire={true}
                        value={this.state.repairMoney}
                        onValueChange={(param) => this.setState({ repairMoney: param })}
                        placeholder='请输入维修金额'
                    />
                    <RichTextBox
                        title='维修描述：'
                        value={this.state.remark}
                        onValueChange={(param) => this.setState({ remark: param })}
                        showRichText={RouterDirection.richText(this.props.parent)}
                    />
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button full onPress={this.onRepairUpdate} style={{ backgroundColor: styleColor }}>
                            <Text style={{ color: '#fff' }}>保存信息</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}