
const updateCollection = (id, item, collection) => {
  //remove duplicate
  for (var i = 0; i < collection.length; i++) {
    if (collection[i].id === id){
      //delete collections[i];
      collection.splice(i, 1)
      break
    }
    if (item != null){
      collection.push(item);
    }
  }
  return collection
}

export { updateCollection }
