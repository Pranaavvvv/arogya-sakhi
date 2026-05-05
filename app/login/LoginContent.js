"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import "./page.css";

function GoogleSignInButton() {
  const router = useRouter();
  const { loginWithGoogleProfile } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      if (!res.ok) return;
      const profile = await res.json();
      loginWithGoogleProfile({
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
      });
      router.push("/dashboard");
    },
    onError: () => {},
  });

  return (
    <button
      type="button"
      className="login-social-btn"
      id="login-google"
      onClick={() => login()}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
        <path
          d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.3-1 2.3-2 3v2.5h3.3c1.9-1.7 3-4.3 3-7.3z"
          fill="#4285F4"
        />
        <path
          d="M10 20c2.7 0 5-0.9 6.7-2.4l-3.3-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1v2.6C2.7 17.8 6.1 20 10 20z"
          fill="#34A853"
        />
        <path
          d="M4.4 12c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.4H1C.4 6.6 0 8.3 0 10s.4 3.4 1 4.6l3.4-2.6z"
          fill="#FBBC05"
        />
        <path
          d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C14.9 1 12.7 0 10 0 6.1 0 2.7 2.2 1 5.4l3.4 2.6c.8-2.3 3-4.1 5.6-4.1z"
          fill="#EA4335"
        />
      </svg>
      Google
    </button>
  );
}

