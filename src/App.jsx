import React, { useEffect, useState } from 'react'
import './App.css'
import {gameSubject, initGame, resetGame} from './Game'
import { BrowserRouter  as  Router,Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import GameScreen from './Components/GameScreen/GameScreen';


function App() {
  
  return (
    <div className="container">
      <Router>
       <Routes>
            <Route path="/game" element={<GameScreen />}/>
            <Route exact path="/" element={<Landing />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
