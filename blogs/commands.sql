CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('John Doe', 'https://example.com/first-blog', 'My First Blog Post', 10),
       ('Jane Smith', 'https://example.com/second-blog', 'My Second Blog Post', 5);
