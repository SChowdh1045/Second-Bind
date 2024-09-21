import { useState } from 'react';
import axios from 'axios';

// The type definition defines the shape of the props object, not the dereferenced object.
function NewBook({fetchBooks}: {fetchBooks: () => void}) {
  // State to store form input values
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [isbn, setIsbn] = useState('');

  const [error, setError] = useState('');

  // Validation functions
  const validateAuthorName = (author: string): boolean => {
    const authorRegex = /^[A-Za-z\s]+$/; // Checks that the input consists of letters and spaces only
    return authorRegex.test(author);
  };

  const validateISBN = (isbn: string): boolean => {
    const isbnRegex = /^(97(8|9))?\d{9}(\d|X)$/; // For both ISBN-10 and ISBN-13
    return isbnRegex.test(isbn);
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent form from refreshing the page
    
    // If any field is empty, display an alert and return early
    if (!title || !author || !genre || !publicationDate || !isbn) {
      setError('Please fill out all fields.');
      return;
    }

    if (validateAuthorName(author)) {
      setAuthor(author.split(' ').map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(' '));
    } else {
      setError('Author name must consist of letters and spaces only');
      return;
    }

    if (!validateISBN(isbn)) {
      setError('Invalid ISBN');
      return;
    }

    // If validation passes
    setError('');

    try {
      await axios.post('http://localhost:8080/', {
        title,
        author,
        genre,
        publicationDate,
        isbn
      });

      // Clears the form after successful submission
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate('');
      setIsbn('');
      
      fetchBooks(); // Fetches the updated list of books from the server and updates the state in App.tsx
      alert("Book added successfully!");
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    // 
    <div className='border-8 border-zinc-800 p-6 rounded-xl px-20 bg-gradient-to-br from-[#275f54] from-0% via-[#38f3ff] via-60% to-[#f01df8] to-100%'>
      <h1 className='text-3xl text-center mb-3 font-bold'>Add a book! 📗</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className='font-semibold'>Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-1 mb-4 border border-gray-400 rounded-md"
        /><br />
        
        <label htmlFor="author" className='font-semibold'>Author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-1 mb-4 border border-gray-400 rounded-md"
        /><br />
        
        <label htmlFor="genre" className='font-semibold'>Genre</label>
        <select id="genre" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-1 mb-4 border border-gray-400 rounded-md">
          <option value="">All</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Fiction">Fiction</option>
          <option value="Folklore">Folklore</option>
          <option value="Horror">Horror</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
        </select>
          <br />
        
        <label htmlFor="publicationDate" className='font-semibold'>Publication Date</label>
        <input
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className="w-full p-1 pl-2 mb-4 border border-gray-400 rounded-md"
          /><br />
        
        <label htmlFor="isbn" className='font-semibold'>ISBN</label>
        <input
          type="text"
          name="isbn"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="w-full p-1 mb-4 border border-gray-400 rounded-md"
        /><br />
        
        {error && <p className='text-red-600 text-center font-semibold'>{error}</p>}
        
        <br />
        
        <button type="submit" className='flex mx-auto py-3 px-5 font-bold text-slate-700 bg-amber-300 rounded-lg border-4 border-amber-400 hover:bg-amber-200'>Add Book</button>
      </form>
    </div>
  );
}

export default NewBook;
