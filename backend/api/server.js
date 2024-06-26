const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors')
dotenv.config({ path: "./.env" });

const connectDB = require("../config/db");
const errorHandler = require("../middleware/error");

const app = express();
app.use(cors());
app.use(express.json());
connectDB(); // Connect to databse

// API Routes
app.use("/api/auth", require("../routes/auth"));
app.use("/api/private", require("../routes/private"));
app.use("/api/sticker", require("../routes/sticker"));
app.use("/api/game", require("../routes/game"));;

// --------------------------DEPLOYMENT------------------------------


app.get("/", (req, res) => {
  res.send("API is running");
});


// --------------------------DEPLOYMENT------------------------------

// Error Handler Middleware (Should be at the end of all middlewares)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);

// Handling server errors with clean error messages
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});