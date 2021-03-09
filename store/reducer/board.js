const initialState = {
  initBoard: [],
  currentBoard: [],
  isValid: 'unsolved'
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'INITBOARD/SET':
      return { ...state, initBoard: payload }
    case 'CURRENTBOARD/SET':
      return { ...state, currentBoard: payload}
    case 'ISVALID/SET':
      return { ...state, isValid: payload}
    default:
      return state
  }
}

export default reducer