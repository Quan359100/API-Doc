// routes/trading.js
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /trading/buy:
 *   post:
 *     tags:
 *       - Trading -> Buy
 *     summary: Buy token from bonding curve or DEX
 *     description: |
 *       Tạo lệnh mua token. 
 *       FE sẽ gửi số SOL hoặc số token mong muốn, backend trả lại chi tiết giao dịch.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenAddress:
 *                 type: string
 *                 description: Địa chỉ token cần mua.
 *               amountInSol:
 *                 type: number
 *                 description: Số SOL người dùng muốn dùng để mua (alternative với amountInToken).
 *               amountInToken:
 *                 type: number
 *                 description: Số token người dùng muốn mua (optional, dùng 1 trong 2).
 *               slippageBps:
 *                 type: integer
 *                 description: Độ trượt giá cho phép, tính theo basis points. 100 = 1%.
 *                 example: 100
 *               referrer:
 *                 type: string
 *                 description: Địa chỉ referrer (nếu có chương trình referral).
 *             required:
 *               - tokenAddress
 *     responses:
 *       200:
 *         description: Buy quote / result returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenAddress:
 *                   type: string
 *                 amountInSol:
 *                   type: number
 *                 amountOutToken:
 *                   type: number
 *                 executionPrice:
 *                   type: number
 *                 slippageBps:
 *                   type: integer
 *                 feePlatform:
 *                   type: number
 *                 feeReferral:
 *                   type: number
 *                 txId:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Internal error while processing trade
 */

router.post("/trade/buy", (req, res) => {
  res.json({ ok: true });
});

/**
 * @openapi
 * /trading/sell:
 *   post:
 *     tags:
 *       - Trading -> Sell
 *     summary: Sell token to bonding curve or DEX
 *     description: |
 *       Tạo lệnh bán token. FE gửi số token muốn bán, backend trả về
 *       số SOL nhận được + chi tiết giá.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenAddress:
 *                 type: string
 *                 description: Token cần bán.
 *               amountInToken:
 *                 type: number
 *                 description: Số lượng token muốn bán.
 *               slippageBps:
 *                 type: integer
 *                 description: Slippage cho phép (basis points). 100 = 1%.
 *                 example: 100
 *               referrer:
 *                 type: string
 *                 description: Địa chỉ referrer (nếu có chương trình referral).
 *             required:
 *               - tokenAddress
 *               - amountInToken
 *     responses:
 *       200:
 *         description: Sell quote / result returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenAddress:
 *                   type: string
 *                 amountInToken:
 *                   type: number
 *                 amountOutSol:
 *                   type: number
 *                 executionPrice:
 *                   type: number
 *                 slippageBps:
 *                   type: integer
 *                 feePlatform:
 *                   type: number
 *                 feeReferral:
 *                   type: number
 *                 txId:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

router.post("/trade/sell", (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
