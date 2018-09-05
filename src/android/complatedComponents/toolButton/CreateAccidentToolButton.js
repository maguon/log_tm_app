import React from 'react'
import { View, Text, StyleSheet, InteractionManager } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as actions from '../../../actions'

const CreateAccidentToolButton = props => {
    const { onSubmit, createAccidentReducer: { data: { status, accidentId, vheNo }, createAccident, modifyAccident },
        getImageForCreateAccident, getImageForCreateAccidentWaiting } = props
    if (createAccident.isResultStatus == 1) {
        return (
            <Spinner color='#fff' size={'small'} />
        )
    } else {
        return (
            <View style={{ flexDirection: 'row' }}>
                {status == 0 && createAccident.isResultStatus != 1 && <Button transparent onPress={onSubmit}>
                    <Text style={[globalStyles.midText, styles.text]}>下一步</Text>
                </Button>}
                {status == 0 && createAccident.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && modifyAccident.isResultStatus != 1 && <Button transparent onPress={onSubmit}>
                    <Text style={[globalStyles.midText, styles.text]}>修改</Text>
                </Button>}
                {status == 1 && modifyAccident.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && <Button transparent onPress={() => {
                    getImageForCreateAccidentWaiting()
                    Actions.uploadImageForCreateAccident()
                    InteractionManager.runAfterInteractions(() => getImageForCreateAccident({ accidentId }))
                }}>
                    <Text style={[globalStyles.midText, styles.text]}>下一步</Text>
                </Button>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        createAccidentReducer: state.createAccidentReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => {
        dispatch(submit('createAccidentForm'))
    },
    getImageForCreateAccident: param => {
        dispatch(actions.uploadImageForCreateAccident.getImageForCreateAccident(param))
    },
    getImageForCreateAccidentWaiting: () => {
        dispatch(actions.uploadImageForCreateAccident.getImageForCreateAccidentWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccidentToolButton)
