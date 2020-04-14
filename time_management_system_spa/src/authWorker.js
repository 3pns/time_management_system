import store from 'store'
import actions from 'actions'

export function start (e) {
  console.log("renewing token")
  let token = localStorage.getItem('access-token')
  if(token != '' && token != null){
    store.dispatch({type: actions.profile.types.RENEW, payload: { } });
  }
  let delay = process.env.REACT_APP_TOKEN_RENEWAL_DELAY ? process.env.REACT_APP_TOKEN_RENEWAL_DELAY : 18000
  setTimeout(start, delay);
};
