// routes/reward.js
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /reward/info:
 *   get:
 *     tags:
 *       - Reward -> Info
 *     summary: Get reward status (points, tickets, history)
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reward info returned
 */
router.get("/reward/info", (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "walletAddress is required" });
  }

  res.json({
    walletAddress,
    currentPoints: 320,
    tickets: 2,
    nextTicketCost: 100,
    rewardsHistory: [
      { type: "FREE_TICKET", timestamp: "2025-02-01T10:30:00Z" },
      { type: "POINT_BOOST", value: 50, timestamp: "2025-02-01T09:00:00Z" }
    ]
  });
});


/**
 * @openapi
 * /reward/convert:
 *   post:
 *     tags:
 *       - Reward -> Convert
 *     summary: Convert points into ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *               pointsToUse:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ticket conversion successful
 */
router.post("/reward/convert", (req, res) => {
  const { walletAddress, pointsToUse } = req.body;

  if (!walletAddress || !pointsToUse) {
    return res.status(400).json({ error: "walletAddress & pointsToUse are required" });
  }

  res.json({
    walletAddress,
    ticketAdded: 1,
    newPointBalance: 320 - pointsToUse
  });
});


/**
 * @openapi
 * /reward/spin:
 *   post:
 *     tags:
 *       - Reward -> Spin
 *     summary: Spin reward using 1 ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Spin result
 */
router.post("/reward/spin", (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "walletAddress is required" });
  }

  const rewards = ["POINT_BOOST", "FREE_TICKET", "NOTHING", "BONUS_SPIN"];
  const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

  res.json({
    walletAddress,
    reward: randomReward,
    newPoints: randomReward === "POINT_BOOST" ? 50 : 0,
    remainingTickets: 1
  });
});

module.exports = router;
