// routes/create.js
const express = require("express");
const router = express.Router();

/* =========================
   STEP 1 — BASIC INFO
========================= */

/**
 * @openapi
 * /token/upload-image:
 *   post:
 *     tags:
 *       - Create Token -> Basic
 *     summary: Upload token image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded
 */
router.post("/token/upload-image", (_req, res) => {
  res.json({ imageUrl: "https://cdn.example.com/token/demo.png" });
});


/**
 * @openapi
 * /token/create/draft:
 *   post:
 *     tags:
 *       - Create Token -> Basic
 *     summary: Create token draft (step 1)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - walletAddress
 *               - name
 *               - symbol
 *             properties:
 *               walletAddress:
 *                 type: string
 *               name:
 *                 type: string
 *               symbol:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               socials:
 *                 type: object
 *                 properties:
 *                   twitter:
 *                     type: string
 *                   telegram:
 *                     type: string
 *                   website:
 *                     type: string
 *     responses:
 *       200:
 *         description: Draft created
 */
router.post("/token/create/draft", (req, res) => {
  res.json({
    draftId: "draft_123",
    status: "DRAFT"
  });
});


/* =========================
   STEP 2 — TRUST SCORE
========================= */

/**
 * @openapi
 * /token/trust-score/preview:
 *   post:
 *     tags:
 *       - Create Token -> Trust
 *     summary: Preview trust score
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - initialSupply
 *               - allocation
 *             properties:
 *               initialSupply:
 *                 type: number
 *               allocation:
 *                 type: object
 *                 properties:
 *                   creator:
 *                     type: number
 *                   community:
 *                     type: number
 *                   liquidity:
 *                     type: number
 *               renounceMintAuthority:
 *                 type: boolean
 *               freezeAuthority:
 *                 type: boolean
 *               lpLockMonths:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Trust score preview
 */
router.post("/token/trust-score/preview", (_req, res) => {
  res.json({
    trustScore: 78,
    badge: "Gold",
    breakdown: {
      vesting: "Bronze",
      freezeAuthority: "Silver",
      lpLock: "Gold"
    }
  });
});


/**
 * @openapi
 * /token/create/trust:
 *   post:
 *     tags:
 *       - Create Token -> Trust
 *     summary: Save trust & tokenomics settings (step 2)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - draftId
 *               - initialSupply
 *               - allocation
 *             properties:
 *               draftId:
 *                 type: string
 *               initialSupply:
 *                 type: number
 *               allocation:
 *                 type: object
 *                 properties:
 *                   creator:
 *                     type: number
 *                   community:
 *                     type: number
 *                   liquidity:
 *                     type: number
 *               mintAuthority:
 *                 type: string
 *               renounceMintAuthority:
 *                 type: boolean
 *               freezeAuthority:
 *                 type: boolean
 *               lpLockMonths:
 *                 type: integer
 *               trustScore:
 *                 type: number
 *               badge:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trust config saved
 */
router.post("/token/create/trust", (req, res) => {
  res.json({
    draftId: req.body.draftId,
    status: "TRUST_CONFIGURED"
  });
});


/* =========================
   STEP 3 — FINALIZE
========================= */

/**
 * @openapi
 * /token/create/preview-buy:
 *   post:
 *     tags:
 *       - Create Token -> Finalize
 *     summary: Preview initial buy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - draftId
 *               - amountSol
 *             properties:
 *               draftId:
 *                 type: string
 *               amountSol:
 *                 type: number
 *     responses:
 *       200:
 *         description: Buy preview
 */
router.post("/token/create/preview-buy", (req, res) => {
  res.json({
    amountSol: req.body.amountSol,
    estimatedTokens: 1200000,
    price: 0.00000042
  });
});


/**
 * @openapi
 * /token/create/finalize:
 *   post:
 *     tags:
 *       - Create Token -> Finalize
 *     summary: Finalize token creation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - draftId
 *             properties:
 *               draftId:
 *                 type: string
 *               initialBuySol:
 *                 type: number
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Token created
 */
router.post("/token/create/finalize", (req, res) => {
  res.json({
    tokenAddress: "0xTOKEN",
    txId: "0xTX",
    createdAt: new Date().toISOString()
  });
});

module.exports = router;
