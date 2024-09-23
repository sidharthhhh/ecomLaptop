const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express()
const  authRouter = require("./routes/auth/auth-routes");

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );
  
  app.use(cookieParser());
  app.use(express.json());
  // app.use("/auth", authRoutes);
  app.use("/api/auth", authRouter);
  const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));