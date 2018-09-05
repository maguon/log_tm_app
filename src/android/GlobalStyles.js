import {
    StyleSheet
} from 'react-native'
import { fontSizeCoeff } from '../util/util'

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    },
    styleColor: {
        color: '#FE851B'
    },
    styleBackgroundColor: {
        backgroundColor: '#FE851B'     
    },
    textColor:{
        color: '#777'
    },
    midText: {
        fontSize: 14 * fontSizeCoeff,
        color: '#777'
    },
    midTextNoColor: {
        fontSize: 14 * fontSizeCoeff
    },
    smallText: {
        fontSize: 12 * fontSizeCoeff,
        color: '#777'
    },
    ssText: {
        fontSize: 10 * fontSizeCoeff,
        color: '#777'
    },
    largeText:{
        fontSize: 16 * fontSizeCoeff,
        color: '#777'
    },
    xlText:{
        fontSize: 18 * fontSizeCoeff,
        color: '#777'
    },
    formIcon:{
        marginLeft: 10,
        fontSize:20,
        color: '#777'
    },
    listContainer: {
        backgroundColor: '#eee',
        padding: 5
    },
    listItem:{
        backgroundColor: '#fff',
        margin: 5
    },
    errorText:{
        fontSize: 12 * fontSizeCoeff,
        color: 'red'
    }
})

export const styleColor='#FE851B'

export default globalStyles