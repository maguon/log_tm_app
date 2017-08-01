import httpRequest from '../util/HttpRequest.js'
import { ObjectToUrl } from '../util/ObjectToUrl'
import requestHeaders from '../util/RequestHeaders'

// export const get = (types, param) => (dispatch) => {
//     let url = `${base_host}/truckFirst`
//     dispatch({ type: types.WAITING, payload: {} })
//     httpRequest
//         .get(url, (err, res) => {
//             if (err) {
//                 dispatch({ type: types.ERROR, payload: { data: err } })
//             } else {
//                 if (res.success) {
//                     dispatch({ type: types.SUCCESS, payload: { data: res.result } })
//                 } else {
//                     dispatch({ type: types.FAILED, payload: { data: res.msg } })
//                 }
//             }
//         })
// }

export const getAction = (types, url) => async (dispatch) => {
    // console.log('types',types)
    // console.log('url',url)
    try {
        dispatch({ type: types.WAITING, payload: {} })
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: types.SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: types.FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: types.ERROR, payload: { data: err } })
    }
}

