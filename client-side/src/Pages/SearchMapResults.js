import './pageStyles/searchMapResults.css';
import React, {useRef, useEffect, useState } from 'react'
import ListCard from '../Components/ListCard'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';

function SearchMapResults() {
    const mapContainer = useRef();


    const [backendData, setBackendData] = useState([{}])
    const [geoCodes, setGeoCodes] = useState([]);
    //------------------------------------------------------------
    const [mapLongitude, setMapLongitude] = useState(-121.91599);
    const [mapLatitude, setMapLatitude] = useState(37.36765);
    const [mapZoom, setMapZoom] = useState(13);
    const [map, setMap] = useState({});

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
            let map = tt.map({
                key: process.env.REACT_APP_MAP_API_KEY,
                container: mapContainer.current,
                center: [geoCodes[0].lon, geoCodes[0].lat],
                zoom: mapZoom
            });
            setMap(map);
            return () => map.remove();
        }
    }, [geoCodes]);

    useEffect(() => {

        if(map && Object.keys(map).length !== 0 && geoCodes.length !== 0) {
            geoCodes.forEach(geoCode => {
                new tt.Marker().setLngLat([geoCode.lon, geoCode.lat]).addTo(map)
                var popupOffsets = {
                    top: [0, 0],
                    bottom: [0, -70],
                    "bottom-right": [0, -70],
                    "bottom-left": [0, -70],
                    left: [25, -35],
                    right: [-25, -35],
                }
                new tt.Popup(popupOffsets);
            })
        }
    }, [map, geoCodes]);

  //------------------------------------------------------------
  const [input, setInput] = useState("");

  //form
  const handleSubmit = async (event) => {
    event.preventDefault();
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
              (<p>Try to search something!</p>)
              :
              (backendData.map((item, i) => (
                <>
                  <ListCard property={item} />
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
  )
}

export default SearchMapResults
