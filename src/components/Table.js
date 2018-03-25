import React from 'react'
import PropTypes from 'prop-types'

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <td className="table__cell table__cell-head">
          Username
        </td>
        <td className="table__cell">
          Event
        </td>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="table__cell">
              {item.actor.display_login}
            </td>
            <td className="table__cell">
              {item.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


export default Table
