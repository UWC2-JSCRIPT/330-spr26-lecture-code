function deleteById(items, id) {
  // Given items is an array of objects with a
  // property “id”, delete the object with the id
  // provided and return the updated array of items

  // return items.filter((item) => item.id !==id);
  const index = items.findIndex((item) => item.id === id);
  items.splice(index, 1)
  return items

}

const someItems = [
  {id: '1', name: 'Zac'},
  {id: '2', name: 'James'}

]

function updateById(items, id, newData) {
  // Given items is an array of objects with a
  // property “id”, update the object with the id
  // and data provided, and return the updated
  // array of items

  return items.map((item) => {
    if (item.id !== id) {
      return item
    }

    return {
      id,
      ...newData
    }
  })

}

// console.log(updateById(someItems, '1', {name: 'Champ'}))
console.log(deleteById(someItems, '2'))

