const baseUrl = 'https://sugoku.herokuapp.com/'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function fetchBoard(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}board?difficulty=${payload}`)
        if (!response.ok) {
          console.log(response, 'ini response not oke dari fetch')
          throw Error(response.statusText)
        } else {
          const data = await response.json()
          console.log(data, 'ini data dari fetch')
          dispatch(setInitBoard(JSON.parse(JSON.stringify(data.board))))
          dispatch(setCurrentBoard(JSON.parse(JSON.stringify(data.board))))
        }
    } catch(err) {
      console.log(err, 'ini fetch error')
    } 
  }
}

export function setInitBoard (payload) {
  return { type: 'INITBOARD/SET', payload }
}

export function setCurrentBoard (payload) {
  return { type: 'CURRENTBOARD/SET', payload }
}

export function autoSolve(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}solve`, {
                        method: 'POST',
                        body: encodeParams({ board: payload }),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      })
        if (!response.ok) {
          console.log(response, 'ini response not oke dari autosolve')
          throw Error(response.statusText)
        } else {
          const data = await response.json()
          dispatch(setCurrentBoard(data.solution))
          console.log(data, 'ini returnan autosolve<<<')
        }
    } catch(err) {
      console.log(payload, 'ni payloadnya')
      console.log(err, 'ini autosolve error')
    } 
  }
}

export function validate(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}validate`, {
                        method: 'POST',
                        body: encodeParams({ board: payload }),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      })
        if (!response.ok) {
          console.log(response, 'ini response not oke dari validate')
          throw Error(response.statusText)
        } else {
          const data = await response.json()
          console.log(payload, 'ni payloadnya')
          if(data.status !== 'solved') {
            alert('wrong! try again!')
          } else {
            dispatch(setIsValid(data.status))
          }
          console.log(data, '<<< status dari validate')
        }
    } catch(err) {
      console.log(payload, 'ni payloadnya')

      console.log(err, 'ini errornya validate')
    } 
  }
}

export function setIsValid (payload) {
  return { type: 'ISVALID/SET', payload }
}
