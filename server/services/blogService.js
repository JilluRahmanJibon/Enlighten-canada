const pool = require('../db/db');

const blogService = {
  // Fetch all blogs, with optional filtering by title, category, or tags (case-insensitive), and pagination
  async getAllBlogs(req, res, next) {
    let connection;
    const { title, category, tag, page = 1, limit = 10 } = req.query; // Get search and pagination parameters from the query string
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    try {
      connection = await pool.getConnection();

      let query = `
        SELECT blogs.*, users.name AS owner_username 
        FROM blogs 
        JOIN users ON blogs.user_id = users.id
        WHERE 1 = 1
      `;
      let countQuery = `
        SELECT COUNT(*) AS total 
        FROM blogs 
        WHERE 1 = 1
      `;
      const queryParams = [];
      const countParams = [];

      if (title) {
        query += ` AND LOWER(blogs.title) LIKE LOWER(?)`;
        countQuery += ` AND LOWER(blogs.title) LIKE LOWER(?)`;
        queryParams.push(`%${title}%`);
        countParams.push(`%${title}%`);
      }

      if (category) {
        query += ` AND LOWER(blogs.category) = LOWER(?)`;
        countQuery += ` AND LOWER(blogs.category) = LOWER(?)`;
        queryParams.push(category);
        countParams.push(category);
      }

      if (tag) {
        query += ` AND FIND_IN_SET(LOWER(?), LOWER(blogs.tags)) > 0`;
        countQuery += ` AND FIND_IN_SET(LOWER(?), LOWER(blogs.tags)) > 0`;
        queryParams.push(tag);
        countParams.push(tag);
      }

      // Append LIMIT and OFFSET for pagination
      query += ` LIMIT ? OFFSET ?`;
      queryParams.push(parseInt(limit), offset);

      // Execute the queries
      const [rows] = await connection.query(query, queryParams);
      const [countRows] = await connection.query(countQuery, countParams);

      const total = countRows[0].total;
      const totalPages = Math.ceil(total / limit);

      // Send the response with pagination info
      res.status(200).json({
        blogs: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          pageSize: parseInt(limit),
        },
      });
    } catch (error) {
      next(error);
    } finally {
      if (connection) connection.release();
      console.log(`Route accessed: ${req.originalUrl}`);
    }
  },

  // Fetch a blog by ID
  async getBlogById(req, res, next) {
    const { id } = req.params;
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(`
        SELECT blogs.*, users.name AS owner_username 
        FROM blogs 
        JOIN users ON blogs.user_id = users.id
        WHERE blogs.id = ?
      `, [id]);

      if (rows.length === 0) {
        res.status(404).json({ error: 'Blog not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      next(error);
    } finally {
      if (connection) connection.release();
      console.log(`Route accessed: ${req.originalUrl}`);
    }
  },

  // Create a new blog with categories/tags
  async createBlog(req, res, next) {
    const { title, subtitle , short_description, content, author, user_id, img, category, tags, owner_username } = req.body;  // Added category and tags
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO blogs (title, subtitle, short_description, content, author, user_id, img, category, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, subtitle, short_description, content, author, user_id, img, category, tags]
      );
      
      res.status(201).json({ id: result.insertId, title, content, author, user_id, img, category, tags });
    } catch (error) {
      next(error);
    } finally {
      if (connection) connection.release();
      console.log(`Route accessed: ${req.originalUrl}`);
    }
  },

  // Update an existing blog
  async updateBlog(req, res, next) {
    const { id } = req.params;
    const { title, content, author, user_id, img, category, tags } = req.body; // Added category and tags
    let connection;
    try {
      connection = await pool.getConnection();
      
      const [currentBlog] = await connection.query('SELECT * FROM blogs WHERE id = ?', [id]);

      if (currentBlog.length === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      const existingBlog = currentBlog[0];

      const updatedTitle = title || existingBlog.title;
      const updatedContent = content || existingBlog.content;
      const updatedAuthor = author || existingBlog.author;
      const updatedUserId = user_id || existingBlog.user_id;
      const updatedImg = img || existingBlog.img;
      const updatedCategory = category || existingBlog.category;
      const updatedTags = tags || existingBlog.tags;

      const [result] = await connection.query(
        'UPDATE blogs SET title = ?, content = ?, author = ?, user_id = ?, img = ?, category = ?, tags = ? WHERE id = ?', 
        [updatedTitle, updatedContent, updatedAuthor, updatedUserId, updatedImg, updatedCategory, updatedTags, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
      next(error);
    } finally {
      if (connection) connection.release();
      console.log(`Route accessed: ${req.originalUrl}`);
    }
  },

  // Delete a blog
  async deleteBlog(req, res, next) {
    const { id } = req.params;
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.query('DELETE FROM blogs WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Blog not found' });
      } else {
        res.status(200).json({ message: 'Blog deleted successfully' });
      }
    } catch (error) {
      next(error);
    } finally {
      if (connection) connection.release();
      console.log(`Route accessed: ${req.originalUrl}`);
    }
  },
};

module.exports = blogService;
