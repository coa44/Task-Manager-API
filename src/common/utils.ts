export const isDateValid = (dueDate: Date): boolean => {
  const todaysDate = new Date().setHours(0, 0, 0, 0);
  const givenDate =
    dueDate !== null ? new Date(dueDate).setHours(0, 0, 0, 0) : null;

  if (givenDate && givenDate < todaysDate) {
    return false;
  }

  return true;
};
