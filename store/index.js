import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducer/board'

const rootReducer = combineReducers({
  board: boardReducer,
})

const store = createStore(rootReducer, applyMiddleware(/*middlewaredisini. */ thunk))

export default store