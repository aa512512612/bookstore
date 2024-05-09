import React, { useState, useEffect } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://softwium.com/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="container">
      <h2>Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow cursor-pointer transition duration-300 hover:bg-gray-200 hover:shadow-lg"
              onClick={() => {
                // Handle clicking on the book card, you can navigate to a detailed view or any other action
                console.log("Clicked on book:", book.title);
              }}
            >
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p>Authors: {book.authors.join(", ")}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Page Count: {book.pageCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
