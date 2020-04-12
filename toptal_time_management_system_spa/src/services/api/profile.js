import { BaseUrl, ApiGet, ApiPost, ApiDelete, ApiPatch }  from './utils'

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

  static get = async (payload) => {
    return ApiGet( BaseUrl + "/user/profile")
  };

  static patch = async (payload) => {
    var { id, data } = payload
    return ApiPatch( BaseUrl + "/user/profile", data);
  };

  static askNewPassword = async (payload) => {
    var { data } = payload
    return ApiPost( BaseUrl + "/users/password", data);
  };

  static patchNewPassword = async (payload) => {
    var { data } = payload
    return ApiPatch( BaseUrl + "/users/password", data);
  };
}

export default Profile;
