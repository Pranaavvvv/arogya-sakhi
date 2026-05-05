"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginContent from "./LoginContent";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function LoginPage() {
  if (clientId) {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <LoginContent googleOAuthEnabled />
      </GoogleOAuthProvider>
    );
  }
  return <LoginContent googleOAuthEnabled={false} />;
}
