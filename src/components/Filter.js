import React from 'react'

const Filter = ({from, to, onSubmit}) => {
  console.log(from, to)
  return(
    <form onSubmit={(e) => {
      e.preventDefault()
      return onSubmit({from, to})}
    }>
      FILTER
      <p>{`From: ${new Date(from).toLocaleDateString()}`}</p>
      <p>{`To: ${new Date(to).toLocaleDateString()}`}</p>
      <input type="text"></input>
      <input type="submit"></input>
    </form>
  )
}

export default Filter
