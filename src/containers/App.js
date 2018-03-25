import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchDataIfNeeded } from '../actions'
import Filter from '../components/Filter'
import Table from '../components/Table'

class App extends Component {
  static propTypes = {
    data: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    selectedUser: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedUser } = this.props
    dispatch(fetchDataIfNeeded(selectedUser))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser !== this.props.selectedUser) {
      const { dispatch, selectedUser } = nextProps
      dispatch(fetchDataIfNeeded(selectedUser))
    }
  }

  render() {
    const { selectedUser, data, isFetching, lastUpdated } = this.props
    return (
      <div>
        <h1>APP</h1>
        <p>{ lastUpdated && <span> Last Updated At: {
          new Date(lastUpdated).toLocaleTimeString()
        }</span>}
        </p>
        <Filter />
        <Table data={data} />
      </div>
    )
  }
}

/** tells how to transform the current Redux store state into the
* props you want to pass to a presentational component you are
* wrapping
*/
const mapStateToProps = state => {
  const { selectedUser, eventFromUser } = state
  const {
    isFetching,
    lastUpdated,
    items: data
  } = eventFromUser[selectedUser] || {
    isFetching: true,
    items: []
  }

  return {
    selectedUser,
    data,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
