const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /points/overview:
 *   get:
 *     tags:
 *       - Points -> Overview
 *     summary: Get points summary
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/points/overview", (_req, res) => {
  res.json({
    points: 120,
    tickets: 2
  });
});


/**
 * @openapi
 * /points/view:
 *   get:
 *     tags:
 *       - Points -> View
 *     summary: Get rank progress and volume status
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/points/view", (_req, res) => {
  res.json({
    rank: {
      current: "Seed",
      next: "Sprout",
      currentVolume: 3.39,
      nextRankVolume: 5,
      remainingVolume: 1.61,
      progressPercent: 67.8
    }
  });
});


/**
 * @openapi
 * /points/history:
 *   get:
 *     tags:
 *       - Points -> History
 *     summary: Get points earning history
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/points/history", (_req, res) => {
  res.json({
    items: []
  });
});

module.exports = router;
