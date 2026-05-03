"use client";
import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import "./page.css";

const hospitals = [
  { name: "City Health Center", distance: "0.8km", phone: "+91 98765 43210", type: "Multispeciality" },
  { name: "Maternity Care Hospital", distance: "1.5km", phone: "+91 98765 43211", type: "Maternity" },
  { name: "General Hospital", distance: "2.2km", phone: "+91 98765 43212", type: "General" },
];

export default function EmergencyPage() {
  const [shareLocation, setShareLocation] = useState(true);

  return (
    <div className="emergency-page">
      <AppHeader showBack />

      <div className="emergency-content">
        {/* Share location toggle */}
        <div className="emergency-location-toggle">
          <div className="emergency-location-info">
            <span className="material-symbols-rounded icon-filled" style={{ color: "#E8728A" }}>location_on</span>
            <span>Share My Location</span>
          </div>
          <button
            className={`emergency-toggle ${shareLocation ? "active" : ""}`}
            onClick={() => setShareLocation(!shareLocation)}
            aria-label="Toggle location sharing"
          >
            <span className="emergency-toggle-thumb" />
          </button>
        </div>

        {/* SOS Button */}
        <div className="emergency-sos-section">
          <div className="emergency-sos-wrapper">
            <div className="emergency-sos-ring emergency-sos-ring-1" />
            <div className="emergency-sos-ring emergency-sos-ring-2" />
            <div className="emergency-sos-ring emergency-sos-ring-3" />
            <button className="emergency-sos-btn" id="sos-btn" aria-label="Emergency SOS">
              <span className="material-symbols-rounded icon-filled emergency-sos-icon">emergency</span>
              <span className="emergency-sos-text">SOS</span>
            </button>
          </div>
          <p className="emergency-sos-desc">
            Press to alert emergency services and your trusted contacts immediately.
          </p>
        </div>

        {/* Nearby hospitals */}
        <section className="emergency-hospitals">
          <h2 className="emergency-section-title">Nearby Hospitals</h2>
          <div className="emergency-hospital-list stagger-children">
            {hospitals.map((hospital, i) => (
              <div key={i} className="emergency-hospital-card">
                <div className="emergency-hospital-icon-wrap">
                  <span className="material-symbols-rounded icon-filled" style={{ color: "#E8728A" }}>local_hospital</span>
                </div>
                <div className="emergency-hospital-info">
                  <h3 className="emergency-hospital-name">{hospital.name}</h3>
                  <div className="emergency-hospital-meta">
                    <span className="emergency-hospital-type">{hospital.type}</span>
                    <span className="emergency-hospital-dist">
                      <span className="material-symbols-rounded" style={{ fontSize: 16 }}>directions_car</span>
                      {hospital.distance} away
                    </span>
                  </div>
                </div>
                <a href={`tel:${hospital.phone}`} className="emergency-call-btn" aria-label={`Call ${hospital.name}`}>
                  <span className="material-symbols-rounded icon-filled">call</span>
                </a>
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
