const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body.email;

  res.send({ email, password });
});

module.exports = { authUser };
