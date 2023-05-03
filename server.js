const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

// Load env vars
dotenv.config({ path: "./config/.env" });

const app = express();

//cors policy
app.use(
  cors({
    origin: "*",
  })
);

// Connect to database
connectDB();

app.use("/images", express.static("public"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route files
const auth = require("./routes/auth");
const user = require("./routes/user");
const userType = require("./routes/userType");

// mount routers
app.use("/api/V1/auth", auth);
app.use("/api/v1", user);
app.use("/api/v1/user", userType);

const PORT = 8000;
app.listen(PORT, console.log(`port is running ${PORT}`));
