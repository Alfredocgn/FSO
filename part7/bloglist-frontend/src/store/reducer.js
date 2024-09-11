import {combineReducers} from 'redux'
import notificationReducer from '../reducers/notificationReducer'

const rootReducer = combineReducers({
  notification:notificationReducer
})

export default rootReducer