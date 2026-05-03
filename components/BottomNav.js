"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./BottomNav.css";

const tabs = [
  { href: "/dashboard", icon: "home", label: "Home" },
  { href: "/scan", icon: "center_focus_strong", label: "Scan" },
  { href: "/nutrition", icon: "restaurant_menu", label: "Nutrition" },
  { href: "/chat", icon: "chat_bubble", label: "Chat" },
  { href: "/dashboard", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || 
          (tab.href !== "/dashboard" && pathname.startsWith(tab.href));
        // Special handling: "Home" tab is active only on /dashboard
        const isHomeActive = tab.label === "Home" && pathname === "/dashboard";
        const isProfileActive = tab.label === "Profile" && pathname === "/profile";
        const active = tab.label === "Home" ? isHomeActive : 
                       tab.label === "Profile" ? isProfileActive : isActive;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`bottom-nav-tab ${active ? "active" : ""}`}
            id={`nav-${tab.label.toLowerCase()}`}
          >
            <span className={`material-symbols-rounded ${active ? "icon-filled" : ""}`}>
              {tab.icon}
            </span>
            <span className="bottom-nav-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
