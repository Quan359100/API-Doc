const express = require("express");
const router = express.Router();

/**
 * MOCK STORAGE
 */
let referralLink = null;
let unclaimedRewardsSol = 0;

const REFERRALS = [];

/**
 * =========================
 * REFERRAL SUMMARY
 * =========================
 */
/**
 * @openapi
 * /referrals/summary:
 *   get:
 *     tags:
 *       - Referral -> Summary
 *     summary: Get referral summary
 *     responses:
 *       200:
 *         description: Referral summary
 */
router.get("/referrals/summary", (_req, res) => {
  const totalVolume = REFERRALS.reduce((s, r) => s + r.tradingVolumeSol, 0);

  res.json({
    totalReferrals: REFERRALS.length,
    totalVolumeSol: totalVolume,
    unclaimedRewardsSol
  });
});


/**
 * =========================
 * CREATE / GET REFERRAL LINK
 * =========================
 */
/**
 * @openapi
 * /referrals/link:
 *   post:
 *     tags:
 *       - Referral -> Link
 *     summary: Create or get referral link
 *     responses:
 *       200:
 *         description: Referral link info
 */
router.post("/referrals/link", (_req, res) => {
  if (!referralLink) {
    const code = Math.random().toString(36).substring(2, 8);
    referralLink = {
      referralCode: code,
      referralLink: `https://your.site/join/${code}`,
      rewardRate: 0.2
    };
  }

  res.json(referralLink);
});


/**
 * =========================
 * REFERRAL LIST
 * =========================
 */
/**
 * @openapi
 * /referrals/list:
 *   get:
 *     tags:
 *       - Referral -> List
 *     summary: Get referral list
 *     responses:
 *       200:
 *         description: Referral list
 */
router.get("/referrals/list", (_req, res) => {
  res.json({
    items: REFERRALS
  });
});


/**
 * =========================
 * TRACK REFERRAL (SYSTEM)
 * =========================
 */
/**
 * @openapi
 * /referrals/track:
 *   post:
 *     tags:
 *       - Referral -> List
 *     summary: Track referral join
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *               tradingVolumeSol:
 *                 type: number
 *     responses:
 *       200:
 *         description: Referral tracked
 */
router.post("/referrals/track", (req, res) => {
  const { walletAddress, tradingVolumeSol = 0 } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "walletAddress required" });
  }

  const reward = tradingVolumeSol * 0.2;
  unclaimedRewardsSol += reward;

  REFERRALS.push({
    walletAddress,
    joinedAt: new Date().toISOString(),
    tradingVolumeSol,
    rewardSol: reward
  });

  res.json({ ok: true });
});


/**
 * =========================
 * CLAIM REWARDS
 * =========================
 */
/**
 * @openapi
 * /referrals/claim:
 *   post:
 *     tags:
 *       - Referral -> Claim
 *     summary: Claim referral rewards
 *     responses:
 *       200:
 *         description: Rewards claimed
 */
router.post("/referrals/claim", (_req, res) => {
  const claimed = unclaimedRewardsSol;
  unclaimedRewardsSol = 0;

  res.json({
    claimedAmountSol: claimed,
    txId: "0xMOCK_CLAIM_TX"
  });
});

module.exports = router;
