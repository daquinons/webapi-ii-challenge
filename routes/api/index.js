const express = require('express');
const postRoutes = require('./posts');

const router = express.Router();

router.use("/api", postRoutes);

module.exports = router;