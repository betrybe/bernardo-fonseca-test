export const alocador = (expenses, id) => {
  let returnedId = 0;

  for (let i = 0; i < id; i += 1) {
    if (i === expenses[i].id) {
      returnedId += 1;
    }
  }

  return returnedId;
};

export const formatArray = (array) => {
  const newArray = array.sort((expense1, expense2) => {
    if (expense1.id > expense2.id) {
      return expense1.id - expense2.id;
    }
    if (expense1.id < expense2.id) {
      return expense1.id - expense2.id;
    }

    return 0;
  });

  return newArray;
};
