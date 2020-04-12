import { toast as rToast } from 'react-toastify';
import store from 'store'
const toast = (toastType, message) => {
  if(toastType == "success"){
    rToast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });
  } else if (toastType == "error"){
    rToast.error(message, {
      position: "bottom-right",
      autoClose: 8000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });  
  } else if (toastType == "warning"){
    rToast.warn(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });  
  } else if (toastType == "info"){
    rToast.info(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });  
  } else if (toastType == "custom"){
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });
  }
}

const has_role = (role) => {
  const state = store.getState();

  if(state.profile == null || state.profile.roles == null){
    return false
  }
  if (state.profile.roles.includes(role)){
    return true
  } else {
    return false
  }
}

export { toast, has_role }
