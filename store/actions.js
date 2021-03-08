const baseUrl = 'https://sugoku.herokuapp.com/'

export function fetchBoard(difficulty) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}board?difficulty=${difficulty}`)
        if (!response.ok) {
          console.log(response, 'ini response not oke dari fetch')
          throw Error(response.statusText)
        } else {
          const data = await response.json()
          console.log(data, 'ini data dari fetch')
          dispatch(setInitBoard(data.board))
          dispatch(setCurrentBoard(data.board))
        }
    } catch(err) {
      console.log(err, 'ini fetch error')
    } 
  }
}
export function setInitBoard (payload) {
  return { type: 'INITBOARD/SET', payload}
}
export function setCurrentBoard (payload) {
  return { type: 'CURRENTBOARD/SET', payload}
}