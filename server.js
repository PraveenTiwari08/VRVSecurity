const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is Running");
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
