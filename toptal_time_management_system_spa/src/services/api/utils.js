import store from 'store'
import actions from 'actions'

const apiRequest = async (verb, url, jsonData = {}) => {
  try {
    var request = {
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include"
    }

    if (verb !== 'GET'){
      request.body = JSON.stringify(jsonData)
    }
    const response = await fetch(url, request)

    let data = {}
    // No Content
    if (`${response.status}` !== "204" ) {
      data = await response.json();
    }
    // Unauthorized
    if (`${response.status}` === "401" ) {
      store.dispatch({type: actions.profile.UPDATE, payload: { profile: null} });
    }

    // if (response.status >= 200 && response.status < 299 || response.status >= 422) {
    //   return data;
    // }

    if (response.status >= 400 && response.status < 600) {
      //store.dispatch({type: 'SHOW_BOOTSTRAP_REDUX_ALERT', payload: {message: `Error ${data.status} :  ${data.error} \n ${data.exception}`, color: "danger"}});
      var description = JSON.stringify(data)
      if (data.errors != null ) {
        return data; // form errors or other standard api errors
      }
      if (data.exception != null ) {
        description = JSON.stringify(data.exception)
      }
      store.dispatch({type: 'SHOW_BOOTSTRAP_REDUX_ALERT', payload: {message: `Error ${response.status} :  ${response.statusText} \n ${description}`, color: "danger"}});
    } else {
      console.log("*******")
      console.log(data)
      return data;
    }
  } catch (e) {
    console.log(e);
    store.dispatch({type: 'SHOW_BOOTSTRAP_REDUX_ALERT', payload: {message: "api error: " + e, color: "danger"}});
  }
}

export const ApiGet = async (url) => {
  return apiRequest('GET', url, null)
};

export const ApiPost = async (url, jsonData) => {
  return apiRequest('POST', url, jsonData)
};

export const ApiPatch = async (url, jsonData) => {
  return apiRequest('PATCH', url, jsonData)
};

export const ApiPut = async (url, jsonData) => {
  return apiRequest('PUT', url, jsonData)
};

export const ApiDelete = async (url, jsonData) => {
  return apiRequest('DELETE', url, jsonData)
};

export const BaseUrl = process.env.REACT_APP_API_BASE_URL;
