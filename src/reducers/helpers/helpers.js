export const alocador = (expenses, id) => {
  let returnedId = 0;

  for (let i = 0; i < id; i++) {
    if (i === expenses[i].id) {
      returnedId++;
    }
  }

  return returnedId;
};

export const formatArray = (array) => {
  const newArray = array.sort((expense1, expense2) => {
    if (expense1.id > expense2.id) {
      return 1;
    }
    if (expense1.id < expense2.id) {
      return -1;
    }

    return 0;
  });

  return newArray;
};
