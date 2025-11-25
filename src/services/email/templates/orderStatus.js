export default function orderStatusTemplate({ username, status, orderId }) {
  return `
    <h2>Order Update</h2>
    <p>Hello, ${username}. Your order #${orderId} status changed to: <b>${status}</b></p>
  `;
}
