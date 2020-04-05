import { BaseUrl, ApiGet, ApiPost, ApiPatch, ApiDelete }  from './utils'

class TimeEntry {
  static all = async (payload) => {
    return ApiGet( BaseUrl + "/time_entries")
  };

  static get = async (payload) => {
    var { id } = payload
    return ApiGet( BaseUrl + "/time_entries/" + id );
  };

  static create = async (payload) => {
    console.log(payload)
    var { data } = payload
    return ApiPost( BaseUrl + "/time_entries", data);
  };

  static patch = async (payload) => {
    var { id, data } = payload
    return ApiPatch( BaseUrl + "/time_entries/" + id, data);
  };

  static delete = async (payload) => {
    var { id } = payload
    return ApiDelete( BaseUrl + "/time_entries/" + id);
  };
}

export default TimeEntry;
