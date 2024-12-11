// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Define route for fetching news
router.get('/news', apiController.getNews);

// Define route for fetching blogs
router.get('/blogs', apiController.getBlogs);

module.exports = router;
