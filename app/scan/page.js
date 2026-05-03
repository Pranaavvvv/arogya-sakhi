"use client";
import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import "./page.css";

const recentScans = [
  { date: "Oct 12, 2023", risk: "Low Risk", level: "low" },
  { date: "Sep 28, 2023", risk: "Moderate Risk", level: "moderate" },
  { date: "Sep 10, 2023", risk: "Low Risk", level: "low" },
];

export default function ScanPage() {
  const [scanned, setScanned] = useState(true);

  return (
    <div className="scan-page">
      <AppHeader showBack />

      <div className="scan-content">
        <div className="scan-intro">
          <h1 className="scan-title">Anemia Detection</h1>
          <p className="scan-subtitle">Regularly check your iron levels for a healthy pregnancy journey.</p>
        </div>

        {/* Camera preview */}
        <div className="scan-camera-area">
          <div className="scan-camera-frame">
            <div className="scan-camera-inner">
              <span className="material-symbols-rounded scan-fingerprint-icon">fingerprint</span>
              <p className="scan-instruction">Align your fingernails within the frame and press scan.</p>
            </div>
            {/* Corner markers */}
            <div className="scan-corner scan-corner-tl" />
            <div className="scan-corner scan-corner-tr" />
            <div className="scan-corner scan-corner-bl" />
            <div className="scan-corner scan-corner-br" />
          </div>

          <div className="scan-info-banner">
            <span className="material-symbols-rounded" style={{ color: "#E8728A", fontSize: 20 }}>info</span>
            <span>Align your fingernails within the frame and press scan.</span>
          </div>

          <button
            className="btn btn-primary btn-full"
            onClick={() => setScanned(true)}
            id="start-scan-btn"
          >
            <span className="material-symbols-rounded">center_focus_strong</span>
            Start Scan
          </button>
        </div>

        {/* Result card */}
        {scanned && (
          <div className="scan-result-card animate-fade-in-up">
            <div className="scan-result-header">
              <span className="material-symbols-rounded icon-filled" style={{ color: "#E8728A" }}>fact_check</span>
              <div>
                <h3 className="scan-result-title">Scan Complete</h3>
                <p className="scan-result-date">Today, 10:42 AM</p>
              </div>
            </div>

            {/* Semicircle gauge */}
            <div className="scan-gauge-wrapper">
              <svg viewBox="0 0 200 110" className="scan-gauge-svg">
                <defs>
                  <linearGradient id="scanGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7DCBA4" />
                    <stop offset="50%" stopColor="#FFF176" />
                    <stop offset="100%" stopColor="#FF6B6B" />
                  </linearGradient>
                </defs>
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#F2F2F2" strokeWidth="14" strokeLinecap="round" />
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#scanGaugeGrad)" strokeWidth="14" strokeLinecap="round"
                  strokeDasharray="251" strokeDashoffset="125" className="scan-gauge-fill" />
                {/* Needle */}
                <line x1="100" y1="100" x2="100" y2="35" stroke="#E8728A" strokeWidth="3" strokeLinecap="round"
                  className="scan-gauge-needle" />
                <circle cx="100" cy="100" r="6" fill="#E8728A" />
              </svg>
            </div>

            <div className="scan-result-badge">
              <span className="badge badge-warning">Moderate Anemia Risk Detected</span>
            </div>

            <p className="scan-result-advice">
              Your fingernail pallor suggests potential iron deficiency. Please consult your doctor for a detailed blood test.
            </p>

            <button className="btn btn-tonal btn-full" id="scan-consult-btn">
              <span className="material-symbols-rounded">medical_services</span>
              Consult Doctor
            </button>
          </div>
        )}

        {/* Recent scans */}
        <section className="scan-history">
          <h2 className="scan-history-title">Recent Scans</h2>
          <div className="scan-history-list stagger-children">
            {recentScans.map((scan, i) => (
              <div key={i} className={`scan-history-card card-accent-left risk-${scan.level}`}>
                <div className="scan-history-info">
                  <span className={`badge ${scan.level === "low" ? "badge-success" : scan.level === "moderate" ? "badge-warning" : "badge-danger"}`}>
                    {scan.risk}
                  </span>
                  <span className="scan-history-date">{scan.date}</span>
                </div>
                <span className="material-symbols-rounded scan-history-chevron">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={{ height: 80 }} />
      <BottomNav />
    </div>
  );
}
