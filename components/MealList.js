import MealItem from "./MealItem";

export default function MealList({ meals, onSelectMeal, showAvailableOnly, selectedMeals }) {
  return (
    <div className="meal-list-container">
      <h2 className="card-title">Menu</h2>
      {meals.length === 0 ? (
        <p className="empty-state">No meals found.</p>
      ) : (
        <div className="meal-list">
          {meals.map(meal => {
            const isSelected = selectedMeals?.some(m => m.id === meal.id);
            return (
              <MealItem 
                key={meal.id} 
                meal={meal} 
                onSelect={onSelectMeal} 
                showAvailableOnly={showAvailableOnly}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
