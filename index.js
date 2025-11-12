// index.js
const express = require("express");
const app = express();
app.use(express.json());

const path = require("path");
app.use("/brand", express.static(path.join(__dirname, "public/brand")));

const { swaggerUi, specs } = require("./swagger");

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customSiteTitle: "Pumpfun Clone Docs",
    swaggerOptions: {
      persistAuthorization: true,
      deepLinking: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      docExpansion: "none",
      filter: true,
    },
  })
);

// JSON spec (phục vụ ReDoc)
app.get("/openapi.json", (_req, res) => res.json(specs));

// ReDoc (đẹp, theo nhóm tag)
app.get("/redoc", (_req, res) => {
  res.send(`<!doctype html>
  <html><head><meta charset="utf-8"/>
    <title>Pumpfun Clone – ReDoc</title>
    <style>body{margin:0;background:#0b1811}</style>
  </head><body>
    <redoc spec-url="/openapi.json"></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
  </body></html>`);
});

app.get("/_health", (_req, res) => res.json({ ok: true }));

// Mount routes (Homepage → Navbar → Connect Wallet)
const homeRoutes = require("./routes/home");
app.use("/", homeRoutes);

// ❌ Bỏ mount token routes (đã xoá)
// const tokenRoutes = require("./routes/token");
// app.use("/", tokenRoutes);

app.listen(4000, () => {
  console.log("Docs UI: http://localhost:4000/api-docs");
  console.log("ReDoc:   http://localhost:4000/redoc");
});
