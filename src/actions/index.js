export const INVALIDATE_USER = 'INVALIDATE_USER'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SELECT_USER = 'SELECT_USER'

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

export const invalidateUser = user => ({
  type: INVALIDATE_USER,
  user
})

export const receiveData = (user, json) => ({
  type: RECEIVE_DATA,
  user,
  data: json,
  receivedAt: Date.now()
})

const fetchData = user => dispatch => {
  dispatch(requestData(user))
  return fetch(`https://api.github.com/events`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      dispatch(receiveData(user, json))
    })
}

const shouldFetchData = (state, user) => {
  const data = state.eventFromUser[user]
  if (!data) {
    return true
  }
  if (data.isFetching) {
    return false
  }
  return data.didInvalidate
}

export const fetchDataIfNeeded = user => (dispatch, getState) => {
  if (shouldFetchData(getState(), user)) {
    return dispatch(fetchData(user))
  }
}
