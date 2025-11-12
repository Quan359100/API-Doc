// routes/home.js
const express = require("express");
const router = express.Router();





/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Homepage -> Navbar -> Connect Wallet]
 *     summary: Khởi tạo đăng nhập bằng ví (Issue Challenge)
 *     description: "FE gửi địa chỉ ví, BE sinh challenge/nonce để FE yêu cầu ví ký."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [walletAddress]
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
  if (!walletAddress) return res.status(400).json({ error: "Missing walletAddress" });

  const nonce = Math.random().toString(36).slice(2, 10);
  const challenge = `Sign to login: nonce=${nonce}; domain=bondle.fun; wallet=${walletAddress}`;
  res.json({ challenge, nonce, domain: "bondle.fun", expiresIn: 120 });
});

/**
 * @openapi
 * /auth/verify:
 *   post:
 *     tags: [Homepage -> Navbar -> Connect Wallet]
 *     summary: Xác thực chữ ký & tạo session (Verify & Create Session)
 *     description: "FE gửi chữ ký của ví đã ký challenge, BE verify và cấp JWT/session."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [walletAddress, signature]
 *             properties:
 *               walletAddress: { type: string, example: "9wBdT3WJz1txyBq3bKUTznV..." }
 *               signature: { type: string, example: "0xabc123..." }
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwtToken: { type: string, example: "eyJhbGciOi..." }
 *                 userProfile:
 *                   type: object
 *                   properties:
 *                     walletAddress: { type: string, example: "9wBdT3..." }
 *                     createdAt: { type: string, format: date-time }
 *                 expiresInSec: { type: integer, example: 3600 }
 *       400:
 *         description: Thiếu tham số
 *       401:
 *         description: Chữ ký không hợp lệ hoặc nonce hết hạn
 */
router.post("/auth/verify", (req, res) => {
  const { walletAddress, signature } = req.body || {};
  if (!walletAddress || !signature) return res.status(400).json({ error: "Missing parameters" });

  const jwtToken = "eyJhbGciOi...";
  const userProfile = { walletAddress, createdAt: new Date().toISOString() };
  res.json({ jwtToken, userProfile, expiresInSec: 3600 });
});

/**
 * @openapi
 * /auth/session:
 *   get:
 *     tags: [Homepage -> Navbar -> Connect Wallet]
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
 *                 authenticated: { type: boolean, example: true }
 *                 address: { type: string, example: "9wBdT3..." }
 *                 expiresInSec: { type: integer, example: 1800 }
 *       401:
 *         description: Session hết hạn hoặc không hợp lệ
 */
router.get("/auth/session", (_req, res) => {
  res.json({ authenticated: true, address: "9wBdT3...", expiresInSec: 1800 });
});

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags: [Homepage -> Navbar -> Connect Wallet]
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
 *                 jwt: { type: string, example: "eyJhbGciOi..." }
 *                 expiresInSec: { type: integer, example: 3600 }
 *       401:
 *         description: Refresh token không hợp lệ
 */
router.post("/auth/refresh", (_req, res) => {
  res.json({ jwt: "eyJhbGciOi...", expiresInSec: 3600 });
});

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags: [Homepage -> Navbar -> Connect Wallet]
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
 *                 ok: { type: boolean, example: true }
 */
router.post("/auth/logout", (_req, res) => {
  res.json({ ok: true });
});

// ======= Token Search (by name & symbol only) =======
// Demo data; thực tế hãy truy vấn DB + có index cho name/symbol
const TOKENS = [
  { address: "4nF12...xyz", name: "Kuma Inu", symbol: "KUMA", image: "", price: 0.000014 },
  { address: "6Pt89...abc", name: "Baby Kuma", symbol: "BKUMA", image: "", price: 0.000002 },
  { address: "9Qw77...def", name: "Bonk",     symbol: "BONK", image: "", price: 0.0000012 },
];

/**
 * @openapi
 * /token/search:
 *   get:
 *     tags: ["Homepage -> Search -> Search by Textfield"]
 *     summary: Tìm token theo text (name/symbol)
 *     description: "Chỉ hỗ trợ tìm theo tên (name) hoặc ký hiệu (symbol). Không gọi onchain ở bước search."
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         description: "Từ khoá tìm kiếm. VD: 'kuma' hoặc 'KUMA'"
 *       - in: query
 *         name: by
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, symbol]
 *           default: name
 *         description: "Chọn trường để tìm: name | symbol"
 *       - in: query
 *         name: limit
 *         required: false
 *         schema: { type: integer, minimum: 1, maximum: 50, default: 20 }
 *         description: "Số bản ghi tối đa trả về"
 *     responses:
 *       200:
 *         description: Danh sách token khớp
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
 *                       address: { type: string, example: "4nF12...xyz" }
 *                       name:    { type: string, example: "Kuma Inu" }
 *                       symbol:  { type: string, example: "KUMA" }
 *                       image:   { type: string, example: "https://cdn.example.com/kuma.png" }
 *                       price:   { type: number, example: 0.000014 }
 *                 nextCursor:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Thiếu tham số q
 */
router.get("/token/search", (req, res) => {
  const q = (req.query.q || "").toString().trim();
  const by = (req.query.by || "name").toString();
  const limitRaw = parseInt(req.query.limit || "20", 10);

  if (!q) return res.status(400).json({ error: "Missing query param q" });

  const limit = Math.min(Math.max(Number.isNaN(limitRaw) ? 20 : limitRaw, 1), 50);
  const kw = q.toLowerCase();

  const items = TOKENS.filter(t => {
    if (by === "symbol") return t.symbol.toLowerCase().includes(kw);
    return t.name.toLowerCase().includes(kw);
  })
    .slice(0, limit)
    .map(t => ({
      address: t.address,
      name: t.name,
      symbol: t.symbol,
      image: t.image || "",
      price: t.price
    }));

  res.json({ items, nextCursor: null });
});


module.exports = router;
