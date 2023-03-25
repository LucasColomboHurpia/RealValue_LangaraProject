import './pageStyles/savedLists.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import objectSample from '../objectSample';
import MyListCard from '../Components/MyListCard';
import PostModal from '../Components/PostModal'

console.log(objectSample)

function SavedListPage() {

  //------------------------------------------------------------
  //MODAL
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  //------------------------------------------------------------
  const [activeProperty, setProperty] = useState({});
  function setNewProperty (Property) {
    setProperty(Property)
  };
  //------------------------------------------------------------


  const myLists = JSON.parse(localStorage.getItem('myLists')) 
  console.log(myLists)

  return (
    <div className='savedListsContainer'>
          {isOpen ? <PostModal  toggleModal={toggleModal} isOpen={isOpen} property={activeProperty}/> : null}

      <div className='savedListTitle'>Saved Lists</div>

      <div className='ListContainer'>

      {myLists.map((item, index) => (
        <div className='List'>
          <div className='listTitle'>{item.name}
            <div className='SeeAllButton'> <Link to="/mylist">See all</Link></div>
            </div>
          <div className='cardContainer'>
          {item.list.map((item) => (
            <MyListCard property={item} toggleModal={toggleModal} setNewProperty={setNewProperty}/>
            ))}
        </div>

      </div>
     ))}



    </div>
    </div >
  );
}

export default SavedListPage;