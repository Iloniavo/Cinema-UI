import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie from './components/Movie';
import Broadcasts from './components/Broadcasts';
import Rooms from './components/Rooms';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Login from './components/Login';
  
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/> }/>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movie/>} />
        <Route path='/movie/:title' element={<Movie/>} />
        <Route path='/broadcast/:id' element={<Broadcasts/>}/>
        <Route path='/broadcasts/movies/:date' element={<Broadcasts/>}/>
        <Route path='/categories/:category' element={<Movie/>} />
        <Route path='/broadcasts' element={<Broadcasts/>} />
        <Route path='/rooms' element={<Rooms/>} />
      </Routes>
    </Router>
  );
}
  
export default App