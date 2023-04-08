import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
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

  const createNewList = (newListName) => {

    let newId = 0

    if (localStorage.length === 0) { newId = 0 }
    else {
      newId = (Math.random()*999999999)
    }

    let newListObject = {
      id: newId,
      name: newListName,
      list: []
    }

    let existingList = []

    console.log(newListObject)
    if (localStorage.length != 0) {
      existingList = JSON.parse(localStorage.getItem('myLists'))
      console.log(existingList)
    }


    existingList.push(newListObject)

    localStorage.setItem('myLists', JSON.stringify(existingList));
    setMyLists(existingList);
  };

  const updateList = (id, property) => {

    let existingList = JSON.parse(localStorage.getItem('myLists'))

    existingList.forEach(item => {
      if (item.id == id) {
        item.list.push(property)
      }
    });

      console.log(property)
      console.log(existingList)

    localStorage.setItem('myLists', JSON.stringify(existingList));
    setMyLists(existingList);
  };


  //--------------------

/*   localStorage.clear()


  let sampleList = [{
    id: 0,
    name: 'Example List',
    list: objectSample
  }]
  localStorage.setItem('myLists', JSON.stringify(sampleList)); */

  //--------------------

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/searchMapResults" element={<SearchMapResults createNewList={createNewList} updateList={updateList} />} />
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
