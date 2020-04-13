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

// return object
const optionFromCollection = (collection, keyValue, keysLabel, itemId) => {
  let option = {}
  collection.map((item) => {


    if(item[keyValue] == itemId){
      let label = ""
      keysLabel.map((key) => {
        label = `${label}${item[key]} `
      })
      return {value: item[keyValue], label: label}
    }
  })
  return option
}

//return array
const optionsFromCollection = (collection, keyValue, keysLabel, keyIn = null ) => {
  let options = []
  collection.map((item) => {
    let label = ""
    keysLabel.map((key) => {
      label = `${label}${item[key]} `
    })
    if(keyIn && keyIn.length > 0 && keyIn.includes(item[keyValue])){
      options.push({value: item[keyValue], label: label})
    } else if (keyIn == null) {
      options.push({value: item[keyValue], label: label})
    }
  })
  return options
}

// broken
const optionsFromArray = (array) => {
  let options = []
  array.map((item) => {
    options.push({value: item, label: item})
  })
  return options
}

export { toast, has_role, optionsFromCollection, optionsFromArray, optionFromCollection }
