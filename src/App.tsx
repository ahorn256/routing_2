import { Route, Routes } from 'react-router-dom';
import './App.css';
import Books from './Books';
import Home from './Home';
import Nav from './Nav';
import NotFound from './NotFound';
import FormDialog from './Books/FormDialog';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className='App-content'>
        <Routes>
          <Route path='/books' element={<Books />}>
            <Route path='edit/:id' element={<FormDialog />} />
            <Route path='new/' element={<FormDialog />} />
          </Route>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
