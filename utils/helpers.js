export const sortMeals = (mealsArray, isSortedAsc) => {
  return [...mealsArray].sort((a, b) => {
    if (isSortedAsc) {
      return a.price - b.price;
    }
    return b.price - a.price;
  });
};

export const filterAvailableMeals = (mealsArray, showAvailableOnly) => {
  if (showAvailableOnly) {
    return mealsArray.filter(meal => meal.isAvailable);
  }
  return mealsArray;
};
