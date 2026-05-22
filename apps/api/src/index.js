const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoute = require("./routes/health.route");
const usersRoute = require("./routes/users.route");
const dbRoute = require("./routes/db.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoute);
app.use("/users", usersRoute);
app.use("/db", dbRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
