import store from 'store'

let Profile = {}
Profile.types = {}

Profile.types.CREATE = 'CREATE_PROFILE';
Profile.types.LOGIN = 'LOGIN';
Profile.types.LOGOUT = 'LOGOUT';
Profile.types.PATCH = 'PATCH_PROFILE';
Profile.types.GET = 'GET_PROFILE';

Profile.types.UPDATE = 'UPDATE_PROFILE';

Profile.create = (values, { setSubmitting }) => {

  store.dispatch({type: Profile.types.CREATE, payload: {data: {user: values}}})
  // re enable the login button after 3 seconds
  setTimeout(() => {
    setSubmitting(false);
  }, 2000);
}

Profile.login = (values, { setSubmitting, errors }) => {
  delete values['password_confirmation']
  store.dispatch({type: Profile.types.LOGIN, payload: {data: {user: values}}})
  // re enable the login button after 3 seconds
  setTimeout(() => {
    setSubmitting(false);
  }, 2000);
}

export default Profile;
