import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {

}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({


}, initialState)