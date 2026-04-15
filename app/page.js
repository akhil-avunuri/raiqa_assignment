"use client";

import { useState, useEffect } from "react";
import { meals as initialMeals } from "../data/meals";
import { sortMeals, filterAvailableMeals } from "../utils/helpers";
import Controls from "../components/Controls";
import MealList from "../components/MealList";
import SelectedMeals from "../components/SelectedMeals";

import "../styles/main.css";

export default function Home() {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("selectedMeals");
      if (stored) {
        setSelectedMeals(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load from local storage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
      } catch (error) {
        console.error("Failed to save to local storage", error);
      }
    }
  }, [selectedMeals, isMounted]);

  const handleSelectMeal = (meal) => {
    if (!meal.isAvailable) return;

    setSelectedMeals(prev => {
      const existing = prev.find(m => m.id === meal.id);
      if (existing) return prev; 
      
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (mealId, delta) => {
    setSelectedMeals(prev => prev.map(m => {
      if (m.id === mealId) {
        return { ...m, quantity: Math.max(1, m.quantity + delta) };
      }
      return m;
    }));
  };

  const handleRemoveMeal = (mealId) => {
    setSelectedMeals(prev => prev.filter(m => m.id !== mealId));
  };

  const handleResetSelection = () => {
    setSelectedMeals([]);
  };

  const handleSetFilter = (showAvailable) => {
    setShowAvailableOnly(showAvailable);
  };

  const handleToggleSort = () => {
    setIsSortedAsc(prev => !prev);
  };

  
  const filteredMeals = filterAvailableMeals(initialMeals, showAvailableOnly);
  const displayedMeals = sortMeals(filteredMeals, isSortedAsc);

  if (!isMounted) {
     return null; 
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="font-bold">Menu Selection</h1>
        <p>Choose your favourite meal.</p>
      </header>

      <Controls 
        showAvailableOnly={showAvailableOnly}
        onSetFilter={handleSetFilter}
        isSortedAsc={isSortedAsc}
        onToggleSort={handleToggleSort}
      />

      <div className="layout-grid">
        <div className="card">
          <MealList 
            meals={displayedMeals}
            onSelectMeal={handleSelectMeal}
            showAvailableOnly={showAvailableOnly}
            selectedMeals={selectedMeals}
          />
        </div>
        <div className="card">
          <SelectedMeals 
            selectedMeals={selectedMeals}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveMeal={handleRemoveMeal}
            onReset={handleResetSelection}
          />
        </div>
      </div>
    </div>
  );
}
