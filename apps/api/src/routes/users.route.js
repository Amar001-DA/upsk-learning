const express = require("express");
const redisClient = require("../config/redis");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cachedUsers = await redisClient.get("users");

    if (cachedUsers) {
      return res.status(200).json({
        source: "redis-cache",
        data: JSON.parse(cachedUsers),
      });
    }

    const users = [
      { id: 1, name: "Aarav" },
      { id: 2, name: "Rahul" },
    ];

    await redisClient.set("users", JSON.stringify(users), {
      EX: 60,
    });

    res.status(200).json({
      source: "database",
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});
const validateUser = require("../middleware/validateUser");

router.post("/", validateUser, async (req, res) => {
  try {
    const { name } = req.body;

    const newUser = {
      id: Date.now(),
      name,
    };

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});
module.exports = router;
