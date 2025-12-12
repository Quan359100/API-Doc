const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - "Connect Wallet"
 *     summary: Khởi tạo đăng nhập bằng ví (Issue Challenge)
 *     description: "FE gửi địa chỉ ví, BE sinh challenge/nonce để FE yêu cầu ví ký."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - walletAddress
 *             properties:
 *               walletAddress:
 *                 type: string
 *                 example: "9wBdT3WJz1txyBq3bKUTznV..."
 *               ref:
 *                 type: string
 *                 example: "4pVx..."
 *                 description: "(optional) Mã ref nếu người dùng vào qua link giới thiệu"
 *     responses:
 *       200:
 *         description: Challenge message để FE yêu cầu ví ký
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 challenge:
 *                   type: string
 *                   example: "Sign to login: nonce=xyz123; domain=bondle.fun"
 *                 nonce:
 *                   type: string
 *                   example: "xyz123"
 *                 domain:
 *                   type: string
 *                   example: "bondle.fun"
 *                 expiresIn:
 *                   type: integer
 *                   example: 120
 *       400:
 *         description: Thiếu walletAddress
 */
router.post("/auth/login", (req, res) => {
  const { walletAddress } = req.body || {};

  if (!walletAddress) {
    return res.status(400).json({ error: "Missing walletAddress" });
  }

  const nonce = Math.random().toString(36).slice(2, 10);
  const challenge = `Sign to login: nonce=${nonce}; domain=bondle.fun; wallet=${walletAddress}`;

  res.json({
    challenge,
    nonce,
    domain: "bondle.fun",
    expiresIn: 120,
  });
});

/**
 * @openapi
 * /auth/verify:
 *   post:
 *     tags:
 *       - "Connect Wallet"
 *     summary: Xác thực chữ ký & tạo session (Verify & Create Session)
 *     description: "FE gửi chữ ký của ví đã ký challenge, BE verify và cấp JWT/session."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - walletAddress
 *               - signature
 *             properties:
 *               walletAddress:
 *                 type: string
 *                 example: "9wBdT3WJz1txyBq3bKUTznV..."
 *               signature:
 *                 type: string
 *                 example: "0xabc123..."
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwtToken:
 *                   type: string
 *                   example: "eyJhbGciOi..."
 *                 userProfile:
 *                   type: object
 *                   properties:
 *                     walletAddress:
 *                       type: string
 *                       example: "9wBdT3..."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 expiresInSec:
 *                   type: integer
 *                   example: 3600
 *       400:
 *         description: Thiếu tham số
 *       401:
 *         description: Chữ ký không hợp lệ hoặc nonce hết hạn
 */
router.post("/auth/verify", (req, res) => {
  const { walletAddress, signature } = req.body || {};

  if (!walletAddress || !signature) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const jwtToken = "eyJhbGciOi...";
  const userProfile = {
    walletAddress,
    createdAt: new Date().toISOString(),
  };

  res.json({
    jwtToken,
    userProfile,
    expiresInSec: 3600,
  });
});

/**
 * @openapi
 * /auth/session:
 *   get:
 *     tags:
 *       - "Connect Wallet"
 *     summary: Kiểm tra trạng thái đăng nhập (Session Check)
 *     description: "FE gọi khi mở/reload trang để xác định còn phiên đăng nhập hay không."
 *     responses:
 *       200:
 *         description: Session hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                   example: true
 *                 address:
 *                   type: string
 *                   example: "9wBdT3..."
 *                 expiresInSec:
 *                   type: integer
 *                   example: 1800
 *       401:
 *         description: Session hết hạn hoặc không hợp lệ
 */
router.get("/auth/session", (_req, res) => {
  res.json({
    authenticated: true,
    address: "9wBdT3...",
    expiresInSec: 1800,
  });
});

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *       - "Connect Wallet"
 *     summary: Làm mới phiên (Refresh)
 *     description: "FE gọi khi sắp hết hạn phiên, BE cấp token mới (giảm yêu cầu ký lại)."
 *     responses:
 *       200:
 *         description: Cấp token mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   example: "eyJhbGciOi..."
 *                 expiresInSec:
 *                   type: integer
 *                   example: 3600
 *       401:
 *         description: Refresh token không hợp lệ
 */
