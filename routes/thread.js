// routes/thread.js
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /thread/list:
 *   get:
 *     tags:
 *       - Thread (TBD)
 *     summary: Get threads for a token (TO BE DESIGNED)
 *     description: |
 *       Thread system (forum-style discussion) is under design.
 *     parameters:
 *       - in: query
 *         name: tokenAddress
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thread list placeholder
 */
router.get("/thread/list", (_req, res) => {
  res.json({
    status: "TBD",
    threads: []
  });
});


/**
 * @openapi
 * /thread/create:
 *   post:
 *     tags:
 *       - Thread (TBD)
 *     summary: Create new thread (TO BE DESIGNED)
 *     description: Placeholder for creating thread.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenAddress:
 *                 type: string
 *               walletAddress:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thread created placeholder
 */
router.post("/thread/create", (_req, res) => {
  res.json({
    status: "TBD",
    message: "Thread system not implemented yet"
  });
});

module.exports = router;
