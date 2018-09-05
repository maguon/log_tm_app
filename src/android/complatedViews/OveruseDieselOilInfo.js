import React from 'react'
import { Text } from 'react-native'
import { Container, Content, ListItem, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../GlobalStyles'
import { connect } from 'react-redux'
import moment from 'moment'

const OveruseDieselOilInfo = props => {
    const { overuseDieselOil } = props
    // if (getDpRouteTask.isResultStatus == 1) {
    //     return (
    //         <Container>
    //             <Spinner color={styleColor} />
    //         </Container>
    //     )
    // } else {
    return (
        <Container>
            <Content>
                <ListItem last style={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderBottomWidth: 1 }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>超油结算编号：{overuseDieselOil.id ? `${overuseDieselOil.id}` : ''}</Text>
                    {overuseDieselOil.stat_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>未扣</Text>}
                    {overuseDieselOil.stat_status == 2 && <Text style={globalStyles.midText}>已扣</Text>}
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>调度编号</Text>
                    <Text style={globalStyles.midText}>{overuseDieselOil.dp_route_task_id ? `${overuseDieselOil.dp_route_task_id}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>司机</Text>
                    <Text style={globalStyles.midText}>{overuseDieselOil.drive_name ? `${overuseDieselOil.drive_name}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>货车牌号</Text>
                    <Text style={globalStyles.midText}>{overuseDieselOil.truck_num ? `${overuseDieselOil.truck_num}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>指令时间</Text>
                    <Text style={globalStyles.midText}>{overuseDieselOil.task_plan_date ? `${moment(overuseDieselOil.task_plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>超油量</Text>
                    <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.exceed_oil_quantity ? `${overuseDieselOil.exceed_oil_quantity}` : '0'}</Text>L</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={globalStyles.midText}>超油金额</Text>
                    <Text style={globalStyles.midText}><Text style={{ color: 'red', fontWeight: 'bold' }}>{overuseDieselOil.exceed_oil_money ? `${overuseDieselOil.exceed_oil_money}` : '0'}</Text>元</Text>
                </ListItem>
                <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={globalStyles.midText}>备注</Text>
                    <Text style={globalStyles.midText}>{overuseDieselOil.remark ? `${overuseDieselOil.remark}` : ''}</Text>
                </ListItem>
            </Content>
        </Container>
    )
    // }
}

const mapStateToProps = (state, ownProps) => {
    return {
        overuseDieselOil: state.overuseDieselOilListReducer.data.overuseDieselOilList.find(item => item.id == ownProps.initParam.overuseDieselOilId),
        // overuseDieselOilInfoReducer: state.overuseDieselOilInfoReducer
    }
}

export default connect(mapStateToProps)(OveruseDieselOilInfo)

// import React from 'react'
// import { View, Text } from 'react-native'
// import { Container, Content, ListItem } from 'native-base'
// import globalStyles from '../GlobalStyles'

// const OveruseDieselOilInfo = props => {
//     return (
//         <Container>
//             <Content>
//                 <ListItem last style={{ justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderBottomWidth: 1 }}>
//                     <Text style={[globalStyles.midText, globalStyles.styleColor]}>超油结算编号：132456789</Text>
//                     <Text style={globalStyles.midText}>已扣</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>调度编号</Text>
//                     <Text style={globalStyles.midText}>2016164546</Text>
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
//                     <Text style={globalStyles.midText}>指令时间</Text>
//                     <Text style={globalStyles.midText}>2018-05-03</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>超油量</Text>
//                     <Text style={globalStyles.midText}>300L</Text>
//                 </ListItem>
//                 <ListItem style={{ justifyContent: 'space-between' }}>
//                     <Text style={globalStyles.midText}>超油金额</Text>
//                     <Text style={globalStyles.midText}>3000.0元</Text>
//                 </ListItem>
//                 <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                     <Text style={globalStyles.midText}>备注</Text>
//                     <Text style={globalStyles.midText}>王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉王宝泉</Text>
//                 </ListItem>
//             </Content>
//         </Container>
//     )
// }

// export default OveruseDieselOilInfo