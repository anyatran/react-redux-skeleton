import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filter from './Filter'

class Table extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  renderRows() {
    return this.props.data.map((item, index) => {
      return (
        <tr key={index}>
          <td className="table__cell">
            {item.user.login}
          </td>
          <td className="table__cell">
            {item.type}
          </td>
          <td className="table__cell">
            {`${new Date(item.created_at).toLocaleDateString()} at ${new Date(item.created_at).toLocaleTimeString()}`}
          </td>
        </tr>
      )
    })
  }

  filter = range => {
    console.log('filter: ', range)
  }

  render() {
    const to = this.props.data[0].created_at
    const from = this.props.data[this.props.data.length - 1].created_at
    return (
      <div>
        <Filter from={from} to={to} onSubmit={this.filter}/>
        <table>
          <thead>
            <tr>
              <td className="table__cell table__cell-head">
                Username
              </td>
              <td className="table__cell">
                Event
              </td>
              <td className="table__cell">
                Created At
              </td>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