router.post("/auth/refresh", (_req, res) => {
  res.json({
    jwt: "eyJhbGciOi...",
    expiresInSec: 3600,
  });
});

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - "Connect Wallet"
 *     summary: Đăng xuất / Huỷ phiên (Logout)
 *     description: "BE revoke session hoặc xoá cookie; FE sẽ đồng bộ wallet.disconnect()."
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */
router.post("/auth/logout", (_req, res) => {
  res.json({ ok: true });
});

/// ======= Token Search (text + category + filters) =======

// Demo data; thực tế hãy truy vấn DB + có index cho name/symbol/createdAt/marketCap/volume24h
const TOKENS = [
  {
    id: "f5418597-bc74-4557-bc5e-d428dafb7380",
    address: "0xb3Ecb631d2b5B99359905932aaCb7779C10017cC",
    creatorAddress: "0xC8C7088eaC4146fE4eCa8F41c0C1cB2e471a1803",
    name: "Krypto Super K9",
    symbol: "Krypto ($uperK9",
    logo:
      "https://1zmn9mofwj.ufs.sh/f/FPA21S8nEiDqTQWf9T7GiV9KWlczLo8JQt6EAOeb1ZruFfkp",
    description: "Krypto SuperK9 Meme Coin...",
    chainId: 109,
    createdAt: "2025-01-15T22:02:46.000Z",
    updatedAt: "2025-09-18T13:36:41.574Z",
    website: "https://kryptosuperk9.com/",
    telegram: "https://t.me/KryptosuperK9",
    discord: "",
    twitter: "",
    youtube: "",
    latestTransactionTimestamp: "2025-10-10T22:08:21.000Z",
    marketCap: 1500000, // 1.5M
    volume24h: 230000, // 230k
    status: "ACTIVE", // ACTIVE | PRE_ACTIVE | FINALIZED
    isNSFW: false,
    _count: {
      liquidityEvents: 0,
    },
  },
  // ... thêm các token demo khác
];

