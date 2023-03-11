import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './Components/Header';
import Footer  from './Components/Footer';  
import MainPage from './Pages/MainPage';
import SavedListPage from './Pages/SavedLists';
import SearchResults from './Pages/searchResults';
import MyListPage from './Pages/MyListPage';

import SearchMapResults from './Pages/SearchMapResults';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <>

    <Router>
      <Routes>
        <Route path="/searchMapResults" element={<SearchMapResults />} />
        <Route path="/searchResults/:searchQuery" element={<SearchResults />} />
        <Route path="/savedLists" element={<SavedListPage />} />
        <Route path="mylist" element={<MyListPage/>} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>

  </>
);


reportWebVitals();
