const express = require('express');
const router = express.Router();

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes);

const userRoutes = require("./user.routes");
router.use("/user", userRoutes);

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

module.exports = router;
