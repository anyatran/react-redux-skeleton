import { combineReducers } from 'redux' // combine all reducers for a component
import {
  INVALIDATE_USER,
  REQUEST_DATA,
  RECEIVE_DATA,
  SELECT_REPO
} from '../actions'

/*
REDUCERS specify how the application's state changes in response
  to actions sent to the store
Given the same arguments, it should calculate the next state and
return it. No surprises. No side effects. No API calls. No
mutations. Just a calculation
Things you should never do inside a reducer:
  Mutate its arguments;
  Perform side effects like API calls and routing transitions;
  Call non-pure functions, e.g. Date.now() or Math.random()
Note on state:
  1. We don't mutate state but return a modified obj instead
  2. we return the previous state in default
*/

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  from: null,
  to: null
}

// Action creators that creates an action
const selectedRepo = (state = 'rails', action) => {
  switch (action.type) {
    case SELECT_REPO:
      return action.repo
    default:
      return state
  }
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case INVALIDATE_USER:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DATA:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DATA:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.data,
        lastUpdated: action.receivedAt,
        to: action.data[0].created_at,
        from: action.data[action.data.length - 1].created_at,
      }
    default:
      return state
  }
}

const eventFromRepo = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_USER:
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return {
        ...state,
        [action.repo]: data(state[action.repo], action)
      }
    default:
      return state
  }
}

export default combineReducers({
  selectedRepo,
  eventFromRepo
})
