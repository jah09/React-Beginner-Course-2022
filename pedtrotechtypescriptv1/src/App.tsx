import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Main } from './pages/main/main';
import { Login } from './pages/Login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
function App() {
  return (
    <div className="App">
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createpost' element={<CreatePost/>}/>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
