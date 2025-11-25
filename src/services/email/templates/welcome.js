export default function welcomeTemplate({ username }) {
  return `
    <h1>Welcome ${username} 🎉</h1>
    <p>Your account has been created successfully.</p>
    <p>Glad to have you with us.</p>
  `;
}
