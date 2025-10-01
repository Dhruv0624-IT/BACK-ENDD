import React, { useEffect, useState } from 'react';
import { getBook } from '../api/bookService';
import { useParams, Link } from 'react-router-dom';

export default function BookDetails(){
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(()=> { getBook(id).then(setBook); }, [id]);

  if (!book) return <div>Loading...</div>;
  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Price:</strong> {book.price}</p>
      <p><strong>In stock:</strong> {book.inStock ? 'Yes' : 'No'}</p>
      <p><strong>Tags:</strong> {(book.tags || []).join(', ')}</p>
      <p>{book.description}</p>
      <Link to={`/books/edit/${book._id}`}>Edit</Link>
    </div>
  );
}
