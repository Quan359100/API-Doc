// routes/stake.js
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /stake/overview:
 *   get:
 *     tags:
 *       - Stake (TBD)
 *     summary: Stake overview (TO BE DESIGNED)
 *     description: |
 *       Stake system is not finalized yet.
 *       This endpoint is a placeholder for future design.
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stake overview placeholder
 */
router.get("/stake/overview", (_req, res) => {
  res.json({
    status: "TBD",
    message: "Stake system is under design"
  });
});


/**
 * @openapi
 * /stake/action:
 *   post:
 *     tags:
 *       - Stake (TBD)
 *     summary: Stake / Unstake action (TO BE DESIGNED)
 *     description: Placeholder endpoint for staking actions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *               tokenAddress:
 *                 type: string
 *               amount:
 *                 type: number
 *               action:
 *                 type: string
 *                 example: STAKE | UNSTAKE
 *     responses:
 *       200:
 *         description: Stake action placeholder
 */
router.post("/stake/action", (_req, res) => {
  res.json({
    status: "TBD",
    message: "Stake action not implemented yet"
  });
});

module.exports = router;
