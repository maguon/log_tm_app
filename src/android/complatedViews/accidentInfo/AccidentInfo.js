
import React from 'react'
import { View, Text } from 'react-native'
import { Container, Tab, Tabs, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { connect } from 'react-redux'
import AccidentDetail from '../accidentDetail/AccidentDetail'
import AccidentDisposeDetail from '../accidentDisposeDetail/AccidentDisposeDetail'
// import AccidentRepairFinish from './accidentRepairFinish/AccidentRepairFinish'
import AccidentIndemnifyList from '../accidentIndemnifyList/AccidentIndemnifyList'
import AccidentRepairList from '../accidentRepairList/AccidentRepairList'
import AccidentDisposeEditor from '../accidentDisposeEditor/AccidentDisposeEditor'
import CreateAccidentDispose from '../createAccidentDispose/CreateAccidentDispose'
import AccidentEditor from '../accidentEditor/AccidentEditor'
import UploadImageForAccidentInfo from '../uploadImageForAccidentInfo/UploadImageForAccidentInfo'

const AccidentInfo = props => {
    const {
        accident: { accident_status },
        accident,
        accidentInfoReducer: { data: { accidentDisposeInfo }, getAccidentDisposeInfo },
        accidentInfoReducer } = props
    console.log('accidentInfoReducer', accidentInfoReducer)
    return (
        <Container style={globalStyles.listBackgroundColor}>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="信息">
                    {accident_status == 3 && <AccidentDetail accident={accident} />}
                    {accident_status == 2 && <AccidentDetail accident={accident} />}
                    {accident_status == 1 && <AccidentEditor accident={accident} />}
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="照片">
                    <UploadImageForAccidentInfo accident={accident} />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="处理">
                    {getAccidentDisposeInfo.isResultStatus == 1 && <Spinner color={styleColor} />}
                    {getAccidentDisposeInfo.isResultStatus != 1 && accident_status == 1 && <CreateAccidentDispose accident={accident} />}
                    {getAccidentDisposeInfo.isResultStatus != 1 && accident_status == 2 && <AccidentDisposeEditor accident={accident} accidentDisposeInfo={accidentDisposeInfo} />}
                    {getAccidentDisposeInfo.isResultStatus != 1 && accident_status == 3 && <AccidentDisposeDetail accident={accident} accidentDisposeInfo={accidentDisposeInfo} />}
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="维修">
                    <AccidentRepairList accident={accident} />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="理赔">
                    <AccidentIndemnifyList accident={accident} />
                </Tab>
            </Tabs>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    // console.log('ownProps', ownProps)
    return {
        accident: state.accidentListReducer.data.accidentList.find(item => item.id == ownProps.initParam.accidentId),
        accidentInfoReducer: state.accidentInfoReducer,
        //formValues: getFormValues('accidentEditorForm')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    // getDpRouteRaskOptionalList: () => {
    //     dispatch(actions.dpRouteRaskOptionalList.getDpRouteRaskOptionalList())
    // },
    // getDpRouteRaskOptionalListWaiting: () => {
    //     dispatch(actions.dpRouteRaskOptionalList.getDpRouteRaskOptionalListWaiting())
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentInfo)
