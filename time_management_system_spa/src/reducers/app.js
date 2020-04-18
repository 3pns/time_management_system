import actions from 'actions'
import { toast } from 'services/utils'
import moment from 'moment'

export const app = (state = {lastNetworkError: false, lastNetworkErrorAt: moment().add(moment.duration(-1, "minutes"))}, action) => {
  switch (action.type) {
    case actions.app.types.PROCESS_CRITICAL_ERROR:
      if(action.payload.message != null && (moment() - state.lastNetworkErrorAt > 5000 )){
        state.lastNetworkError = action.payload.message
        state.lastNetworkErrorAt = moment()
        if(action.payload.message.includes("Failed to fetch")){
          toast('error', "Can't connect to the backend server, please check your internet connection. If this problem persist please try again later.")
        } else {
          toast('error', `Fatal error while connecting to the backend server : ${action.payload.message}. If the problem persist please contact the developer.`)
        }
        return { ...state }
      } else {
        return state
      }
      return state
    default:
      return state
  }
}

export default app
