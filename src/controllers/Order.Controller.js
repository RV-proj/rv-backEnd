import orderModel from "../models/Order.Model.js";

// get
async function getOrder(req, res, next) {
  try {
    const allOrder = await orderModel.getAllOrder();

    res.status(200).json(allOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// SECTION stripe controller
// post
async function postOrder(req, res, next) {
  try {
    // get stripe data
    const stripe = req.stripe;

    // order body
    const { amount_paid } = req.body;

    // stripe payment data
    const paymentData = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "RV Booking Deposit" },
            unit_amount: amount_paid * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      // FIXME change this to order route note: "http://localhost:3000/order",
      success_url: "http://localhost:3000/testpage",
      cancel_url: "http://localhost:3000/",
    });

    res.status(201).json({
      url: paymentData.url,
      sessionId: paymentData.id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// verify payment
async function verifyPayment(req, res, next) {
  try {
    const stripe = req.stripe;
    const { sessionId, orderData } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // console.log(session);
    // console.log(session.payment_intent);

    const stripePhone = session.customer_details?.phone;
    const stripeAddress = session.customer_details?.address;
    const stripeName = session.customer_details?.name;

    const savedOrder = await orderModel.createOrder({
      ...orderData,
      phone: stripePhone ?? orderData.phone,
      deliveryAddress: stripeAddress ?? orderData.stripeAddress,
      name: stripeName ?? orderData.name,
      id: session.payment_intent,
      amount_paid: session.amount_total / 100,
    });

    res.json({ message: "Order saved", order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// delete
async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;

    const deletedOrder = await orderModel.deleteOrder(id);
    res.status(200).json(deletedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// update
async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const updatedOrder = await orderModel.updatedOrder(id, updatedData);
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// get order by email
async function getOrderEmail(req, res, next) {
  try {
    const email = req.query.email?.trim();

    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }

    const order = await orderModel.filterOrder(email);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

export default {
  getOrder,
  postOrder,
  deleteOrder,
  updateOrder,
  getOrderEmail,
  verifyPayment,
};
