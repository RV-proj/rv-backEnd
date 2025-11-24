import { resend } from "./resendClient.js";
import { templates } from "./templates/index.js";

export async function sendEmail(type, { to, subject, data }) {
  try {
    console.log("🔥 Sending email with type:", type, "to:", to);

    const templateFn = templates[type];

    if (!templateFn) {
      throw new Error(`Email template '${type}' not found`);
    }

    const html = templateFn(data);
    console.log("🔥 Template generated:", html);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "rveedom411@gmail.com", //After adding domain to resend, remove hardcoded email
      subject: subject || type.replace("_", " "),
      html,
    });

    console.log("🔥 Email SENT result:", result);
    return result;
  } catch (err) {
    console.error("❌ Email error:", err);
    throw err;
  }
}
