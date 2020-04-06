import { BaseUrl, ApiGet, ApiPost, ApiDelete }  from './utils'

class Profile {
  static create = async (payload) => {
    console.log(payload)
    var { data } = payload
    console.log(data)
    return ApiPost( BaseUrl + "/users", data)
  };

  static login = async (payload) => {
    var { data } = payload
    return ApiPost( BaseUrl + "/users/sign_in", data, true)
  };

  static logout = async (payload) => {
    var { data } = payload
    return ApiDelete( BaseUrl + "/users/sign_out", data)
  };

  static profile = async (payload) => {
    return ApiGet( BaseUrl + "/profile")
  };
}

export default Profile;
