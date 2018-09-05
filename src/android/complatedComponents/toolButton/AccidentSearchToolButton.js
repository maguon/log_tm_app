import React from 'react'
import { View, Text} from 'react-native'
import { Button } from 'native-base'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../GlobalStyles'

const AccidentSearchToolButton = props => {
    const { submit } = props
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={submit}>
                <Text style={[globalStyles.midText, { color: '#fff' }]}>搜索</Text>
            </Button>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => ({
    submit: () => {
        dispatch(submit('searchAccidentForm'))
    }
})

export default connect(null, mapDispatchToProps)(AccidentSearchToolButton)