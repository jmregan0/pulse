import { SAMPLE_CONSTANT } from '../constants.jsx'

const initialState = {
  /*
  Initialize state to the data type you expect
  */
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case SAMPLE_CONSTANT:
      newState.list = action.payload
      break
    default:
      return state
  }
  return newState
}
