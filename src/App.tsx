import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Books from './Books';
import Home from './Home';
import Nav from './Nav';
import NotFound from './NotFound';
import Login from './Login';
import { ILogin } from './Login/Login';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
  const [ loginError, setLoginError ] = useState<string|null>(null);

  function onLogin(login: ILogin) {
    if(login.user === 'test' && login.password === 'test') {
      setLoginError(null);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setLoginError('Bad credentials');
      setIsLoggedIn(false);
    }
  }

  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}/>
      <div className='App-content'>
        <Routes>
          <Route path='/books' element={isLoggedIn ? <Books /> : <Navigate to='/login'/>}/>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/login'/>}/>
          <Route path='/login' element={
            <>
              { loginError && <div className='error'>{loginError}</div>}
              <Login onLogin={onLogin} />
            </>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
