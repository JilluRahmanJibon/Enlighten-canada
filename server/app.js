const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
require("dotenv").config(); // Load environment variables
const cookieParser = require("cookie-parser");

const app = express();

// ROUTES
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes"); // Import blog routes
const apiRoutes = require("./routes/apiRoutes");
const chatRoutes = require('./routes/chatRoutes');

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // Must be before any routes that depend on cookies
// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client URL
    credentials: true, // Allow cookies and headers
  })
);
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use("/api/users", userRoutes); // All user-related routes
app.use("/api/blogs", blogRoutes);
app.use("/api/news", apiRoutes);
app.use('/api/chat', chatRoutes);





/* connection establishment */
app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "The request is OK",
    });
  } catch (err) {
    next(err);
  } finally {
    //console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
});

/* export application */
module.exports = app;
