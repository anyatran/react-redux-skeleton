import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' //provides a store
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './containers/App'
import rootReducer from './reducers'
/*
REDUCERS specify how the application's state changes in response
  to actions sent to the store
ACTIONS are payloads of information that send data from your
  application to your store.
  You send them with store.dispatch()
  Actions are JS obj that should contain type
PRINCIPLES OF REDUX:
  1. Do not mutate state; copy it. State is Read-only
  2. Single source of truth - the store
  3. Changes are made with Pure Functions, aka reducers
*/
// import './styles/app.scss'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)
