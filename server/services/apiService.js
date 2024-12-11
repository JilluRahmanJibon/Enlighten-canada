// services/apiService.js
const axios = require('axios');

// Constants for API endpoints and keys
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const MEDIUM_API_KEY = process.env.MEDIUM_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const MEDIUM_API_URL = 'https://api.medium.com/v1/tags';

/**
 * Fetch news articles from News API based on the given category.
 * @param {string} category - The category of news to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of news articles.
 */
async function fetchNews(req, res) {
    const category = req.query.category || 'general';
    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                apiKey: NEWS_API_KEY,
                category: category,
                country: 'us',
            },
        });
         res.status(200).json({
            acknoladgement: true,
            message: "ok",
            data: response.data.articles || []
        })
    } catch (error) {
        console.error('Error fetching news:', error.message);
        throw new Error('Failed to fetch news articles.');
    }
}

/**
 * Fetch blog posts from Medium API based on the given category.
 * @param {string} category - The category of blogs to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of blog posts.
 */
async function fetchBlogs(category) {
    try {
        const url = `${MEDIUM_API_URL}/${category}/latest`;
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${MEDIUM_API_KEY}` },
        });
        console.log(res.data)
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        throw new Error('Failed to fetch blog posts.');
    }
}

module.exports = {
    fetchNews,
    fetchBlogs,
};
