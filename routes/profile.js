// routes/profile.js
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /profile/info:
 *   get:
 *     tags:
 *       - Profile -> User Info
 *     summary: Get user profile information
 *     description: Lấy thông tin cơ bản của người dùng từ wallet address.
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Địa chỉ ví của user.
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 walletAddress:
 *                   type: string
 *                 username:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 joinedAt:
 *                   type: string
 *                 totalTokensCreated:
 *                   type: integer
 *                 totalTokensBought:
 *                   type: integer
 *                 totalTokensSold:
 *                   type: integer
 *       400:
 *         description: Missing walletAddress
 */

router.get("/profile/info", (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "walletAddress is required" });
  }

  res.json({
    walletAddress,
    username: "DemoUser",
    avatar: "https://example.com/avatar.png",
    bio: "Hello, I'm a memecoin trader!",
    joinedAt: "2025-01-01T12:00:00Z",
    totalTokensCreated: 3,
    totalTokensBought: 12,
    totalTokensSold: 8
  });
});

/**
 * @openapi
 * /profile/stats:
 *   get:
 *     tags:
 *       - Profile -> User Stats
 *     summary: Get user trading statistics
 *     description: |
 *       Trả về thống kê giao dịch của người dùng:
 *       - Volume mua/bán  
 *       - PnL  
 *       - Danh sách token đã giao dịch  
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User stats returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 walletAddress:
 *                   type: string
 *                 totalBuys:
 *                   type: number
 *                 totalSells:
 *                   type: number
 *                 totalVolumeSOL:
 *                   type: number
 *                 totalPnL:
 *                   type: number
 *                 rank:
 *                   type: integer
 *                 favoriteTokens:
 *                   type: array
 *                   items:
 *                     type: string
 *                 recentActivities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       tokenAddress:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       timestamp:
 *                         type: string
 *       400:
 *         description: Missing walletAddress
 */
router.get("/profile/stats", (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "walletAddress is required" });
  }

  res.json({
    walletAddress,
    totalBuys: 18,
    totalSells: 7,
    totalVolumeSOL: 124.5,
    totalPnL: 32.8,
    rank: 142,
    favoriteTokens: ["0xABC", "0xDEF", "0xGHI"],
    recentActivities: [
      {
        type: "BUY",
        tokenAddress: "0xABC",
        amount: 1.5,
        timestamp: "2025-02-01T12:30:00Z"
      },
      {
        type: "SELL",
        tokenAddress: "0xDEF",
        amount: 0.8,
        timestamp: "2025-02-01T11:15:00Z"
      }
    ]
  });
});

module.exports = router;
