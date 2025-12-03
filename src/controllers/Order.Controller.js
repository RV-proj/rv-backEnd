import orderModel from "../models/Order.Model.js";
import { sendEmail } from "../services/email/sendEmail.js";

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
    const { amount_paid, email, orderData } = req.body;

    // stripe payment data
    const paymentData = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      invoice_creation: { enabled: true },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "RV Booking Deposit" },
            unit_amount: Math.round(amount_paid * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      success_url: "http://localhost:3000/order",
      cancel_url: "http://localhost:3000/",

      metadata: {
        order: JSON.stringify(orderData),
      },
    });

    res.status(201).json({
      url: paymentData.url,
      // sessionId: paymentData.id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// webhook
async function webhook(req, res, next) {
  try {
    // console.log(req.body);

    // get stripe data
    const stripe = req.stripe;

    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const stripePhone = session.customer_details?.phone;
      const stripeAddress = session.customer_details?.address;
      const stripeName = session.customer_details?.name;
      const stripeEmail = session.customer_details?.email;

      const frontendOrder = JSON.parse(session.metadata.order);

      const orderData = {
        id: session.payment_intent,
        amount_paid: session.amount_total / 100,
        phone: stripePhone,
        deliveryAddress: stripeAddress,
        name: stripeName,
        email: stripeEmail,
        size: frontendOrder.size,
        quality: frontendOrder.quality,
        price: frontendOrder.price,
        startDate: frontendOrder.startDate,
        endDate: frontendOrder.endDate,
      };

      await orderModel.createOrder(orderData);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// verify payment // NOTE payment verification will use if needed alternative webhook used
// async function verifyPayment(req, res, next) {
//   try {
//     const stripe = req.stripe;
//     const { sessionId, orderData } = req.body;

//     console.log(sessionId, orderData);

//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     // console.log(session);
//     // console.log(session.payment_intent);

//     const stripePhone = session.customer_details?.phone;
//     const stripeAddress = session.customer_details?.address;
//     const stripeName = session.customer_details?.name;

//     const savedOrder = await orderModel.createOrder({
//       ...orderData,
//       phone: stripePhone,
//       deliveryAddress: stripeAddress,
//       name: stripeName,
//       id: session.payment_intent,
//       amount_paid: session.amount_total / 100,
//     });

//     res.json({ message: "Order saved", order: savedOrder });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//     next(err);
//   }
// }

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

// update status
async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    console.log(id, status);

    const updatedStatus = await orderModel.updateStatus(id, status);

    res.status(200).json(updatedStatus);
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
  updateStatus,
  webhook,

  // NOTE use this if verifyPayment used
  // verifyPayment,
};
