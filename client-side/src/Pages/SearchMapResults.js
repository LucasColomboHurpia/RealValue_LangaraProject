import './pageStyles/searchMapResults.css';
import React, {useRef, useEffect, useState } from 'react'
import ListCard from '../Components/ListCard'

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tomtom from '@tomtom-international/web-sdk-maps';

import PostModal from '../Components/PostModal';


function SearchMapResults() {
  //------------------------------------------------------------
  //Loading Icon
  const [loadingTemplate, setloading] = useState('Try to search something!');
  const changeLoading = (arg) => setloading(arg);

  //------------------------------------------------------------
  //MODAL
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const [activeProperty, setProperty] = useState({});
  function setNewProperty (Property) {
    console.log(Property)
    setProperty(Property)
  };

  //------------------------------------------------------------
  //DATA FROM BACK END
  const [backendData, setBackendData] = useState([{}]);
  console.log(backendData);

  //------------------------------------------------------------
  //MAP
  const mapContainer = useRef();

  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  useEffect(() => {
    console.log(tomtom)
    let map = tomtom.map({
      key: "SAs8GubigOjo4UwoTk7tG4sXMPosF8uU",
      source: "vector",
      container: mapContainer.current,
      center: [-123.12816828788911,49.27892695457111], //49.27892695457111, -123.12816828788911
      zoom: 12
    });
    return () => {
      map.remove();
    };
    }, []);
  //------------------------------------------------------------
  const [input, setInput] = useState("");

  //form
  const handleSubmit = async (event) => {
    event.preventDefault();
    changeLoading('Loading...');
    try {
      const response = await fetch(`/scrapper?input=${input}`);
      const data = await response.json();
      let dataResults = (data[Object.keys(data)[0]])
      console.log(dataResults)
      setBackendData(dataResults)
    } catch (error) {
      console.log(error)
    }
  };
  //------------------------------------------------------------

  return (
    <>
    <PostModal toggleModal={toggleModal} isOpen={isOpen} property={activeProperty}/>
    <div className='pageContainer'>
      <div className='menuContainer'>
        <div className='filtersContainer '>
          <div className='FilterTitle'>Filters</div>
          <div className='FilterType '>
            <form >
              <select name="Types" id="Types" className='FilterDropdown'>
                <option value="Type">Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Storage">Storage</option>
                <option value="Land">Land</option>
              </select>
            </form>
          </div>
          <div className='FilterZoning '>
            <form>
              <select name="Zoning" id="Zoning" className='FilterDropdown'>
                <option value="Zoning">Zoning</option>
                <option value="Zone1">Zone1</option>
                <option value="Zone2">Zone2</option>
                <option value="Zone3">Zone3</option>
                <option value="Zone4">Zone4</option>
              </select>
            </form>
          </div>
        </div>
        <div className='searchListingContainer'>
          <div className='searchBarContainer'>
            <form className='searchBarForm' onSubmit={handleSubmit}>
              <input className='searchBar' type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder='Enter an address, neighbourhood, city, or ZIP code.' />
              <input className='searchBarSubmit' type='submit' value='Go'></input>
            </form>
          </div>
        </div>
        <div className='toggleButtonContainer'>
          <div className='toggleListings toggle'> Listing</div>
          <div className='toggleSaved toggle'>Saved</div>
        </div>
        <div className='seeAllButton'>See all the Lists</div>
        <div className='listContainer'>
          <div className='postListings'>

            {(backendData[0].price === undefined) ?
              (<p>{loadingTemplate}</p>)
              :
              (backendData.map((item, i) => (
                < >
                  <ListCard toggleModal={toggleModal} setNewProperty={setNewProperty} property={item} />
                </>
              ))
              )}

          </div>
        </div>
      </div>
      <div className='mapContainer'>
      <div ref={mapContainer} style={{ height: "100vh" }} />
      </div>
    </div>
    </>
  )
}

export default SearchMapResults
