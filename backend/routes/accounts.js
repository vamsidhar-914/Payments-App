const express = require("express");
const { verifyToken } = require("../middleware/authmiddleWare");
const { Account } = require("../models/db");
const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance", verifyToken, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", verifyToken, async (req, res) => {
  const { amount, to } = req.body;
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (account.balance < amount) {
    return res.status(400).json({
      message: "Insufficent balance",
    });
  }
  const toAccount = await Account.findOne({
    userId: to,
  });
  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid Account",
    });
  }
  // transactions
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );
  res.json({
    message: "Transfer Successfull",
  });
});

// another method
router.post("/transaction", verifyToken, async (req, res) => {
  // good solution on how to make transactions in mongodb
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "inValid Account",
    });
  }
  // perform transactions
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: amount } }
  ).session(session);
  // commit the transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer Succesfull",
  });
});

module.exports = router;
