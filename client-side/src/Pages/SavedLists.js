import './pageStyles/savedLists.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import objectSample from '../objectSample';
import MyListCard from '../Components/MyListCard';
import PostModal from '../Components/PostModal'
import axios from 'axios';

console.log(objectSample)

function SavedListPage() {

  //------------------------------------------------------------
  //MODAL
  const [myLists, setMyLists] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  //------------------------------------------------------------
  const [activeProperty, setProperty] = useState({});
  function setNewProperty (Property) {
    setProperty(Property)
  };
  //------------------------------------------------------------

    async function getLists() {
        const response = await axios.get('/api/v1/lists');
        setMyLists(response.data.data);
    }

    useEffect(() => {
        getLists();
    }, [])

  if (!myLists) {
    let sampleList = [{
      id: 0,
      name: 'Example List',
      list: objectSample
    }]
    localStorage.setItem('myLists', JSON.stringify(sampleList));
    myLists = sampleList;
  }

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
          {item.properties && item.properties.map((item) => (
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
