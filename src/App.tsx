import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Books from './Books';
import Home from './Home';
import Nav from './Nav';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className='App-content'>
          <Routes>
            <Route path='/books' element={<Books />}/>
            <Route path='/' element={<Home />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
