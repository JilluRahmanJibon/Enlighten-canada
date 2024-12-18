-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reset_token VARCHAR(255) DEFAULT NULL,
    reset_token_expiry DATETIME DEFAULT NULL
);


-- Blogs Table
CREATE TABLE blogs (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    subtitle varchar(255) DEFAULT NULL,
    short_description text DEFAULT NULL,
    content text NOT NULL,
    author varchar(255) NOT NULL,
    user_id int NOT NULL,
    img varchar(255) DEFAULT NULL,
    category varchar(100) DEFAULT NULL,
    tags varchar(255) DEFAULT NULL,
    owner_username varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
);


-- Conversations Table
CREATE TABLE conversations (
    id VARCHAR(255) PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id VARCHAR(255) NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);
