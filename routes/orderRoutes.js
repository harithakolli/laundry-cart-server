const router = require("express").Router();

const orderController = require("../controllers/orderController");

router.get("/:id", orderController.getAllOrders);
router.post("/:id", orderController.createOrder);
router.delete("/:id", orderController.deleteOrder);
router.patch("/:id", orderController.updateOrder);

module.exports = router;
