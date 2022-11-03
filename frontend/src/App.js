import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Authorization from './components/Authorization';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route 
          path="/" element={
            <Authorization>
              <ProductList/>
            </Authorization>
          }/>
          <Route path="/books" element={
            <Authorization>
              <BookList/>
            </Authorization> 
          }/>
          <Route path="/books/add" element={
            <Authorization>
              <AddBook/>
            </Authorization> 
          }/>
          <Route path="/books/edit/:id" element={
            <Authorization>
              <EditBook/>
            </Authorization> 
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
