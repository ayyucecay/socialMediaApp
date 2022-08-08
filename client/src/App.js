import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route exact path='/login' element={<AuthRoute><Login /></AuthRoute>}/>
            <Route exact path='/register' element={<AuthRoute><Register /></AuthRoute>}/>
            <Route exact path='/posts/:postId' element={<SinglePost/>}/> 
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
