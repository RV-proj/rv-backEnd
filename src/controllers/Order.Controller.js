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

// post
async function postOrder(req, res, next) {
  try {
    const {
      email,
      name,
      phone,
      size,
      quality,
      deliveryAddress,
      price,
      startDate,
      endDate,
      quantity,
    } = req.body;

    const newOrder = await orderModel.createOrder({
      email,
      name,
      phone,
      size,
      quality,
      deliveryAddress,
      price,
      startDate,
      endDate,
      quantity,
    });

    res.status(201).json(newOrder);
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

// get order by id
async function getOrderId(req, res, next) {
  try {
    const { id } = req.params;

    const order = await orderModel.singleOrder(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

export default { getOrder, postOrder, deleteOrder, updateOrder, getOrderId };
