import {
  exchangeGoogleCode,
  buildSupabaseAuthorizeUrl,
  generatePKCEChallenge,
} from "../models/Auth.Model.js";

import supabase from "../config/supabase.js";

let currentSession = null;

// Step 1 — Redirect user to Google
export const googleSignIn = async (req, res) => {
  try {
    const redirectTo = "http://localhost:5000/auth/callback";
    const { code_verifier, code_challenge } = generatePKCEChallenge();

    // Save the verifier in a secure, short-lived cookie
    res.cookie("code_verifier", code_verifier, {
      httpOnly: true,
      secure: false, // change to true if using HTTPS
      sameSite: "lax",
      maxAge: 5 * 60 * 1000, // valid for 5 minutes
    });

    const authUrl = buildSupabaseAuthorizeUrl({ redirectTo, code_challenge });
    res.redirect(authUrl);
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ message: "Google sign-in failed" });
  }
};

// Step 2 — Callback from Google
export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const codeVerifier = req.cookies.code_verifier;

    if (!code || !codeVerifier) {
      return res.status(400).json({ message: "Missing code or code verifier" });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code, {
      codeVerifier,
    });

    if (error) {
      console.error("Exchange error:", error);
      return res.status(400).json({ message: "Exchange failed", error });
    }

    currentSession = data.session; // store session

    res.clearCookie("code_verifier");

    res.redirect("http://localhost:3000/");
  } catch (err) {
    console.error("Callback error:", err);
    res.status(500).json({ message: "Callback error", error: err.message });
  }
};

// Step 3 — Return session
export const getSession = (req, res) => {
  if (!currentSession)
    return res.status(404).json({ message: "No session found" });

  res.json({
    user: currentSession.user,
    access_token: currentSession.access_token,
    refresh_token: currentSession.refresh_token,
  });
};
