const express = require('express');
import { Request, Response } from 'express';  // Only for types
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 8080; // the server will run on port 8080 if no port is specified

const corsOptions = {
  origin: 'http://localhost:5173' // the url of the frontend application that is allowed to connect to this server
};

app.use(cors(corsOptions));
app.use(express.json()); // express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads


// Initializes SQLite3 database (creates a new SQLite file if it doesn't exist)
const db = new sqlite3.Database('./books.db', (err: Error) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a table if it doesn't exist already
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    publicationDate TEXT NOT NULL,
    isbn TEXT NOT NULL UNIQUE
  )
`, (err: Error) => {
  if (err) {
    console.error('Error creating books table:', err.message);
  } else {
    console.log('Books table created or already exists.');
  }
});


// REST API endpoints
// GET request to retrieve all books
app.get('/', (req: Request, res: Response) => {
  db.all('SELECT * FROM books', [], (err: Error, rows: any[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ books: rows });
    }
  });
});

// POST request to add a new book
app.post('/', (req: Request, res: Response) => {
  const { title, author, genre, publicationDate, isbn } = req.body;

  db.run(`
    INSERT INTO books (title, author, genre, publicationDate, isbn)
    VALUES (?, ?, ?, ?, ?)
  `, [title, author, genre, publicationDate, isbn], function (err: Error) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'New book added!' });
    }
  });
});

// Export all books as a JSON file
app.get('/export/json', (req: Request, res: Response) => {
  const query = 'SELECT * FROM books';

  db.all(query, [], (err: Error, rows: any[]) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve data' });
    }

    // Send the data as a JSON response
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(rows, null, 2)); // Pretty print JSON
  });
});


// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
