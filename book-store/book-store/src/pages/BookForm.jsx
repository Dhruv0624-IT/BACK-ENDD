import React, { useEffect, useState } from 'react';
import { createBook, getBook, updateBook } from '../api/bookService';
import { useNavigate, useParams } from 'react-router-dom';

const empty = { title:'', author:'', description:'', isbn:'', price:0, inStock:true, tags: '' };

export default function BookForm(){
  const { id } = useParams();
  const [data, setData] = useState(empty);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getBook(id).then(b => setData({...b, tags: (b.tags || []).join(', ')}));
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...data, tags: data.tags ? data.tags.split(',').map(s => s.trim()) : [] };
    if (id) await updateBook(id, payload);
    else await createBook(payload);
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={submit} style={{ maxWidth: 600 }}>
        <div>
          <label>Title</label><br />
          <input required value={data.title} onChange={e=>setData({...data, title:e.target.value})} />
        </div>
        <div>
          <label>Author</label><br />
          <input required value={data.author} onChange={e=>setData({...data, author:e.target.value})} />
        </div>
        <div>
          <label>Description</label><br />
          <textarea value={data.description} onChange={e=>setData({...data, description:e.target.value})} />
        </div>
        <div>
          <label>ISBN</label><br />
          <input value={data.isbn} onChange={e=>setData({...data, isbn:e.target.value})} />
        </div>
        <div>
          <label>Price</label><br />
          <input type="number" step="0.01" value={data.price} onChange={e=>setData({...data, price:parseFloat(e.target.value||0)})} />
        </div>
        <div>
          <label>In Stock</label>
          <input type="checkbox" checked={data.inStock} onChange={e=>setData({...data, inStock:e.target.checked})} />
        </div>
        <div>
          <label>Tags (comma separated)</label><br />
          <input value={data.tags} onChange={e=>setData({...data, tags:e.target.value})} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={()=>navigate('/')} style={{ marginLeft:8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
