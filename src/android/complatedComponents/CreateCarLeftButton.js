import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const CreateCarLeftButton = props => {
    const { cleanCreateAccident } = props
    return (
        <Button transparent onPress={() => {
            cleanCreateAccident()
            Actions.pop()
        }}>
            <Icon name='arrow-back' />
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    cleanCreateAccident: () => {
        dispatch(actions.createAccident.cleanCreateAccident())
    }
})

export default connect(null, mapDispatchToProps)(CreateCarLeftButton)