import React from "react";
import HomePage from "./pages/HomePage";
import { RecipePage } from "./pages/RecipePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css'

function app() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  )
}

export default app;