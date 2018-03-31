import socketIOClient from 'socket.io-client'
import axios from 'axios'
export const INVALIDATE_USER = 'INVALIDATE_USER'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SELECT_REPO = 'SELECT_REPO'

/*
ACTIONS are payloads of information that send data from your
  application to your store.
  You send them with store.dispatch()
  Actions are JS obj that should contain type
*/

export const requestData = data => ({
  type: REQUEST_DATA,
  data
})

export const invalidateUser = repo => ({
  type: INVALIDATE_USER,
  repo
})

export const receiveData = (repo, json) => ({
  type: RECEIVE_DATA,
  repo,
  data: json,
  receivedAt: Date.now()
})

const fetchData = repo => dispatch => {
  dispatch(requestData(repo))
  // const socket = socketIOClient('/')
  // socket.on('events', data => console.log(data))
  // return fetch(`https://api.github.com/repos/rails/rails/pulls`)
    // .then(response => response.json())
  axios.get(`events?repo=${repo}`)
    .then(response => response.data)
    .then(json => {
      // console.log(json)
      dispatch(receiveData(repo, json))
    })
}

const shouldFetchData = (state, repo) => {
  const data = state.eventFromRepo[repo]
  if (!data) {
    return true
  }
  if (data.isFetching) {
    return false
  }
  return data.didInvalidate
}

export const fetchDataIfNeeded = repo => (dispatch, getState) => {
  if (shouldFetchData(getState(), repo)) {
    return dispatch(fetchData(repo))
  }
}
