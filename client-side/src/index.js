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

    const getLists = async () => {
        const response = await axios.get('/api/v1/lists');
        setMyLists(response.data.data);
    }

    useEffect(() => {
        getLists()
    }, [])

  const createNewList = async (newListName) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/v1/lists', { name: newListName }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const newList = response.data.data;
    const existingList = [...myLists, newList];
    console.log(existingList);
    setMyLists(existingList);
  };

  const updateList = async (listIds, property) => {
    const response = await axios.post(`/api/v1/lists/${listIds[0]}/properties`, { property })
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
          <Route path="/searchMapResults" element={<SearchMapResults myLists={myLists} setMyLists={setMyLists} createNewList={createNewList} updateList={updateList} />} />
          <Route path="/searchMapResults/:searchQuery" element={<SearchMapResults myLists={myLists} setMyLists={setMyLists} createNewList={createNewList} updateList={updateList} />} />} />
          <Route path="/savedLists" element={<SavedListPage />} />
          <Route path="/mylist" element={<MyListPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals();
