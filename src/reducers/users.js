const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      const newUser = {
        name: action.name,
        email: action.email
      }
      const newState = [...state, newUser]
      return newState
    default:
      return state
  }
}

export default users
