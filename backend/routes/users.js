const express = require("express");
const router = express.Router();
const { User, Account } = require("../models/db");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/authmiddleWare");

// register(signup)

const signUpBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signUpBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }
  const existUser = await User.findOne({ username: req.body.username });
  if (existUser) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash,
  });
  const userId = user._id;
  // create new account
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    id: userId,
    token,
  });
});

// login
const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signInBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );
    res.json({
      id: user._id,
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

router.put("/:id", verifyToken, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  if (req.params.id !== req.userId) {
    return res.status(411).json({
      message: "you can only upload your account",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated Successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

// get single user information
router.get("/get/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password, ...rest } = user._doc;
  res.status(200).json(rest);
});

module.exports = router;