export default function LoginContent({ googleOAuthEnabled }) {
  const router = useRouter();
  const { isAuthenticated, isReady, loginWithEmailPassword, registerWithForm } =
    useAuth();

  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isReady) return;
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isReady, isAuthenticated, router]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = loginWithEmailPassword(loginEmail, loginPassword);
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = registerWithForm(regName, regEmail, regPassword);
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-decor login-bg-1" />
      <div className="login-bg-decor login-bg-2" />

      <div className="login-illustration">
        <div className="login-wreath">
          <div className="wreath-ring">
            <span className="wreath-leaf wreath-leaf-1">🌿</span>
            <span className="wreath-leaf wreath-leaf-2">🌸</span>
            <span className="wreath-leaf wreath-leaf-3">🍃</span>
            <span className="wreath-leaf wreath-leaf-4">🌺</span>
            <span className="wreath-leaf wreath-leaf-5">🌿</span>
            <span className="wreath-leaf wreath-leaf-6">🌸</span>
          </div>
          <span className="login-lotus">🪷</span>
        </div>
      </div>

      <div className="login-card animate-fade-in-up">
        <div className="login-tabs">
          <button
            type="button"
            className={`login-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`login-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("register");
              setError("");
            }}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="login-form" key="login" onSubmit={handleLoginSubmit}>
            <h1 className="login-heading">Welcome Back</h1>
            <p className="login-subheading">Sign in to continue your care journey</p>

            {error ? <p className="login-error">{error}</p> : null}

            <div className="input-wrapper">
              <input
                type="email"
                className="input-field"
                placeholder="Email address"
                id="login-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <label htmlFor="login-email">Email</label>
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <label htmlFor="login-password">Password</label>
            </div>

            <div className="login-forgot">
              <a href="#" className="login-forgot-link" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-full" id="login-submit">
              Login
            </button>

            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">or continue with</span>
              <span className="login-divider-line" />
            </div>

            <div className="login-social">
              {googleOAuthEnabled ? (
                <GoogleSignInButton />
              ) : (
                <button
                  type="button"
                  className="login-social-btn"
                  disabled
                  title="Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google sign-in"
                  id="login-google"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                    <path
                      d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.3-1 2.3-2 3v2.5h3.3c1.9-1.7 3-4.3 3-7.3z"
                      fill="#4285F4"
                    />
                    <path
                      d="M10 20c2.7 0 5-0.9 6.7-2.4l-3.3-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1v2.6C2.7 17.8 6.1 20 10 20z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.4 12c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.4H1C.4 6.6 0 8.3 0 10s.4 3.4 1 4.6l3.4-2.6z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C14.9 1 12.7 0 10 0 6.1 0 2.7 2.2 1 5.4l3.4 2.6c.8-2.3 3-4.1 5.6-4.1z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
              )}
              <button type="button" className="login-social-btn" id="login-apple">
                <svg width="18" height="20" viewBox="0 0 18 22" fill="#3D3D3D" aria-hidden>
                  <path d="M14.94 11.58c-.02-2.17 1.77-3.22 1.85-3.27-1.01-1.48-2.58-1.68-3.14-1.7-1.33-.14-2.6.79-3.28.79-.68 0-1.72-.77-2.83-.75-1.45.02-2.8.85-3.55 2.15-1.52 2.64-.39 6.54 1.09 8.68.72 1.05 1.58 2.22 2.71 2.18 1.09-.04 1.5-.71 2.82-.71 1.31 0 1.68.71 2.83.68 1.17-.02 1.91-1.06 2.63-2.11.83-1.21 1.17-2.39 1.19-2.45-.03-.01-2.28-.88-2.32-3.49zM12.78 4.82c.6-.73 1-1.73.89-2.74-.86.04-1.91.58-2.53 1.3-.55.64-1.04 1.67-.91 2.65.96.07 1.95-.49 2.55-1.21z" />
                </svg>
                Apple
              </button>
            </div>
          </form>
        ) : (
          <form className="login-form" key="register" onSubmit={handleRegisterSubmit}>
            <h1 className="login-heading">Create Account</h1>
            <p className="login-subheading">Begin your healthy pregnancy journey</p>

            {error ? <p className="login-error">{error}</p> : null}

            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Full name"
                id="reg-name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoComplete="name"
                required
              />
              <label htmlFor="reg-name">Name</label>
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                className="input-field"
                placeholder="Email address"
                id="reg-email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <label htmlFor="reg-email">Email</label>
            </div>

            <div className="input-wrapper">
              <input
                type="tel"
                className="input-field"
                placeholder="Phone number"
                id="reg-phone"
                autoComplete="tel"
              />
              <label htmlFor="reg-phone">Phone</label>
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                id="reg-password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <label htmlFor="reg-password">Password</label>
            </div>

            <button type="submit" className="btn btn-primary btn-full" id="register-submit">
              Create Account
            </button>

            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">or continue with</span>
              <span className="login-divider-line" />
            </div>

            <div className="login-social">
              {googleOAuthEnabled ? (
                <GoogleSignInButton />
              ) : (
                <button
                  type="button"
                  className="login-social-btn"
                  disabled
                  title="Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google sign-in"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                    <path
                      d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.3-1 2.3-2 3v2.5h3.3c1.9-1.7 3-4.3 3-7.3z"
                      fill="#4285F4"
                    />
                    <path
                      d="M10 20c2.7 0 5-0.9 6.7-2.4l-3.3-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1v2.6C2.7 17.8 6.1 20 10 20z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.4 12c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.4H1C.4 6.6 0 8.3 0 10s.4 3.4 1 4.6l3.4-2.6z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C14.9 1 12.7 0 10 0 6.1 0 2.7 2.2 1 5.4l3.4 2.6c.8-2.3 3-4.1 5.6-4.1z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
              )}
              <button type="button" className="login-social-btn">
                <svg width="18" height="20" viewBox="0 0 18 22" fill="#3D3D3D" aria-hidden>
                  <path d="M14.94 11.58c-.02-2.17 1.77-3.22 1.85-3.27-1.01-1.48-2.58-1.68-3.14-1.7-1.33-.14-2.6.79-3.28.79-.68 0-1.72-.77-2.83-.75-1.45.02-2.8.85-3.55 2.15-1.52 2.64-.39 6.54 1.09 8.68.72 1.05 1.58 2.22 2.71 2.18 1.09-.04 1.5-.71 2.82-.71 1.31 0 1.68.71 2.83.68 1.17-.02 1.91-1.06 2.63-2.11.83-1.21 1.17-2.39 1.19-2.45-.03-.01-2.28-.88-2.32-3.49zM12.78 4.82c.6-.73 1-1.73.89-2.74-.86.04-1.91.58-2.53 1.3-.55.64-1.04 1.67-.91 2.65.96.07 1.95-.49 2.55-1.21z" />
                </svg>
                Apple
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
