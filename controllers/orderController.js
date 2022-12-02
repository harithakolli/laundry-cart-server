const { orderModel, orderDetailsModel } = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const order = new orderModel(req.body);
    order.save().then((result) => res.status(200).json({ result }));
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    orderModel
      .find()
      .sort({ createdAt: -1 })
      .then((result) => res.json({ result }));
  } catch (err) {
    res.status(400).json(error.message);
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  orderModel
    .findById(id)
    .then((result) => {
      const id = result.order_details._id;
      orderDetailsModel.findByIdAndDelete(id);
    })
    .then(() => {
      orderModel
        .findByIdAndDelete(id)
        .then((result) => res.json({ status: "Successfully Deleted" }))
        .catch((err) => res.status(400).json(err));
    });
};

const updateOrder = async (req, res) => {
  const id = req.body.id;
  orderModel
    .findByIdAndUpdate(id, { order_status: req.body.order_status })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err.message));
};

module.exports = {
  createOrder,
  getAllOrders,
  deleteOrder,
  updateOrder,
};
