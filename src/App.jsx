import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Minigame1 from './components/Minigame1';
import Minigame2 from './components/Minigame2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/mini-game1" element={<Minigame1/>}/>
        <Route path="/mini-game2" element={<Minigame2/>}/>
      </Routes>
    </Router>
  );
}

export default App;

