// routes/token.js
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /token/info:
 *   get:
 *     tags:
 *       - Token -> Info
 *     summary: Get detailed token information
 *     description: |
 *       Trả về toàn bộ thông tin chi tiết của một token bao gồm:
 *       - Metadata (name, symbol, logo)
 *       - Market data (market cap, supply, liquidity, volume)
 *       - Creator info
 *       - On-chain activity
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Token address cần lấy thông tin.
 *     responses:
 *       200:
 *         description: Token info returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                 name:
 *                   type: string
 *                 symbol:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 description:
 *                   type: string
 *                 creatorAddress:
 *                   type: string
 *                 marketCap:
 *                   type: number
 *                 supply:
 *                   type: number
 *                 liquidity:
 *                   type: number
 *                 volume24h:
 *                   type: number
 *                 holders:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                 bondingCurveStatus:
 *                   type: string
 *                   example: "ACTIVE | FINISHED | MIGRATED"
 *       400:
 *         description: Missing or invalid address
 *       404:
 *         description: Token not found
 */
router.get("/token/info", (req, res) => {
  res.json({ ok: true });
});

/**
 * @openapi
 * /token/liquidity:
 *   get:
 *     tags:
 *       - Token -> Liquidity
 *     summary: Get liquidity information for a token
 *     description: |
 *       Trả về thông tin thanh khoản của token, bao gồm:
 *       - Liquidity events (buy/sell)
 *       - Reserve balance (bonding curve)
 *       - LP migration status (Raydium/Jupiter)
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Token address cần lấy dữ liệu liquidity.
 *     responses:
 *       200:
 *         description: Liquidity info returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenAddress:
 *                   type: string
 *                 isCurveFinished:
 *                   type: boolean
 *                 reserveBalance:
 *                   type: number
 *                 totalVolume:
 *                   type: number
 *                 lpMigration:
 *                   type: object
 *                   properties:
 *                     migrated:
 *                       type: boolean
 *                     destinationDex:
 *                       type: string
 *                     lpLockedUntil:
 *                       type: string
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: BUY / SELL
 *                       from:
 *                         type: string
 *                       solAmount:
 *                         type: number
 *                       tokenAmount:
 *                         type: number
 *                       price:
 *                         type: number
 *                       timestamp:
 *                         type: string
 *       400:
 *         description: Missing or invalid address
 *       404:
 *         description: Token not found
 */
router.get("/token/liquidity", (req, res) => {
  res.json([]);
});

/**
 * @openapi
 * /token/price:
 *   get:
 *     tags:
 *       - Token -> Price
 *     summary: Get current price + price chart of a token
 *     description: |
 *       Trả về giá hiện tại của token + biểu đồ giá theo timeframe.
 *       Bao gồm:
 *       - Giá bonding curve (nếu chưa migrate)
 *       - Giá DEX (nếu đã migrate)
 *       - Dữ liệu chart để vẽ biểu đồ
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Token address.
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [1m,5m,15m,1h,4h,1d]
 *           default: 5m
 *         description: Timeframe của biểu đồ giá.
 *     responses:
 *       200:
 *         description: Price data returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenAddress:
 *                   type: string
 *                 price:
 *                   type: number
 *                 priceSource:
 *                   type: string
 *                   example: CURVE
 *                 curvePrice:
 *                   type: number
 *                 dexPrice:
 *                   type: number
 *                   nullable: true
 *                 timeframe:
 *                   type: string
 *                 chart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       price:
 *                         type: number
 *       400:
 *         description: Missing or invalid address
 *       404:
 *         description: Token not found
 */

router.get("/token/price", (req, res) => {
  res.json([]);
});

/**
 * @openapi
 * /token/holders:
 *   get:
 *     tags:
 *       - Token -> Holders
 *     summary: Get list of token holders
 *     description: |
 *       Trả về danh sách các ví đang nắm giữ token, bao gồm:
 *       - Số lượng token
 *       - % ownership
 *       - Thông tin giao dịch gần nhất
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Token address cần lấy dữ liệu holders.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Số lượng holders trả về mỗi request.
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *           nullable: true
 *         description: Cursor để load tiếp (pagination dạng cursor).
 *     responses:
 *       200:
 *         description: List of token holders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenAddress:
 *                   type: string
 *                 totalHolders:
 *                   type: integer
 *                 nextCursor:
 *                   type: string
 *                   nullable: true
 *                 holders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       balance:
 *                         type: number
 *                       percentShare:
 *                         type: number
 *                       lastTransaction:
 *                         type: string
 *                         nullable: true
 *       400:
 *         description: Missing or invalid address
 *       404:
 *         description: Token not found
 */

router.get("/token/holders", (req, res) => {
  res.json([]);
});

module.exports = router;
