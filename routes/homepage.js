// routes/homepage.js
const express = require("express");
const router = express.Router();

const TOKENS = [
  {
    id: "1",
    address: "0xABC",
    name: "Demo Token",
    symbol: "DEMO",
    logo: "",
    creatorAddress: "0xCreator",
    marketCap: 100000,
    volume24h: 20000,
    status: "ACTIVE",
    isNSFW: false,
    _count: { liquidityEvents: 2 },
    createdAt: "2025-01-01",
    latestTransactionTimestamp: "2025-02-01"
  }
];

/**
 * @openapi
 * /homepage/trending:
 *   get:
 *     tags: 
 *       - Homepage -> Trending
 *     summary: Get trending tokens ranked by 24h volume
 *     description: |
 *       Trả về danh sách token được xếp hạng theo **volume 24h**, từ cao đến thấp.
 *     responses:
 *       200:
 *         description: List of trending tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   address:
 *                     type: string
 *                   name:
 *                     type: string
 *                   symbol:
 *                     type: string
 *                   logo:
 *                     type: string
 *                   creatorAddress:
 *                     type: string
 *                   marketCap:
 *                     type: number
 *                   volume24h:
 *                     type: number
 *                   status:
 *                     type: string
 *                   isNSFW:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                   latestTransactionTimestamp:
 *                     type: string
 */
router.get("/homepage/trending", (req, res) => {
  const sorted = TOKENS.sort((a, b) => b.volume24h - a.volume24h);
  res.json(sorted);
});

/**
 * @openapi
 * /token/search:
 *   get:
 *     tags: ["Homepage -> Search"]
 *     summary: Search token + filters
 */
router.get("/token/search", (req, res) => {
  res.json({ items: TOKENS });
});

module.exports = router;
