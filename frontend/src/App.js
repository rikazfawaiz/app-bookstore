import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<BookList/>}/>
          <Route path="/add" element={<AddBook/>}/>
          <Route path="/edit/:id" element={<EditBook/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
