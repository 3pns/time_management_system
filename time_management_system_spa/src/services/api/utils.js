import store from 'store'
import actions from 'actions'
import { toast } from 'services/utils'

function objectToStringParams(key, obj){

}

const apiRequest = async (verb, url, jsonData = {}, updateJwt=false) => {
  try {
    var request = {
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access-token')
      },
      credentials: "include"
    }

    // if GET convert JSON body to string params
    let stringParams = ""
    if (verb !== 'GET'){
      request.body = JSON.stringify(jsonData)
    } else if (verb == 'GET' && jsonData != null){
      stringParams = Object.keys(jsonData).map((key) => {
        if (key == 'q'){
          return Object.keys(jsonData['q']).map((qKey) => {
            return 'q['+qKey+']=' + jsonData['q'][qKey]
          }).join('&');
        } else {
          return key + '=' + jsonData[key]
        }
        
      }).join('&');
    }
    if (stringParams != ""){
      stringParams = "?" + stringParams
    }
    const response = await fetch(url + stringParams, request)

    let data = {}
    
    try {
      // throw error if No Content or incorrect json
      data = await response.json();
    } catch (e) {
    }
    // Unauthorized
    if (`${response.status}` === "401" ) {
      logoutUser()
      return data;
    }

    if(updateJwt){
      for(let entry of response.headers.entries()) {
        console.log(entry);
        if(entry[0] == 'authorization'){
          localStorage.setItem('access-token', entry[1])
        }
      }
    }

    if (response.status >= 400 && response.status < 600) {
      var description = JSON.stringify(data)
      if (data.errors != null ) {
        return data; // form errors or other standard api errors
      }
      if (data.exception != null ) {
        description = JSON.stringify(data.exception)
      }
      description = description.replace(/[{}\[\]\"\']/g, '');
      if (response.status == 422) {
        toast("warning", description)
        return null
      }
      toast('error', `Error ${response.status} :  ${response.statusText} \n ${description}`)
      return null
    } else {
      return data;
    }
  } catch (e) {
    if(e.toString().includes("Failed to fetch")){
      toast('error', "Can't connect to the backend server, please check your internet connection. If this problem persist please try again later.")
    } else {
      toast('error', `Fatal error while connecting to the backend server : ${e.toString()}. If the problem persist please contact the developer.`)
    }
  }
}

export const ApiGet = async (url, jsonData) => {
  return apiRequest('GET', url, jsonData)
};

export const ApiPost = async (url, jsonData, updateJwt=false) => {
  return apiRequest('POST', url, jsonData, updateJwt)
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

function logoutUser(){
  console.log('logout user')
  store.dispatch({type: actions.profile.types.UPDATE, payload: { profile: null} });
  localStorage.setItem('access-token', '')
}

export const BaseUrl = process.env.REACT_APP_API_BASE_URL;
