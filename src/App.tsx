import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Books from './Books';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/books' element={<Books />}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
