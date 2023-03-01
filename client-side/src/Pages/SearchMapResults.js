import './pageStyles/searchMapResults.css';
import React, {useRef, useEffect, useState } from 'react'
import ListCard from '../Components/ListCard'

import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tomtom from '@tomtom-international/web-sdk-maps';

import PostModal from '../Components/PostModal';


function SearchMapResults() {
  //------------------------------------------------------------
  //Loading Icon
  const [loadingTemplate, setloading] = useState('Try to search something!');

  //------------------------------------------------------------
  //MODAL
  const [isOpen, setIsOpen] = useState(false);

  //------------------------------------------------------------
  //MAP
  const mapContainer = useRef();
  
  const [geoCodes, setGeoCodes] = useState([]);
  const [mapLongitude, setMapLongitude] = useState(-123.12816828788911);
  const [mapLatitude, setMapLatitude] = useState(49.27892695457111);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  const [activeProperty, setProperty] = useState({});

  //------------------------------------------------------------
  //DATA FROM BACK END
  const [backendData, setBackendData] = useState([]);

  const toggleModal = () => setIsOpen(!isOpen);

  function setNewProperty (Property) {
    console.log(Property)
    setProperty(Property)
  };

  const changeLoading = (arg) => setloading(arg);

    const getGeoCode = async (queries) => {
        const batchItems = {"batchItems": queries};
        const geoCodeURL = `https://api.tomtom.com/search/2/batch.json?key=${process.env.REACT_APP_MAP_API_KEY}`;
        const response = await fetch(geoCodeURL, {
            method: "POST",
            body: JSON.stringify(batchItems),
            headers: {
                "content-type": "application/json;charset=utf-8"
            }
        });
        const data = await response.json();
        const geo = data.batchItems.map(item => {
            return item.response.results[0].position
        });
        setGeoCodes(geo);
    }

    useEffect(() => {
        if(backendData.length !== 0) {
            console.log(backendData)
            const queries = backendData.map((data) => {
                const fullAddress = `${data.adress1} ${data.adress2}`;
                const query = {"query": `/geocode/${fullAddress}.json`}
                return query;
            })

            getGeoCode(queries);
        }
    }, [backendData]);

    useEffect(() => {
        if(geoCodes && geoCodes.length !== 0) {
            console.log(geoCodes[0].lon)
            map.setCenter({lon: geoCodes[0].lon, lat: geoCodes[0].lat});
            console.log(map)
        }
    }, [geoCodes]);

    useEffect(() => {
        setMap(tomtom.map({
            key: process.env.REACT_APP_MAP_API_KEY,
            source: "vector",
            container: mapContainer.current,
            center: [mapLongitude, mapLatitude],
            zoom: 12
        }))
        
        // return () => {
        //     map.remove();
        // };
    }, []);

    useEffect(() => {
        const markers = [];

        if(map && Object.keys(map).length !== 0 && geoCodes.length !== 0) {
            geoCodes.forEach(geoCode => {
                const marker = new tomtom.Marker().setLngLat([geoCode.lon, geoCode.lat]).addTo(map)
                var popupOffsets = {
                    top: [0, 0],
                    bottom: [0, -70],
                    "bottom-right": [0, -70],
                    "bottom-left": [0, -70],
                    left: [25, -35],
                    right: [-25, -35],
                }
                new tomtom.Popup(popupOffsets);
                
                markers.push(marker)
            })
        }

        return () => {
            if(markers.length !==0 ) {
                markers.forEach(marker => marker.remove());
            }
        }
        
    }, [geoCodes]);
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

            {(backendData.length === 0 ) ?
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
