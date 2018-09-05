import React from 'react'
import { View, Text } from 'react-native'
import { Container, Content, ListItem } from 'native-base'
import globalStyles from '../GlobalStyles'
import { connect } from 'react-redux'
import moment from 'moment'


const PeccancyInfo = props => {
    const { peccancy } = props
    return (
        <Container>
            <Content>
                <ListItem last style={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderBottomWidth: 1 }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>违章结算编号：{peccancy.id ? `${peccancy.id}` : ''}</Text>
                    {peccancy.stat_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>未扣</Text>}
                    {peccancy.stat_status == 2 && <Text style={globalStyles.midText}>已扣</Text>}
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>司机</Text>
                    <Text style={globalStyles.midText}>{peccancy.drive_name ? `${peccancy.drive_name}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>货车牌号</Text>
                    <Text style={globalStyles.midText}>{peccancy.truck_num ? `${peccancy.truck_num}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>扣罚分数</Text>
                    <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{peccancy.fine_score ? `${peccancy.fine_score}` : '0'}</Text></Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>罚款金额</Text>
                    <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{peccancy.fine_money ? `${peccancy.fine_money}` : '0'}</Text>元</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>发生时间</Text>
                    <Text style={globalStyles.midText}>{peccancy.start_date ? `${moment(peccancy.start_date).format('YYYY-MM-DD')}` : ''}  至  {peccancy.end_date ? `${moment(peccancy.end_date).format('YYYY-MM-DD')}` : ''}</Text>
                </ListItem>
                <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={globalStyles.midText}>备注</Text>
                    <Text style={globalStyles.midText}>{peccancy.remark ? `${peccancy.remark}` : ''}</Text>
                </ListItem>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        peccancy: state.peccancyListReducer.data.peccancyList.find(item => item.id == ownProps.initParam.peccancyId)
    }
}

export default connect(mapStateToProps)(PeccancyInfo)

// import React from 'react'
// import { View, Text } from 'react-native'
// import { Container, Content, ListItem } from 'native-base'
// import globalStyles from '../GlobalStyles'

// const PeccancyInfo = props => {
//     return (
//         <Container>
//             <Content>
//                 <ListItem last style={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderBottomWidth: 1 }}>
//                     <Text style={[globalStyles.midText, globalStyles.styleColor]}>违章结算编号：132456789</Text>
//                     <Text style={globalStyles.midText}>已扣</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>司机</Text>
//                     <Text style={globalStyles.midText}>王宝泉</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>货车牌号</Text>
//                     <Text style={globalStyles.midText}>辽B12345</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>扣罚分数</Text>
//                     <Text style={globalStyles.midText}>0</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>罚款金额</Text>
//                     <Text style={globalStyles.midText}>3000.0元</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>时间范围</Text>
//                     <Text style={globalStyles.midText}>2018-08-29  至  2018-08-29</Text>
//                 </ListItem>
//                 <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                     <Text style={globalStyles.midText}>备注</Text>
//                     <Text style={globalStyles.midText}>王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉</Text>
//                 </ListItem>
//             </Content>
//         </Container>
//     )
// }

// export default PeccancyInfo