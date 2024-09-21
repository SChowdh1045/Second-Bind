type Book = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  isbn: string;
}

type BooksListProps = {
  books: Book[];
}

// The type definition defines the shape of the props object, not the dereferenced object.
function BooksList({books}: BooksListProps) {

  return (
    <div className="flex justify-center">
      <table className="border-4 border-slate-500 rounded-lg shadow-xl border-collapse">
        <thead>
          <tr className="bg-orange-200">
            <th className="border-2 border-slate-300 py-1 px-3">Title</th>
            <th className="border-2 border-slate-300 py-1 px-3">Author</th>
            <th className="border-2 border-slate-300 py-1 px-3">Genre</th>
            <th className="border-2 border-slate-300 py-1 px-3">Publication Date</th>
            <th className="border-2 border-slate-300 py-1 px-3">ISBN</th>
          </tr>
        </thead>
        
        <tbody className="">
          {books.length === 0 ? (
            <tr className="odd:bg-orange-50">
              <td colSpan={5} className="text-center">No books found</td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr key={index} className="text-center odd:bg-orange-50 even:bg-orange-100">
                <td className="border py-1 px-3">{book.title}</td>
                <td className="border py-1 px-3">{book.author}</td>
                <td className="border py-1 px-3">{book.genre}</td>
                <td className="border py-1 px-3">{book.publicationDate}</td>
                <td className="border py-1 px-3">{book.isbn}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
      
  );
}

export default BooksList