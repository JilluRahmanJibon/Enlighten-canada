const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Route to fetch all blogs
router.get('/', blogController.getAllBlogs);

// Route to fetch a single blog by ID
router.get('/:id', blogController.getBlogById);

// Route to create a new blog
router.post('/', blogController.createBlog);

// Route to update a blog by ID
router.put('/:id', blogController.updateBlog);

// Route to delete a blog by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
