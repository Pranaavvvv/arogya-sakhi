"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "../../components/BottomNav";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import "./page.css";

const quickActions = [
  { icon: "center_focus_strong", label: "Scan", href: "/scan", color: "#FFD6E0" },
  { icon: "restaurant_menu", label: "Nutrition", href: "/nutrition", color: "#C8F5E1" },
  { icon: "water_drop", label: "Hydration", href: "/hydration", color: "#B2EBF2" },
  { icon: "emergency", label: "Emergency", href: "/emergency", color: "#FFAB91" },
];

function firstName(full) {
  if (!full || !String(full).trim()) return "Sakhi";
  return String(full).trim().split(/\s+/)[0];
}

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dash-header">
        <div className="dash-header-bg" />
        <div className="dash-header-content">
          <div className="dash-greeting">
            <div>
              <p className="dash-greeting-label">Good Evening</p>
              <h1 className="dash-greeting-name">Hello, {firstName(user?.name)}! 👋</h1>
              <p className="dash-greeting-sub">How are you feeling today?</p>
            </div>
            <div className="dash-header-actions">
              <button type="button" className="dash-notify-btn" aria-label="Notifications">
                <span className="material-symbols-rounded">notifications</span>
                <span className="dash-notify-dot" />
              </button>
              <button
                type="button"
                className="dash-logout-btn"
                onClick={handleLogout}
                aria-label="Log out"
                title="Log out"
              >
                <span className="material-symbols-rounded">logout</span>
              </button>
              <div className="dash-avatar" title={user?.email || ""}>
                {user?.picture ? (
                  <img src={user.picture} alt="" width={42} height={42} />
                ) : (
                  <span className="material-symbols-rounded icon-filled">person</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-metrics stagger-children">
        <div className="dash-metric-card dash-metric-risk">
          <div className="dash-metric-header">
            <span className="material-symbols-rounded" style={{ color: "#E8728A" }}>
              monitor_heart
            </span>
            <span className="dash-metric-label">Anemia Risk</span>
          </div>
          <div className="dash-gauge-wrapper">
            <svg viewBox="0 0 140 80" className="dash-gauge-svg">
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7DCBA4" />
                  <stop offset="50%" stopColor="#FFF176" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
              </defs>
              <path
                d="M 15 75 A 55 55 0 0 1 125 75"
                fill="none"
                stroke="#F2F2F2"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 15 75 A 55 55 0 0 1 125 75"
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="173"
                strokeDashoffset="86"
                className="dash-gauge-fill"
              />
              <circle cx="70" cy="30" r="4" fill="#E8728A" className="dash-gauge-needle" />
            </svg>
          </div>
          <span className="badge badge-warning" style={{ alignSelf: "center" }}>
            Moderate
          </span>
        </div>

        <div className="dash-metric-card dash-metric-iron">
          <div className="dash-metric-header">
            <span className="material-symbols-rounded" style={{ color: "#7DCBA4" }}>
              restaurant
            </span>
            <span className="dash-metric-label">Iron Intake</span>
          </div>
          <div className="dash-metric-value">60%</div>
          <div className="dash-metric-sub">Daily Goal</div>
          <div className="progress-bar" style={{ marginTop: 8 }}>
            <div
              className="progress-bar-fill"
              style={{ width: "60%", animation: "progressFill 1s ease-out" }}
            />
          </div>
        </div>

        <div className="dash-metric-card dash-metric-hydration">
          <div className="dash-metric-header">
            <span className="material-symbols-rounded" style={{ color: "#4DD0E1" }}>
              water_drop
            </span>
            <span className="dash-metric-label">Hydration</span>
          </div>
          <div className="dash-ring-wrapper">
            <svg viewBox="0 0 100 100" className="dash-ring-svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E0F7FA" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#4DD0E1"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="251"
                strokeDashoffset="131"
                transform="rotate(-90 50 50)"
                className="dash-ring-fill"
              />
            </svg>
            <div className="dash-ring-label">
              <span className="dash-ring-value">1.2L</span>
              <span className="dash-ring-total">/ 2.5L</span>
            </div>
          </div>
        </div>
      </div>

      <section className="dash-section">
        <h2 className="dash-section-title">Quick Actions</h2>
        <div className="dash-quick-actions stagger-children">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href} className="dash-action-card">
              <div className="dash-action-icon" style={{ background: action.color }}>
                <span className="material-symbols-rounded">{action.icon}</span>
              </div>
              <span className="dash-action-label">{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dash-section">
        <div className="dash-tip-card">
          <div className="dash-tip-header">
            <span className="material-symbols-rounded icon-filled" style={{ color: "#7DCBA4" }}>
              lightbulb
            </span>
            <h3 className="dash-tip-title">Today&apos;s Tip</h3>
          </div>
          <p className="dash-tip-text">
            Pairing iron-rich foods with Vitamin C (like a squeeze of lemon) helps your body absorb the iron much better!
          </p>
        </div>
      </section>

      <div style={{ height: 80 }} />

      <BottomNav />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
