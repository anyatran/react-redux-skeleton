import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchDataIfNeeded } from '../actions'
import Table from '../components/Table'

class App extends Component {
  static propTypes = {
    data: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    selectedRepo: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedRepo } = this.props
    dispatch(fetchDataIfNeeded(selectedRepo))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRepo !== this.props.selectedRepo) {
      const { dispatch, selectedRepo } = nextProps
      dispatch(fetchDataIfNeeded(selectedRepo))
    }
  }

  render() {
    const { selectedRepo, data, isFetching, lastUpdated } = this.props
    if (!isFetching) {

      return (
        <div>
          <h1>APP</h1>
          <p>{ lastUpdated && <span> Last Updated At: {
            new Date(lastUpdated).toLocaleTimeString()
          }</span>}
          </p>

          <Table data={data} />
        </div>
      )
    }
    return (
      <div>Loading...</div>
    )
  }
}

/** tells how to transform the current Redux store state into the
* props you want to pass to a presentational component you are
* wrapping
*/
const mapStateToProps = state => {
  const { selectedRepo, eventFromRepo } = state
  const {
    isFetching,
    lastUpdated,
    items: data
  } = eventFromRepo[selectedRepo] || {
    isFetching: true,
    items: []
  }

  return {
    selectedRepo,
    data,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
