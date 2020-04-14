
const updateCollection = (id, item, collection) => {
  // remove duplicate
  var itemFound = false
  for (var i = 0; i < collection.length; i++) {
    if (collection[i].id === id){
      collection.splice(i, 1)
      itemFound = true
    }

    if(itemFound){
      break
    }
  }
  // add new item
  if (item != null){
    collection.push(item);
  }
  return collection
}

export { updateCollection }