/**
 * @openapi
 * /token/search:
 *   get:
 *     tags:
 *       - "Connect Wallet"
 *     summary: Tìm token (text + category + NSFW + MarketCap/Vol24h)
 *     description: |
 *       Search token phục vụ màn homepage.
 *       - Không gọi on-chain ở bước search, chỉ dùng DB/index.
 *       - Trả về thông tin cơ bản để render card + các chỉ số MarketCap, Vol24h, status.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: false
 *         schema:
 *           type: string
 *         description: "Từ khoá tìm kiếm (search theo name, symbol, address, creatorAddress). Bỏ trống = dùng category."
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           enum: [trending, marketcap, new, finalized, pre-active, all]
 *           default: trending
 *         description: >
 *           Tab category:
 *           - trending  : sort theo volume24h desc
 *           - marketcap : sort theo marketCap desc
 *           - new       : sort theo createdAt desc
 *           - finalized : chỉ token status = FINALIZED
 *           - pre-active: chỉ token status = PRE_ACTIVE
 *           - all       : không filter status đặc biệt
 *       - in: query
 *         name: includeNsfw
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: "Mặc định = false (ẩn token bị đánh dấu NSFW). true = hiển thị cả NSFW."
 *       - in: query
 *         name: mcapMin
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: "Market Cap tối thiểu (VD: 10000 = 10k)."
 *       - in: query
 *         name: mcapMax
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: "Market Cap tối đa."
 *       - in: query
 *         name: volMin
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: "24h Volume tối thiểu."
 *       - in: query
 *         name: volMax
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: "24h Volume tối đa."
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 20
 *         description: "Số bản ghi tối đa trả về."
 *       - in: query
 *         name: cursor
 *         required: false
 *         schema:
 *           type: string
 *         description: "Cursor phân trang (tuỳ DB implementation). Demo để null."
 *     responses:
 *       200:
 *         description: Danh sách token khớp với bộ lọc.
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
 *                       id:
 *                         type: string
 *                         example: "f5418597-bc74-..."
 *                       address:
 *                         type: string
 *                         example: "0xb3Ecb6..."
 *                       creatorAddress:
 *                         type: string
 *                         example: "0xC8C7088..."
 *                       name:
 *                         type: string
 *                         example: "Krypto Super K9"
 *                       symbol:
 *                         type: string
 *                         example: "Krypto ($uperK9"
 *                       logo:
 *                         type: string
 *                         example: "https://..."
 *                       description:
 *                         type: string
 *                       chainId:
 *                         type: integer
 *                         example: 109
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       website:
 *                         type: string
 *                         example: "https://kryptosuperk9.com"
 *                       telegram:
 *                         type: string
 *                         example: "https://t.me/KryptosuperK9"
 *                       discord:
 *                         type: string
 *                       twitter:
 *                         type: string
 *                       youtube:
 *                         type: string
 *                       latestTransactionTimestamp:
 *                         type: string
 *                         format: date-time
 *                       marketCap:
 *                         type: number
 *                         example: 1500000
 *                       volume24h:
 *                         type: number
 *                         example: 230000
 *                       status:
 *                         type: string
 *                         example: "ACTIVE"
 *                       isNSFW:
 *                         type: boolean
 *                         example: false
 *                       _count:
 *                         type: object
 *                         properties:
 *                           liquidityEvents:
 *                             type: integer
 *                             example: 0
 *                 nextCursor:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.get("/token/search", (req, res) => {
  const q = (req.query.q || "").toString().trim().toLowerCase();
  const category = (req.query.category || "trending").toString();
  const includeNsfw =
    String(req.query.includeNsfw || "false").toLowerCase() === "true";

  const limitRaw = parseInt(req.query.limit || "20", 10);
  const limit = Math.min(
    Math.max(Number.isNaN(limitRaw) ? 20 : limitRaw, 1),
    50
  );

  const mcapMin = req.query.mcapMin ? Number(req.query.mcapMin) : undefined;
  const mcapMax = req.query.mcapMax ? Number(req.query.mcapMax) : undefined;
  const volMin = req.query.volMin ? Number(req.query.volMin) : undefined;
  const volMax = req.query.volMax ? Number(req.query.volMax) : undefined;

  let items = TOKENS.slice();

  // 1) Text search (name, symbol, address, creatorAddress)
  if (q) {
    items = items.filter((t) => {
      return (
        (t.name && t.name.toLowerCase().includes(q)) ||
        (t.symbol && t.symbol.toLowerCase().includes(q)) ||
        (t.address && t.address.toLowerCase().includes(q)) ||
        (t.creatorAddress && t.creatorAddress.toLowerCase().includes(q))
      );
    });
  }

  // 2) NSFW filter (default: exclude)
  if (!includeNsfw) {
    items = items.filter((t) => !t.isNSFW);
  }

  // 3) MarketCap / Volume filters
  if (typeof mcapMin === "number" && !Number.isNaN(mcapMin)) {
    items = items.filter((t) => (t.marketCap ?? 0) >= mcapMin);
  }

  if (typeof mcapMax === "number" && !Number.isNaN(mcapMax)) {
    items = items.filter((t) => (t.marketCap ?? 0) <= mcapMax);
  }

  if (typeof volMin === "number" && !Number.isNaN(volMin)) {
    items = items.filter((t) => (t.volume24h ?? 0) >= volMin);
  }

  if (typeof volMax === "number" && !Number.isNaN(volMax)) {
    items = items.filter((t) => (t.volume24h ?? 0) <= volMax);
  }

  // 4) Category filter + sort
  switch (category) {
    case "finalized":
      items = items.filter((t) => t.status === "FINALIZED");
      break;
    case "pre-active":
      items = items.filter((t) => t.status === "PRE_ACTIVE");
      break;
    case "new":
      items = items.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
      break;
    case "marketcap":
      items = items.sort(
        (a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0)
      );
      break;
    case "trending":
      // trending = volume24h desc
      items = items.sort(
        (a, b) => (b.volume24h ?? 0) - (a.volume24h ?? 0)
      );
      break;
    case "all":
    default:
      // không filter thêm
      break;
  }

  // 5) Pagination (demo: chỉ dùng limit, không dùng cursor)
  items = items.slice(0, limit);

  res.json({
    items,
    nextCursor: null, // thực tế: sinh cursor dựa trên last id / createdAt
  });
});

module.exports = router;
