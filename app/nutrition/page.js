"use client";
import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./page.css";

const initialMeals = [
  { name: "Spinach Omelette", emoji: "🥬", time: "8:30 AM", iron: "3.2mg", cal: "180 kcal" },
  { name: "Lentil Soup", emoji: "🥣", time: "1:00 PM", iron: "6.6mg", cal: "230 kcal" },
];

const recommended = [
  { name: "Beetroot", emoji: "🫒", iron: "0.8mg" },
  { name: "Spinach", emoji: "🥬", iron: "2.7mg" },
  { name: "Lentils", emoji: "🫘", iron: "3.3mg" },
  { name: "Eggs", emoji: "🥚", iron: "1.2mg" },
  { name: "Tofu", emoji: "🧈", iron: "5.4mg" },
  { name: "Chickpeas", emoji: "🫘", iron: "2.4mg" },
];

function NutritionPageContent() {
  const [showLogForm, setShowLogForm] = useState(false);
  const [meals, setMeals] = useState(initialMeals);
  const [foodName, setFoodName] = useState("");
  const [portion, setPortion] = useState("");
  const [iron, setIron] = useState("");

  const targetIron = 27; // mg
  const consumedIron = meals.reduce((acc, meal) => acc + (parseFloat(meal.iron) || 0), 0);
  const ironPct = Math.min(Math.round((consumedIron / targetIron) * 100), 100);
  const remainingIron = Math.max(targetIron - consumedIron, 0);

  const handleAddMeal = () => {
    if (!foodName.trim() || !iron.trim()) return;
    
    const newMeal = {
      name: foodName,
      emoji: "🍲", // Default emoji for logged meals
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      iron: `${iron}mg`,
      cal: portion || "1 serving",
    };
    
    setMeals([newMeal, ...meals]);
    setFoodName("");
    setPortion("");
    setIron("");
    setShowLogForm(false);
  };

  return (
    <div className="nutrition-page">
      <AppHeader showBack />

      <div className="nutrition-content">
        <div className="nutrition-intro">
          <h1 className="nutrition-title">Nutrition Tracking</h1>
          <p className="nutrition-subtitle">Track your daily intake for a healthy baby.</p>
        </div>

        {/* Iron Intake Card */}
        <div className="nutrition-iron-card">
          <div className="nutrition-iron-header">
            <div>
              <h3 className="nutrition-iron-title">Today&apos;s Iron Intake</h3>
              <p className="nutrition-iron-target">Target: {targetIron}mg/day</p>
            </div>
            <div className="nutrition-iron-value">
              <span className="nutrition-iron-pct">{ironPct}%</span>
            </div>
          </div>
          <div className="progress-bar" style={{ height: 12 }}>
            <div className="progress-bar-fill" style={{ width: `${ironPct}%`, animation: "progressFill 1s ease-out" }} />
          </div>
          <div className="nutrition-iron-detail">
            <span>{consumedIron.toFixed(1)}mg consumed</span>
            <span>{remainingIron.toFixed(1)}mg remaining</span>
          </div>
        </div>

        {/* Log Meal Card */}
        <div className="nutrition-log-card">
          <div className="nutrition-log-header" onClick={() => setShowLogForm(!showLogForm)}>
            <div className="nutrition-log-title-row">
              <span className="material-symbols-rounded" style={{ color: "#E8728A" }}>add_circle</span>
              <h3>Log a Meal</h3>
            </div>
            <span className="material-symbols-rounded">
              {showLogForm ? "expand_less" : "expand_more"}
            </span>
          </div>
          {showLogForm && (
            <div className="nutrition-log-form animate-fade-in">
              <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Food name" id="meal-name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                <label htmlFor="meal-name">Food Name</label>
              </div>
              <div className="nutrition-log-row">
                <div className="input-wrapper" style={{ flex: 1 }}>
                  <input type="text" className="input-field" placeholder="Portion size" id="meal-portion" value={portion} onChange={(e) => setPortion(e.target.value)} />
                  <label htmlFor="meal-portion">Portion</label>
                </div>
                <div className="input-wrapper" style={{ flex: 1 }}>
                  <input type="number" className="input-field" placeholder="Iron (mg)" id="meal-iron" value={iron} onChange={(e) => setIron(e.target.value)} />
                  <label htmlFor="meal-iron">Iron (mg)</label>
                </div>
              </div>
              <button className="btn btn-primary btn-full" id="add-meal-btn" onClick={handleAddMeal}>
                Add Meal
              </button>
            </div>
          )}
        </div>

        {/* Today's Log */}
        <section className="nutrition-today">
          <h2 className="nutrition-section-title">Today&apos;s Log</h2>
          <div className="nutrition-meals stagger-children">
            {meals.map((meal, i) => (
              <div key={i} className="nutrition-meal-card">
                <div className="nutrition-meal-icon">{meal.emoji}</div>
                <div className="nutrition-meal-info">
                  <h4 className="nutrition-meal-name">{meal.name}</h4>
                  <p className="nutrition-meal-meta">{meal.time} • {meal.cal}</p>
                </div>
                <div className="nutrition-meal-iron">
                  <span className="badge badge-success">{meal.iron}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended */}
        <section className="nutrition-recommended">
          <h2 className="nutrition-section-title">Recommended for You</h2>
          <div className="nutrition-chips-scroll">
            {recommended.map((food, i) => (
              <button key={i} className="nutrition-food-chip" onClick={() => {
                setFoodName(food.name);
                setIron(food.iron.replace("mg", ""));
                setPortion("1 serving");
                setShowLogForm(true);
              }}>
                <span className="nutrition-food-emoji">{food.emoji}</span>
                <span className="nutrition-food-name">{food.name}</span>
                <span className="nutrition-food-iron">{food.iron}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* FAB */}
      <button className="nutrition-fab" onClick={() => setShowLogForm(true)} aria-label="Log meal">
        <span className="material-symbols-rounded">add</span>
      </button>

      <div style={{ height: 80 }} />
      <BottomNav />
    </div>
  );
}

export default function NutritionPage() {
  return (
    <ProtectedRoute>
      <NutritionPageContent />
    </ProtectedRoute>
  );
}
