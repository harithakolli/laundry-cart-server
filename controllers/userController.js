const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

let token;

const login = async (req, res) => {
  const { userEmailOrPhone, password } = req.body;

  try {
    const user = await User.userLogin(userEmailOrPhone, password);
    // create a token
    token = createToken(user._id);
    res.status(200).json({ status: "success", token, user });
  } catch (error) {
    res.status(400).json(error);
  }
};

const register = async function (req, res) {
  const { name, email, password, phone } = req.body;
  const address = req.body.address;
  try {
    const user = await User.register(name, email, password, phone, address);

    // create a token
    token = createToken(user._id);
    res.status(200).json({ status: "success", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => res.status(200).json({ result, token }))
    .catch((err) => res.status(400).json({ userError: err.message }));
};

module.exports = { login, register, getUser };
