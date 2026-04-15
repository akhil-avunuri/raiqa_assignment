import { Trash2 } from "lucide-react";

export default function SelectedMeals({ 
  selectedMeals, 
  onUpdateQuantity, 
  onRemoveMeal, 
  onReset 
}) {
  const hasMeals = selectedMeals.length > 0;
  
  const totalPrice = selectedMeals.reduce((sum, meal) => sum + (meal.price * meal.quantity), 0);
  
  let mostExpensive = null;
  let leastExpensive = null;

  if (hasMeals) {
    
    mostExpensive = [...selectedMeals].sort((a, b) => b.price - a.price)[0];
    leastExpensive = [...selectedMeals].sort((a, b) => a.price - b.price)[0];
  }

  return (
    <div className="selected-container">
      <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ margin: 0 }}>Selected Meals</span>
        {hasMeals && (
          <button onClick={onReset} className="btn" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
            Reset
          </button>
        )}
      </div>

      {!hasMeals ? (
        <p className="empty-state">No meals selected</p>
      ) : (
        <>
          <ul className="selected-list">
            {selectedMeals.map(meal => (
              <li key={meal.id} className="selected-item">
                <div className="selected-item-info">
                  <h3 className="selected-item-name">{meal.name}</h3>
                  <p className="selected-item-price">Rs {meal.price.toFixed(2)}</p>
                </div>
                
                <div className="selected-item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="btn btn-icon" 
                      onClick={() => onUpdateQuantity(meal.id, -1)}
                      disabled={meal.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{meal.quantity}</span>
                    <button 
                      className="btn btn-icon" 
                      onClick={() => onUpdateQuantity(meal.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="btn btn-icon btn-remove" 
                    onClick={() => onRemoveMeal(meal.id)}
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="selected-total">
            <span>Total Price:</span>
            <span>Rs {totalPrice.toFixed(2)}</span>
          </div>

          {selectedMeals.length > 1 && (
            <div className="selected-stats">
              <p>
                <strong>Most Expensive:</strong> {mostExpensive.name} (Rs {mostExpensive.price.toFixed(2)})
              </p>
              <p>
                <strong>Least Expensive:</strong> {leastExpensive.name} (Rs {leastExpensive.price.toFixed(2)})
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
