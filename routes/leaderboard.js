// routes/leaderboard.js
const express = require("express");
const router = express.Router();

/**
 * MOCK DATA
 * Trong thực tế bạn sẽ query DB / indexer / analytics service
 */
const TOKENS = [
  {
    tokenAddress: "0xKUMA",
    name: "KUMA",
    symbol: "KUMA",
    subtitle: "Captain KUMA",
    creatorAddress: "6LuR...rsWe",
    marketCap: 7080000,
    marketCapChange24h: 3.54,
    volume24h: 10000,
    volumeChange24h: 48.45,
    holders: 12450,
    createdAt: "2024-06-01T00:00:00Z"
  },
  {
    tokenAddress: "0xFUMBLE",
    name: "FUMBLE",
    symbol: "FUM",
    subtitle: "Fucked Up My Bag",
    creatorAddress: "H3qx...7imC",
    marketCap: 2350000,
    marketCapChange24h: 0.0,
    volume24h: 0,
    volumeChange24h: 0,
    holders: null,
    createdAt: "2024-09-01T00:00:00Z"
  },
  {
    tokenAddress: "0xDACHU",
    name: "DACHU",
    symbol: "DACH",
    subtitle: "DACHU THE CHEF",
    creatorAddress: "BJno...rDvQ",
    marketCap: 552000,
    marketCapChange24h: -3.29,
    volume24h: 4.34,
    volumeChange24h: 100.0,
    holders: 3911,
    createdAt: "2024-11-01T00:00:00Z"
  }
];


// =======================
// LEADERBOARD TOP
// =======================

/**
 * @openapi
 * /leaderboard/top:
 *   get:
 *     tags:
 *       - Leaderboard -> Top
 *     summary: Get top leaderboard tokens
 *     description: |
 *       Trả về danh sách token top leaderboard (dùng cho card #001 #002 #003).
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Số lượng token top cần lấy.
 *     responses:
 *       200:
 *         description: Top leaderboard tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rank:
 *                     type: integer
 *                   tokenAddress:
 *                     type: string
 *                   name:
 *                     type: string
 *                   symbol:
 *                     type: string
 *                   subtitle:
 *                     type: string
 *                   creatorAddress:
 *                     type: string
 *                   marketCap:
 *                     type: number
 *                   marketCapChange24h:
 *                     type: number
 *                   volume24h:
 *                     type: number
 *                   volumeChange24h:
 *                     type: number
 *                   createdAt:
 *                     type: string
 */
router.get("/leaderboard/top", (req, res) => {
  const limit = Number(req.query.limit || 3);

  const sorted = [...TOKENS]
    .sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, limit)
    .map((t, i) => ({
      rank: i + 1,
      ...t
    }));

  res.json(sorted);
});


// =======================
// LEADERBOARD LIST
// =======================

/**
 * @openapi
 * /leaderboard/list:
 *   get:
 *     tags:
 *       - Leaderboard -> List
 *     summary: Get leaderboard token list
 *     description: |
 *       Trả về bảng leaderboard đầy đủ (dùng cho table).
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [marketCap, volume24h]
 *           default: marketCap
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Leaderboard list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rank:
 *                         type: integer
 *                       tokenAddress:
 *                         type: string
 *                       name:
 *                         type: string
 *                       symbol:
 *                         type: string
 *                       creatorAddress:
 *                         type: string
 *                       holders:
 *                         type: integer
 *                         nullable: true
 *                       marketCap:
 *                         type: number
 *                       marketCapChange24h:
 *                         type: number
 */
router.get("/leaderboard/list", (req, res) => {
  const {
    limit = 50,
    sort = "marketCap",
    order = "desc"
  } = req.query;

  const sorted = [...TOKENS].sort((a, b) => {
    const diff = (b[sort] || 0) - (a[sort] || 0);
    return order === "asc" ? -diff : diff;
  });

  const items = sorted.slice(0, Number(limit)).map((t, i) => ({
    rank: i + 1,
    tokenAddress: t.tokenAddress,
    name: t.name,
    symbol: t.symbol,
    creatorAddress: t.creatorAddress,
    holders: t.holders,
    marketCap: t.marketCap,
    marketCapChange24h: t.marketCapChange24h
  }));

  res.json({ items });
});

module.exports = router;
