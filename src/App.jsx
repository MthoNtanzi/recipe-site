import React from "react";
import HomePage from "./pages/HomePage";
import { RecipePage } from "./pages/RecipePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./Components/Navbar";
import './App.css'

function App() {
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  )
}

export default App;