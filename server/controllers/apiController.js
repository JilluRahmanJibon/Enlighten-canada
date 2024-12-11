// controllers/apiController.js
const apiService = require('../services/apiService');

/**
 * Controller to handle fetching news based on category.
 */
async function getNews(req, res, next) {
    const category = req.query.category || 'general';
    try {
        const news = await apiService.fetchNews(req,res);
        res.json(news);
    } catch (error) {
        next(error);
    } finally{
        console.log(`Url: ${req.url || ""}`)
    }
}

/**
 * Controller to handle fetching blogs based on category.
 */
async function getBlogs(req, res, next) {
    const category = req.query.category || 'technology';
    try {
        const blogs = await apiService.fetchBlogs(category);
        res.json(blogs);
    } catch (error) {
        next(error);
    } finally{
        console.log(`Url: ${req.url || ""}`)
    }
}

module.exports = {
    getNews,
    getBlogs,
};
