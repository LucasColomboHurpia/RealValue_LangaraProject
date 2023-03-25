import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import objectSample from '../src/objectSample';

import Header from './Components/Header';
import Footer from './Components/Footer';
import MainPage from './Pages/MainPage';
import SavedListPage from './Pages/SavedLists';
import Profile from './Pages/profile';
import Login from './Pages/Login';
import SearchResults from './Pages/searchResults';
import MyListPage from './Pages/MyListPage';

import SearchMapResults from './Pages/SearchMapResults';

const App = () => {
  const [myLists, setMyLists] = useState([]);

  const handleListChange = (item) => {
    const newList = [...myLists]; // create a copy of the array
    newList.push(item); // modify the copy
    setMyLists(newList); // update the state with the new array
  };

  const createNewList = (newList) => {
    localStorage.setItem('myLists', JSON.stringify([...myLists, newList]));
    setMyLists([...myLists, newList]);
  };
  
  const updateList = (id, updatedList) => {
    const updatedLists = myLists.map((list) => {
      if (list.id === id) {
        return { ...list, ...updatedList };
      } else {
        return list;
      }
    });
    localStorage.setItem('myLists', JSON.stringify(updatedLists));
    setMyLists(updatedLists);
  };
  
  //--------------------
/*     let sampleList = [{
      id: 0,
      name: 'Example List',
      list: objectSample
    }
]
    createNewList(sampleList); */
  //--------------------

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/searchMapResults" element={<SearchMapResults  handleListChange={handleListChange} />} />
          <Route path="/searchResults/:searchQuery" element={<SearchResults />} />
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