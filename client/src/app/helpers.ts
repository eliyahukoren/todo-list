export const shouldApplyFilter = (param: ToDoFilter) => {
  if (param.showCompleted === param.showUncompleted) {
    return false;
  }

  return true;
};
