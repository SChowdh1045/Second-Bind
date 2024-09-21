import Header from './Header.tsx'
import BooksList from './BooksList.tsx'
import NewBook from './NewBook.tsx'
import Filter from './Filter.tsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

type Book = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  isbn: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filterCriteria, setFilterCriteria] = useState({
    title: '',
    author: '',
    genre: '',
    date: ''
  });
  
  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:8080/')
    setBooks(response.data.books)
  }

  // Fetch books on initial render
  useEffect(() => {
    fetchBooks()
  }, [])


  // Handle changes in filter input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFilterCriteria((prevCriteria) =>({
      ...prevCriteria,
      [name]: value
    }));
  };

  // Applying filter logic (returns an ARRAY of 'books' objects that match the filter criteria)
  // This block of code re-runs every time 'books' changes (through the 'fetchBooks' function) or when'filterCriteria' changes (through the 'handleFilterChange' function)
  const filteredBooks = books.filter(book => {
    return (
      (filterCriteria.title === '' || book.title.toLowerCase().includes(filterCriteria.title.toLowerCase())) &&
      (filterCriteria.author === '' || book.author.toLowerCase().includes(filterCriteria.author.toLowerCase())) &&
      (filterCriteria.genre === '' || book.genre.toLowerCase().includes(filterCriteria.genre.toLowerCase())) &&
      (filterCriteria.date === '' || book.publicationDate === filterCriteria.date)
    );
  });

  const handleExportJSON = async () => {
    try {
      // Send a GET request to your backend to trigger the export
      const response = await axios.get('http://localhost:8080/export/json', {
        responseType: 'blob', // Ensure we receive it as a file
      });

      // Creating a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'books.json'); // File name for download
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <>
      <Header/>
      <hr className='w-11/12 mx-auto'/>
      
      <div className='flex justify-evenly mt-12 mb-12'>
        <NewBook fetchBooks={fetchBooks}/>
        
        <div>
          <Filter handleFilterChange={handleFilterChange} filterCriteria={filterCriteria}/>
          <BooksList books={filteredBooks}/>
          
          <button onClick={handleExportJSON} className='flex mx-auto border-4 p-2 mt-10 font-bold text-slate-100 border-green-700 rounded-lg bg-green-600 hover:bg-green-500'>
            Export Books as JSON
          </button>
        </div>
      </div>
    </>
  )
}

export default App
