const mongoose = require("mongoose");

const orderDetailsSchema = new mongoose.Schema({
  productType: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  washNames: { type: String, required: true },
  washCount: [{ type: String, required: true }],
  washTypeCost: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true },
    order_date: { type: Date, default: Date.now() },
    storeLocation: { type: String, required: true },
    storeCity: { type: String, required: true },
    storeAddress: { type: String, required: true },
    storePhone: { type: String, required: true },
    totalItems: { type: String, required: true },
    order_status: { type: String, required: true },
    totalPrice: { type: String, required: true },
    order_details: { type: [orderDetailsSchema], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);

const orderDetailsModel = mongoose.model("orderDetails", orderDetailsSchema);

module.exports = { orderModel, orderDetailsModel };
