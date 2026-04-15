export default function Controls({
  showAvailableOnly,
  onSetFilter,
  isSortedAsc,
  onToggleSort
}) {
  return (
    <div className="controls-group">
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button 
          onClick={() => onSetFilter(false)} 
          className={`btn ${!showAvailableOnly ? "btn-active" : ""}`}
        >
          Show All Meals
        </button>
        <button 
          onClick={() => onSetFilter(true)} 
          className={`btn ${showAvailableOnly ? "btn-active" : ""}`}
        >
          Show Available Only
        </button>
      </div>
      
      <button onClick={onToggleSort} className="btn" style={{ marginLeft: "auto" }}>
        Sort: {isSortedAsc ? "Low - High" : "High - Low"}
      </button>
    </div>
  );
}
