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

export default { getOrder };
