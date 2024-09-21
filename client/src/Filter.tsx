type handleFilterChangeProp = {
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  
  filterCriteria: {
    title: string,
    author: string,
    genre: string,
    date: string
  }
}

function Filter({ handleFilterChange, filterCriteria }: handleFilterChangeProp) {
    
  
  return (
    <>
      <h1 className="mb-1 font-bold text-lg">Filter Books</h1>
      
      <div className="flex justify-evenly mb-4">
        <div>
          <label htmlFor="titleFilter" className="font-semibold">Title:</label>
          <input
            type="text"
            id="titleFilter"
            name="title"
            value={filterCriteria.title}
            onChange={handleFilterChange}
            className="ml-1 rounded-md ring-1 ring-black-100"
          />
        </div>

        <div className="ml-5">
          <label htmlFor="authorFilter" className="font-semibold">Author:</label>
          <input
            type="text"
            id="authorFilter"
            name="author"
            value={filterCriteria.author}
            onChange={handleFilterChange}
            className="ml-1 rounded-md ring-1 ring-black-100"
          />
        </div>

        <div className="ml-5">
          <label htmlFor="genreFilter" className="font-semibold">Genre:</label>
          <select name="genre" value={filterCriteria.genre} onChange={handleFilterChange} className="ml-1 rounded-md ring-1 ring-black-100">
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
        </div>

        <div className="ml-5">
          <label htmlFor="date" className="font-semibold">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={filterCriteria.date}
            onChange={handleFilterChange}
            className="ml-1 rounded-md ring-1 ring-black-100 pl-1"
          />
        </div>
      </div>
    </>
    )
}

export default Filter