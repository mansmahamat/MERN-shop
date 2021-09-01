const express = require('express');
const { authUser } = require('../controllers/userControllers');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    res.send({ email, password });
  })
);

module.exports = router;
