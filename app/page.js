"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import "./page.css";

const slides = [
  {
    icon: "🪷",
    title: "Welcome to Aarogya Sakhi",
    subtitle: "Your Gentle Companion for a Healthy Pregnancy",
  },
  {
    icon: "💅",
    title: "AI Anemia Detection",
    subtitle: "Scan your fingernails to detect early signs of iron deficiency — quick, painless, anytime.",
  },
  {
    icon: "🥗",
    title: "Nutrition & Hydration",
    subtitle: "Track your daily iron intake, log meals, and stay hydrated for you and your baby.",
  },
  {
    icon: "🏥",
    title: "Emergency SOS",
    subtitle: "Instantly alert emergency contacts and find nearby hospitals when you need help most.",
  },
];

export default function SplashPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isReady, isAuthenticated, router]);

  const authHref = isReady && isAuthenticated ? "/dashboard" : "/login";

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="splash-page">
      {/* Decorative elements */}
      <div className="splash-decor splash-decor-1" />
      <div className="splash-decor splash-decor-2" />
      <div className="splash-decor splash-decor-3" />

      {/* Skip button */}
      {currentSlide < slides.length - 1 && (
        <Link href={authHref} className="splash-skip">Skip</Link>
      )}

      {/* Slide content */}
      <div className="splash-content animate-fade-in" key={currentSlide}>
        <div className="splash-illustration">
          <div className="splash-icon-circle">
            <span className="splash-emoji">{slides[currentSlide].icon}</span>
          </div>
          {/* Floating petals */}
          <div className="splash-petal splash-petal-1" />
          <div className="splash-petal splash-petal-2" />
          <div className="splash-petal splash-petal-3" />
        </div>

        <div className="splash-card">
          <h1 className="splash-title">{slides[currentSlide].title}</h1>
          <p className="splash-subtitle">{slides[currentSlide].subtitle}</p>

          {/* Dot indicators */}
          <div className="splash-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`splash-dot ${i === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          {currentSlide < slides.length - 1 ? (
            <button className="btn btn-primary btn-full" onClick={nextSlide}>
              Next
              <span className="material-symbols-rounded">arrow_forward</span>
            </button>
          ) : (
            <Link href={authHref} className="btn btn-primary btn-full">
              Get Started
              <span className="material-symbols-rounded">arrow_forward</span>
            </Link>
          )}

          <p className="splash-signin-link">
            Already have an account?{" "}
            <Link href={authHref} className="splash-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
