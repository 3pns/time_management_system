import { BaseUrl, ApiGet, ApiPost, ApiPatch, ApiDelete }  from './utils'

class TimeEntries {
  static all = async (payload) => {
    return ApiGet( BaseUrl + "/user/time_entries", payload)
  };

  static get = async (payload) => {
    var { id } = payload
    return ApiGet( BaseUrl + "/user/time_entries/" + id );
  };

  static create = async (payload) => {
    console.log(payload)
    var { data } = payload
    return ApiPost( BaseUrl + "/user/time_entries", data);
  };

  static patch = async (payload) => {
    var { id, data } = payload
    return ApiPatch( BaseUrl + "/user/time_entries/" + id, data);
  };

  static delete = async (payload) => {
    var { id } = payload
    return ApiDelete( BaseUrl + "/user/time_entries/" + id);
  };
}

export default TimeEntries;
