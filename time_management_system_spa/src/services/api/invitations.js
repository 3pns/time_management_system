import { BaseUrl, ApiGet, ApiPost, ApiDelete, ApiPatch }  from './utils'

class Invitations {
  static all = async (payload) => {
    return ApiGet( BaseUrl + "/user/invitations", payload)
  };

  static get = async (payload) => {
    var { id } = payload
    return ApiGet( BaseUrl + "/user/invitations/" + id );
  };

  static create = async (payload) => {
    console.log(payload)
    var { data } = payload
    return ApiPost( BaseUrl + "/user/invitations", data);
  };

  static delete = async (payload) => {
    var { id } = payload
    return ApiDelete( BaseUrl + "/user/invitations/" + id);
  };
}

export default Invitations;
