import "./globals.css";

export const metadata = {
  title: "Aarogya Sakhi — Your Gentle Companion for a Healthy Pregnancy",
  description: "AI-based anemia detection and care app for pregnant women. Track nutrition, hydration, and get emergency support.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body>
        <div className="app-frame">
          {children}
        </div>
      </body>
    </html>
  );
}
