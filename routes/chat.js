// routes/chat.js
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /chat/write:
 *   post:
 *     tags:
 *       - Chatroom -> Write Message
 *     summary: Send a new chat message
 *     description: Gửi tin nhắn vào chatroom của một token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenAddress:
 *                 type: string
 *                 description: Token chatroom.
 *               walletAddress:
 *                 type: string
 *               message:
 *                 type: string
 *                 description: Nội dung tin nhắn.
 *             required:
 *               - tokenAddress
 *               - walletAddress
 *               - message
 *     responses:
 *       200:
 *         description: Message posted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageId:
 *                   type: string
 *                 tokenAddress:
 *                   type: string
 *                 walletAddress:
 *                   type: string
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Missing required fields
 */

router.post("/chat/write", (req, res) => {
  const { tokenAddress, walletAddress, message } = req.body;

  if (!tokenAddress || !walletAddress || !message) {
    return res.status(400).json({ error: "tokenAddress, walletAddress, message are required" });
  }

  res.json({
    messageId: Math.random().toString(36).substring(2),
    tokenAddress,
    walletAddress,
    message,
    timestamp: new Date().toISOString()
  });
});


/**
 * @openapi
 * /chat/messages:
 *   get:
 *     tags:
 *       - Chatroom -> Load Messages
 *     summary: Load chat messages for a token chatroom
 *     description: Trả về danh sách tin nhắn theo dạng cursor-based pagination.
 *     parameters:
 *       - in: query
 *         name: tokenAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Token chatroom address.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Số tin nhắn cần lấy.
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *           nullable: true
 *         description: ID tin nhắn để load tiếp (pagination).
 *     responses:
 *       200:
 *         description: List of messages returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenAddress:
 *                   type: string
 *                 nextCursor:
 *                   type: string
 *                   nullable: true
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       messageId:
 *                         type: string
 *                       walletAddress:
 *                         type: string
 *                       message:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *       400:
 *         description: Missing tokenAddress
 */

router.get("/chat/messages", (req, res) => {
  const { tokenAddress, limit = 30 } = req.query;

  if (!tokenAddress) {
    return res.status(400).json({ error: "tokenAddress is required" });
  }

  // mock message list
  const messages = Array.from({ length: Number(limit) }).map((_x, i) => ({
    messageId: `msg_${i}`,
    walletAddress: `0xUSER_${i}`,
    message: `This is a mock message #${i}`,
    timestamp: new Date(Date.now() - i * 60000).toISOString()
  }));

  res.json({
    tokenAddress,
    nextCursor: "cursor_mock",
    messages
  });
});

module.exports = router;
