const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
