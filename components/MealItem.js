export default function MealItem({ meal, onSelect, showAvailableOnly, isSelected }) {
  const isDisabled = !meal.isAvailable || isSelected;

  return (
    <div className="meal-item">
      <div className="meal-info">
        <h3>{meal.name}</h3>
        <p>Rs {meal.price.toFixed(2)}</p>
        
        {!showAvailableOnly && (
          <p className={`status-label ${meal.isAvailable ? "status-available" : "status-unavailable"}`}
          style={{ color: meal.isAvailable ? "black" : "grey" }}>
            {meal.isAvailable ? "Available" : "Unavailable"}
          </p>
        )}
      </div>
      <button 
        onClick={() => onSelect(meal)}
        disabled={isDisabled}
        className="btn btn-primary"
      >
        {isSelected ? "Added" : "Add"}
      </button>
    </div>
  );
}
