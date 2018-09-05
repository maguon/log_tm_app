import React, { Component } from 'react'
import {
    Text
} from 'react-native'
import { Container, Content, Button,Spinner } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import { TextBox } from '../../../complatedComponents/form'
import * as actions from '../../../../actions'
import { requiredObj, required, money } from '../../../../util/Validator'
import { connect } from 'react-redux'
import * as actionTypes from '../../../../actions/actionTypes'
import globalStyles, { styleColor } from '../../../GlobalStyles'


const requiredValidator = required('调度编号不能为空')

const DpRouteRaskOptionalList = props => {
    const { handleSubmit, dpRouteRaskOptionalListReducer: { data: { dpRouteRask }, getDpRouteRaskOptionalList } } = props
    return (
        <Container>
            <Content>
                <Field name='dpRouteTaskId' label='调度编号：' isRequired={true} validate={[requiredValidator]} component={TextBox} />
                {!dpRouteRask && getDpRouteRaskOptionalList.isResultStatus == 2 && <Text style={[globalStyles.midText, { color: 'red', margin: 15 }]}>暂无该调度编号</Text>}
                {getDpRouteRaskOptionalList.isResultStatus != 1 && <Button full style={[globalStyles.styleBackgroundColor, { margin: 15 }]} onPress={() => { handleSubmit() }}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                </Button>}
                {getDpRouteRaskOptionalList.isResultStatus == 1 && <Spinner color={styleColor} style={{ margin: 15 }}/>}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        dpRouteRaskOptionalListReducer: state.dpRouteRaskOptionalListReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'getDpRouteTaskIdForm',
    onSubmit: (values, dispatch, props) => {
        const { onSelect } = props
        dispatch(actions.dpRouteRaskOptionalList.getDpRouteRaskOptionalList({ onSelect, ...values }))
    },
    onChange: (values, dispatch, props) => {
        const { dpRouteRaskOptionalListReducer: { getDpRouteRaskOptionalList } } = props
        console.log('onChange')
        if (getDpRouteRaskOptionalList.isResultStatus != 0) {
            dispatch({ type: actionTypes.dpRouteRaskOptionalList.reset_dpRouteRaskOptionalList_status, payload: {} })
        }
    }
})(DpRouteRaskOptionalList))




// import React, { Component } from 'react'
// import {
//     Text,
//     FlatList,
//     StyleSheet,
//     TouchableOpacity
// } from 'react-native'
// import { connect } from 'react-redux'
// import { Actions } from 'react-native-router-flux'
// import globalStyles, { styleColor } from '../../../GlobalStyles'
// import { Container, Spinner, ListItem, Left, Right, Button, Icon } from 'native-base'
// import * as actions from '../../../../actions'

// const DpRouteRaskOptionalList = props => {
//     const { onSelect, cleanSelected, getDpRouteRaskOptionalListMore, selectedItem, dpRouteRaskOptionalListReducer: { data: { dpRouteRaskOptionalList }, getDpRouteRaskOptionalList } } = props
//     let list = dpRouteRaskOptionalList
//     if (selectedItem) {
//         selected = {
//             ...selectedItem.item,
//             isSelectedItem: true
//         }
//         noSelectedList = dpRouteRaskOptionalList.filter(item => item.id != selectedItem.id)
//         list = [selected, ...noSelectedList]
//     }

//     if (getDpRouteRaskOptionalList.isResultStatus == 1) {
//         return (
//             <Container>
//                 <Spinner color={styleColor} />
//             </Container>
//         )
//     } else {
//         return (
//             <Container>
//                 <FlatList
//                     keyExtractor={(item, index) => index}
//                     data={list}
//                     onEndReachedThreshold={0.3}
//                     onEndReached={getDpRouteRaskOptionalListMore}
//                     renderItem={({ item, index }) => {
//                         return (
//                             <ListItem key={index}
//                                 onPress={() => {
//                                     if (!item.isSelectedItem) {
//                                         onSelect(item)
//                                         Actions.pop()
//                                     }
//                                 }}>
//                                 <Left style={{ justifyContent: 'space-between' }}>
//                                     <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
//                                         {item.id}
//                                     </Text>
//                                     <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
//                                         {item.city_route_start} -> {item.city_route_end}
//                                     </Text>
//                                 </Left>
//                                 <Right>
//                                     {item.isSelectedItem && <TouchableOpacity onPress={() => {
//                                         Actions.refresh({ selectedItem: null })
//                                         cleanSelected()
//                                     }}>
//                                         <Icon name='ios-close-circle-outline' style={{ color: '#188df2' }} />
//                                     </TouchableOpacity >}
//                                 </Right>
//                             </ListItem>
//                         )
//                     }}
//                 />
//             </Container>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     item: {
//         marginHorizontal: 15,
//         paddingVertical: 15,
//         borderColor: '#ddd',
//         borderBottomWidth: 0.3,
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     }
// })

// const mapStateToProps = (state) => ({
//     dpRouteRaskOptionalListReducer: state.dpRouteRaskOptionalListReducer
// })

// const mapDispatchToProps = (dispatch) => ({
//     // getDpRouteRaskOptionalListMore: () => {
//     //     dispatch(actions.dpRouteRaskOptionalList.getDpRouteRaskOptionalListMore())
//     // }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(DpRouteRaskOptionalList)