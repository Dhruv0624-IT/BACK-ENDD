import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/bookService';
import { Link, useNavigate } from 'react-router-dom';

export default function BookList(){
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    const data = await getBooks(q ? { q } : {});
    setBooks(data);
  };

  useEffect(()=>{ load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    await deleteBook(id);
    setBooks(books.filter(b => b._id !== id));
  };

  return (
    <div>
      <h2>Books</h2>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
        <button onClick={load} style={{ marginLeft:8 }}>Search</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Price</th><th>In Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id} style={{ borderTop: '1px solid #ddd' }}>
              <td><Link to={`/books/${b._id}`}>{b.title}</Link></td>
              <td>{b.author}</td>
              <td>{b.price?.toFixed?.(2) ?? b.price}</td>
              <td>{b.inStock ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={()=>navigate(`/books/edit/${b._id}`)}>Edit</button>
                <button onClick={()=>handleDelete(b._id)} style={{ marginLeft:6 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
