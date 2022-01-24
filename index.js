require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compress = require("compress");
const cookieParser = require("cookie-parser");
const db = require("./models");
const { errorHandler } = require("./controllers/error");
const userRoutes = require("./routes/Users");
const postRoutes = require("./routes/Posts");
const commentRoutes = require("./routes/Comments");
const authRoutes = require("./routes/Auth");
const { protectRoutes } = require("./controllers/auth");

// Create app
const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true,
  allowedHeaders:"Content-Type, Authorization, X-Requested-With",
}));

// Parse cookies to req.cookies
app.use(cookieParser());

// Compress
app.use(compress());

// Allows parsing of json body
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// Middleware: Routers
app.use("/auth", authRoutes);
app.use(protectRoutes);

app.use("/users", userRoutes)
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Catch-all route
app.all("*", (req, res, next) => {
  res.status(404).send("Page Not Found!!");
})

// Error handler middleware
app.use(errorHandler);

// Instantiate db
db.sequelize.sync().then(() =>{
  app.listen(PORT, () => console.log(`Running on port: ${PORT}`)); 
});
 