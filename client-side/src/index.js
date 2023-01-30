import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResults from './Pages/searchResults'


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Router>

      <Routes>
        <Route path="/" element={<SearchResults />} />
      </Routes>

    </Router>
  </React.StrictMode>
);


reportWebVitals();
