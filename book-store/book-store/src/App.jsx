import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from "./pages/BookList";
import BookForm from "./pages/BookForm";
import BookDetails from "./pages/BookDetails";
import Nav from "./components/Nav";


export default function App() {
  return (
    <div>
      <Nav />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </div>
  );
}
