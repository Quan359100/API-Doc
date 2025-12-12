const express = require("express");
const app = express();
app.use(express.json());

const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(require("./routes/auth"));
app.use(require("./routes/homepage"));
app.use(require("./routes/token"));
app.use(require("./routes/trading"));
app.use(require("./routes/chat"));
app.use(require("./routes/profile"));
app.use(require("./routes/leaderboard"));
app.use(require("./routes/referrals"));
app.use(require("./routes/reward"));
app.use(require("./routes/points"));
app.use(require("./routes/create"));
app.use(require("./routes/stake"));
app.use(require("./routes/thread"));


app.listen(4000, () => console.log("Server running on http://localhost:4000"));
