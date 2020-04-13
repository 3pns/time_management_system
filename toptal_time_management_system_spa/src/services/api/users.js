import { BaseUrl, ApiGet, ApiPost, ApiPatch, ApiDelete }  from './utils'

class Users {
  static all = async (payload) => {
    return ApiGet( BaseUrl + "/user/users", payload)
  };

  static get = async (payload) => {
    var { id } = payload
    return ApiGet( BaseUrl + "/user/users/" + id );
  };

  static create = async (payload) => {
    console.log(payload)
    var { data } = payload
    return ApiPost( BaseUrl + "/user/users", data);
  };

  static patch = async (payload) => {
    var { id, data } = payload
    return ApiPatch( BaseUrl + "/user/users/" + id, data);
  };

  static delete = async (payload) => {
    var { id } = payload
    return ApiDelete( BaseUrl + "/user/users/" + id);
  };

  static getUserSettings = async (payload) => {
    var { id } = payload
    return ApiGet( BaseUrl + "/user/users/" + id + '/user_settings' );
  };

  static patchUserSettings = async (payload) => {
    var { id, data } = payload
    return ApiPatch( BaseUrl + "/user/users/" + id + '/user_settings', data);
  };

  static patchNewPassword  = async (payload) => {
    var { id, data } = payload
    return ApiPatch( BaseUrl + "/user/users/" + id + '/update_password', data);
  };
}

export default Users;
