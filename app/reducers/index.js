import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  sample: require('./sample').default,
  // sample2: require('./sample2').default
})

export default rootReducer
