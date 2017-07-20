import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
  import App from './android/App'
import Home from './android/views/blockInitial/Home'


// const store = compose(
//     applyMiddleware(ReduxThunk)
// )(createStore)(reducers)

class Android_main extends Component {
    constructor(props) {
        super(props)
    }  

    render() {
        return (
        //    <Provider store={store}>
                <App />
        //   </Provider>
        )
    }
}

export default Android_main