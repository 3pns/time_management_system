
const updateCollection = (id, item, collection) => {
  //remove duplicate
  var itemFound = false
  for (var i = 0; i < collection.length; i++) {
    if (collection[i].id === id){
      collection.splice(i, 1)
      itemFound = true
    }
    if (itemFound && item != null){
      console.log("SUCKA")
      collection.push(item);
    }
    if(itemFound){
      break
    }
  }
  return collection
}

export { updateCollection }
