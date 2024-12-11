const blogService = require('../services/blogService');

exports.getAllBlogs = async (req, res, next) => {
    try {
      await blogService.getAllBlogs(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  
  // Fetch a blog by ID
  exports.getBlogById = async (req, res, next) => {
    try {
      await blogService.getBlogById(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  
  // Create a new blog
  exports.createBlog = async (req, res, next) => {
    try {
      await blogService.createBlog(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  
  // Update a blog by ID
  exports.updateBlog = async (req, res, next) => {
    try {
      await blogService.updateBlog(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  
  // Delete a blog by ID
  exports.deleteBlog = async (req, res, next) => {
    try {
      await blogService.deleteBlog(req, res, next);
    } catch (error) {
      next(error);
    }
  };