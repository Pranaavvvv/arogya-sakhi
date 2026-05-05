"use client";
import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./page.css";

const quickAdds = [
  { label: "+100ml", amount: 100 },
  { label: "+200ml", amount: 200 },
  { label: "+300ml", amount: 300 },
  { label: "+500ml", amount: 500 },
];

const history = [
  { time: "8:00 AM", amount: "200ml", icon: "☕" },
  { time: "10:30 AM", amount: "300ml", icon: "💧" },
  { time: "1:00 PM", amount: "200ml", icon: "🥤" },
  { time: "3:30 PM", amount: "300ml", icon: "💧" },
  { time: "5:00 PM", amount: "200ml", icon: "🍵" },
];

function HydrationPageContent() {
  const [intake, setIntake] = useState(1200);
  const target = 2500;
  const pct = Math.min(Math.round((intake / target) * 100), 100);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (pct / 100) * circumference;

  const addWater = (amount) => {
    setIntake((prev) => Math.min(prev + amount, target));
  };

  return (
    <div className="hydration-page">
      <AppHeader showBack />

      <div className="hydration-content">
        <div className="hydration-intro">
          <h1 className="hydration-title">Daily Hydration</h1>
          <p className="hydration-subtitle">Stay hydrated for you and your baby</p>
        </div>

        {/* Main ring */}
        <div className="hydration-ring-section">
          <div className="hydration-ring-container">
            <svg viewBox="0 0 180 180" className="hydration-ring-svg">
              <defs>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4DD0E1" />
                  <stop offset="100%" stopColor="#B2EBF2" />
                </linearGradient>
              </defs>
              <circle cx="90" cy="90" r="70" fill="none" stroke="#E0F7FA" strokeWidth="14" />
              <circle cx="90" cy="90" r="70" fill="none" stroke="url(#waterGrad)" strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={offset}
                transform="rotate(-90 90 90)"
                className="hydration-ring-fill"
                style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
            </svg>
            <div className="hydration-ring-center">
              <span className="material-symbols-rounded icon-filled hydration-drop-icon">water_drop</span>
              <span className="hydration-ring-value">{(intake / 1000).toFixed(1)}L</span>
              <span className="hydration-ring-target">/ {(target / 1000).toFixed(1)}L</span>
            </div>
          </div>
          <p className="hydration-pct">Target Met: {pct}%</p>
        </div>

        {/* Quick add */}
        <div className="hydration-quick-adds">
          {quickAdds.map((btn) => (
            <button
              key={btn.amount}
              className="hydration-add-btn"
              onClick={() => addWater(btn.amount)}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>add</span>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Reminder card */}
        <div className="hydration-reminder">
          <div className="hydration-reminder-icon">
            <span className="material-symbols-rounded icon-filled" style={{ color: "#4DD0E1" }}>notifications_active</span>
          </div>
          <div>
            <h3 className="hydration-reminder-title">Gentle Reminder</h3>
            <p className="hydration-reminder-text">Drink water every 2 hours to stay hydrated.</p>
          </div>
        </div>

        {/* History */}
        <section className="hydration-history">
          <h2 className="hydration-section-title">Today&apos;s Intake</h2>
          <div className="hydration-timeline stagger-children">
            {history.map((item, i) => (
              <div key={i} className="hydration-timeline-item">
                <div className="hydration-timeline-dot" />
                <div className="hydration-timeline-content">
                  <span className="hydration-timeline-icon">{item.icon}</span>
                  <div>
                    <span className="hydration-timeline-amount">{item.amount}</span>
                    <span className="hydration-timeline-time">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Wave decoration */}
      <div className="hydration-wave-wrapper">
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="hydration-wave-svg">
          <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" fill="#E0F7FA" opacity="0.5" />
          <path d="M0,80 C200,20 400,100 600,40 C800,100 1000,20 1200,80 L1200,120 L0,120 Z" fill="#B2EBF2" opacity="0.3" />
        </svg>
      </div>

      <div style={{ height: 80 }} />
      <BottomNav />
    </div>
  );
}

export default function HydrationPage() {
  return (
    <ProtectedRoute>
      <HydrationPageContent />
    </ProtectedRoute>
  );
}
