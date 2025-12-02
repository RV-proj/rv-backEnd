export function orderStatusUpdateTemplate({ username, status, orderId }) {
  return `
    <h2>Order Update</h2>
    <p>Hello, ${username}. Your order #${orderId} status changed to: <b>${status}</b></p>
  `;
}

export function orderCreateTemplate(order) {
  return `
    <h2>Order Created</h2>
    <p>Hello ${order.name}, your order <strong>#${
    order.id
  }</strong> has been created.</p>

    <h3>Order Details</h3>
    <ul>
      <li><strong>Email:</strong> ${order.email}</li>
      <li><strong>Name:</strong> ${order.name}</li>
      <li><strong>Phone:</strong> ${order.phone}</li>
      <li><strong>Size:</strong> ${order.size}</li>
      <li><strong>Quality:</strong> ${order.quality}</li>
      <li><strong>Price:</strong> ${order.price}</li>
      <li><strong>Status:</strong> ${order.status}</li>
      <li><strong>Quantity:</strong> ${order.quantity ?? "N/A"}</li>
      <li><strong>Amount Paid:</strong> ${order.amount_paid ?? "N/A"}</li>
      <li><strong>Start Date:</strong> ${order.startDate}</li>
      <li><strong>End Date:</strong> ${order.endDate}</li>
      <li><strong>Delivery Address:</strong> ${JSON.stringify(
        order.deliveryAddress,
        null,
        2
      )}</li>
    </ul>

    <p>We will get back to you as soon as possible.</p>
  `;
}
