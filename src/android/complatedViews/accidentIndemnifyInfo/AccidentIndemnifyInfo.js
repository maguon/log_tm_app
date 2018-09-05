import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Container, Content, ListItem, Body, Card, CardItem, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import AccidentIndemnifyEditor from '../accidentIndemnifyEditor/AccidentIndemnifyEditor'
import AccidentIndemnifyDetail from '../accidentIndemnifyDetail/AccidentIndemnifyDetail'
import { connect } from 'react-redux'

const AccidentIndemnifyInfo = props => {
    const { accidentIndemnify, accidentIndemnifyInfoReducer: { data: { accidentInsureLoan }, getAccidentInsureLoan } } = props
    if (getAccidentInsureLoan.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                {accidentIndemnify.insure_status == 1 && <AccidentIndemnifyEditor
                    accidentIndemnify={accidentIndemnify}
                    accidentInsureLoan={accidentInsureLoan}
                    accidentId={props.accidentId} />}
                {accidentIndemnify.insure_status == 2 && <AccidentIndemnifyDetail
                    accidentIndemnify={accidentIndemnify}
                    accidentInsureLoan={accidentInsureLoan} />}
            </Container>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const accidentIndemnify = state.accidentIndemnifyListReducer.data.accidentIndemnifyList.find(item => item.id == ownProps.accidentInsureId)
    return {
        accidentIndemnify,
        accidentIndemnifyInfoReducer: state.accidentIndemnifyInfoReducer
    }
}


export default connect(mapStateToProps)(AccidentIndemnifyInfo) 
