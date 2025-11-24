import { resend } from "./resendClient.js";
import { templates } from "./templates/index.js";

export async function sendEmail(type, { to, subject, data }) {
  try {
    const templateFn = templates[type];

    if (!templateFn) {
      throw new Error(`Email template '${type}' not found`);
    }
    const html = templateFn(data);
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "rveedom411@gmail.com", //After adding domain to resend, remove hardcoded email
      subject: subject || type.replace("_", " "),
      html,
    });
    return result;
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
}
