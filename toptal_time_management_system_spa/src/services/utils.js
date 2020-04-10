import { toast as rToast } from 'react-toastify';

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

export default toast
