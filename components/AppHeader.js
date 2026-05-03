"use client";
import Link from "next/link";
import "./AppHeader.css";

export default function AppHeader({ title, showBack = false, backHref = "/dashboard" }) {
  return (
    <header className="app-header">
      <div className="app-header-left">
        {showBack && (
          <Link href={backHref} className="header-back-btn" aria-label="Go back">
            <span className="material-symbols-rounded">arrow_back</span>
          </Link>
        )}
        <div className="header-brand">
          <span className="header-lotus">🪷</span>
          <span className="header-title">{title || "Aarogya Sakhi"}</span>
        </div>
      </div>
      <div className="app-header-right">
        <button className="header-icon-btn" aria-label="Notifications">
          <span className="material-symbols-rounded">notifications</span>
        </button>
        <div className="header-avatar">
          <span className="material-symbols-rounded icon-filled">person</span>
        </div>
      </div>
    </header>
  );
}
