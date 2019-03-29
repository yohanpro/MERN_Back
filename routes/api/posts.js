const express = require("express");
const router = express.Router();

// @route get  /api/posts/test
router.get("/test", (req, res) => {
  res.json({ msg: "Posts work" });
});

module.exports = router;
