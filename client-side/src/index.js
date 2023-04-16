import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//object sample for testing
import objectSample from '../src/objectSample';

import Header from './Components/Header';
import Footer from './Components/Footer';
import MainPage from './Pages/MainPage';
import SavedListPage from './Pages/SavedLists';
import Profile from './Pages/profile';
import Login from './Pages/Login';
import SearchResults from './Pages/SearchResults';
import MyListPage from './Pages/MyListPage';

import SearchMapResults from './Pages/SearchMapResults';
import { local } from 'd3';

const App = () => {
  const [myLists, setMyLists] = useState([]);

  const createNewList = async (newListName) => {

    const response = await axios.post('/api/v1/lists', { name: newListName })
    const newList = response.data.data;
    const existingList = [...myLists, newList];
    console.log(existingList);
    setMyLists(existingList);
  };

  const updateList = async (listId, property) => {
    const response = await axios.patch(`/api/v1/lists/${listId}`, {property })
    const newList = response.data.data;
    const existingList = [...myLists, newList];
    console.log(existingList);
    setMyLists(existingList);
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/searchMapResults" element={<SearchMapResults createNewList={createNewList} updateList={updateList} />} />
          <Route path="/searchMapResults/:searchQuery" element={<SearchMapResults createNewList={createNewList} updateList={updateList} />} />} />
          <Route path="/savedLists" element={<SavedListPage />} />
          <Route path="/mylist" element={<MyListPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
        </Routes>

      </Router>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals();
