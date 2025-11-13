import supabase from "../config/supabase.js";
import crypto from "crypto";

const SUPABASE_URL = process.env.SUPABASE_URL;

export function generatePKCEChallenge() {
  const code_verifier = crypto.randomBytes(32).toString("base64url");
  const code_challenge = crypto
    .createHash("sha256")
    .update(code_verifier)
    .digest("base64url");

  return { code_verifier, code_challenge };
}

export function buildSupabaseAuthorizeUrl({ redirectTo, code_challenge }) {
  const params = new URLSearchParams({
    provider: "google",
    redirect_to: redirectTo,
    response_type: "code",
    code_challenge_method: "s256",
    code_challenge,
  });

  return `${SUPABASE_URL}/auth/v1/authorize?${params.toString()}`;
}

export async function exchangeGoogleCode(code, code_verifier) {
  return await supabase.auth.exchangeCodeForSession(code, {
    codeVerifier: code_verifier,
  });
}
