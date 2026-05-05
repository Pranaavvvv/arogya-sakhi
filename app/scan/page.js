"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./page.css";

const recentScans = [
  { date: "Oct 12, 2023", risk: "Low Risk", level: "low" },
  { date: "Sep 28, 2023", risk: "Moderate Risk", level: "moderate" },
  { date: "Sep 10, 2023", risk: "Low Risk", level: "low" },
];

const SCAN_DURATION_MS = 4000;

/** Request camera with mobile-friendly constraints (front camera ideal for nail self-check; fall back to any camera). */
async function requestCameraStream() {
  if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    throw new Error("Camera API not available. Use HTTPS or a supported browser.");
  }

  const baseVideo = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  try {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        ...baseVideo,
        facingMode: { ideal: "user" },
      },
      audio: false,
    });
  } catch {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: {
          ...baseVideo,
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });
    } catch {
      return await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
  }
}

function ScanPageContent() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanTimerRef = useRef(null);

  const [cameraState, setCameraState] = useState("loading");
  const [cameraError, setCameraError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const attachStream = useCallback(async (stream) => {
    streamRef.current = stream;
    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    try {
      await video.play();
    } catch {
      /* play() can reject on some browsers; stream still shows */
    }
  }, []);

  const startCamera = useCallback(async () => {
    setCameraState("loading");
    setCameraError("");

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    try {
      const stream = await requestCameraStream();
      await attachStream(stream);
      setCameraState("ready");
    } catch (err) {
      const name = err?.name || "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setCameraState("denied");
        setCameraError("Camera access was blocked. Allow camera in your browser or site settings, then try again.");
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setCameraState("unavailable");
        setCameraError("No camera was found on this device.");
      } else if (name === "NotReadableError" || name === "TrackStartError") {
        setCameraState("unavailable");
        setCameraError("The camera is in use or could not be started. Close other apps using the camera and try again.");
      } else {
        setCameraState("unavailable");
        setCameraError(err?.message || "Could not start the camera.");
      }
    }
  }, [attachStream]);

  useEffect(() => {
    startCamera();
    return () => {
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
        scanTimerRef.current = null;
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [startCamera]);

  const handleStartScan = () => {
    if (cameraState !== "ready" || isScanning) return;
    setShowResult(false);
    setIsScanning(true);

    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    scanTimerRef.current = window.setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      scanTimerRef.current = null;
    }, SCAN_DURATION_MS);
  };

  const formatNow = () =>
    new Date().toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

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
            <video
              ref={videoRef}
              className="scan-video"
              playsInline
              muted
              autoPlay
              aria-label="Camera preview for nail scan"
            />

            {(cameraState === "loading" || cameraState === "denied" || cameraState === "unavailable") && (
              <div className="scan-camera-placeholder">
                {cameraState === "loading" && (
                  <>
                    <span className="scan-loading-spinner" aria-hidden />
                    <p className="scan-placeholder-text">Starting camera…</p>
                  </>
                )}
                {(cameraState === "denied" || cameraState === "unavailable") && (
                  <>
                    <span className="material-symbols-rounded scan-placeholder-icon">videocam_off</span>
                    <p className="scan-placeholder-text">{cameraError}</p>
                    <button type="button" className="btn btn-primary scan-retry-camera" onClick={startCamera}>
                      Try again
                    </button>
                  </>
                )}
              </div>
            )}

            {cameraState === "ready" && (
              <>
                <div className="scan-video-darken" aria-hidden />
                <div className="scan-active-overlay" data-scanning={isScanning ? "true" : "false"}>
                  <div className="scan-corner scan-corner-tl" />
                  <div className="scan-corner scan-corner-tr" />
                  <div className="scan-corner scan-corner-bl" />
                  <div className="scan-corner scan-corner-br" />
                  {isScanning && <div className="scan-line" aria-hidden />}
                </div>
                {isScanning && (
                  <div className="scan-status-badge">
                    <span className="material-symbols-rounded scan-status-icon">center_focus_strong</span>
                    Scanning…
                  </div>
                )}
              </>
            )}
          </div>

          <div className="scan-info-banner">
            <span className="material-symbols-rounded" style={{ color: "#E8728A", fontSize: 20 }}>
              info
            </span>
            <span>Align your fingernails within the frame and press scan.</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={handleStartScan}
            id="start-scan-btn"
            disabled={cameraState !== "ready" || isScanning}
          >
            <span className="material-symbols-rounded">center_focus_strong</span>
            {isScanning ? "Scanning…" : "Start Scan"}
          </button>
        </div>

        {/* Result card */}
        {showResult && (
          <div className="scan-result-card scan-result-success animate-fade-in-up">
            <div className="scan-result-success-icon-wrap">
              <span className="material-symbols-rounded scan-result-success-icon" aria-hidden>
                check_circle
              </span>
            </div>
            <h3 className="scan-result-success-title">No Anemia Detected</h3>
            <p className="scan-result-success-sub">Your scan looks healthy. Keep following your care plan.</p>
            <p className="scan-result-date scan-result-success-time">{formatNow()}</p>
          </div>
        )}

        {/* Recent scans */}
        <section className="scan-history">
          <h2 className="scan-history-title">Recent Scans</h2>
          <div className="scan-history-list stagger-children">
            {recentScans.map((scan, i) => (
              <div key={i} className={`scan-history-card card-accent-left risk-${scan.level}`}>
                <div className="scan-history-info">
                  <span
                    className={`badge ${
                      scan.level === "low"
                        ? "badge-success"
                        : scan.level === "moderate"
                          ? "badge-warning"
                          : "badge-danger"
                    }`}
                  >
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

export default function ScanPage() {
  return (
    <ProtectedRoute>
      <ScanPageContent />
    </ProtectedRoute>
  );
}
