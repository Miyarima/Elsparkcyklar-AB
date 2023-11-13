-- Use the newly created database
USE Elsparkcyklar;

-- Create a table to store information about books
CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    publication_year INT
);

-- Insert some sample data into the 'books' table
INSERT INTO books (book_id, title, author, publication_year) VALUES
(1, 'The Catcher in the Rye', 'J.D. Salinger', 1951),
(2, 'To Kill a Mockingbird', 'Harper Lee', 1960),
(3, '1984', 'George Orwell', 1949),
(4, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925),
(5, 'Pride and Prejudice', 'Jane Austen', 1813);