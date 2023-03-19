import React, {useRef, useEffect, useState } from 'react'
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tomtom from '@tomtom-international/web-sdk-maps';

import './pageStyles/searchMapResults.css';

import PostModal from '../Components/PostModal';
import ListCard from '../Components/ListCard'
import LoadingSpin from '../Components/LoadingSpin';
import StatsModal from '../Components/StatsModal'

import analyticIcon from '../Assets/png-analytics-white.png'

import APIURL from '../constants/apiUrl';

import geodata from '../Data/zoning-districts-and-labels.json';

function SearchMapResults() {
  //------------------------------------------------------------
  //Loading Icon
  const [loadingTemplate, setloading] = useState(false);
  const [showZones, setShowZones] = useState(false);

  const changeLoading = (arg) => setloading(arg);

  //------------------------------------------------------------
  //MODAL
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  //------------------------------------------------------------
  //MODAL STATS
  const [statsIsOpen, setStatIsOpen] = useState(false);
  const toggleStats = () => {setStatIsOpen(!statsIsOpen); console.log(statsIsOpen)
}
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



  function setNewProperty (Property) {
    console.log(Property)
    setProperty(Property)
  };


    const getGeoCode = async (queries) => {
        const batchItems = {"batchItems": queries};
        const geoCodeURL = `https://api.tomtom.com/search/2/batch.json?key=SAs8GubigOjo4UwoTk7tG4sXMPosF8uU`;
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
        const newMap = tomtom.map({
            key:'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
            source: "vector",
            container: mapContainer.current,
            center: [mapLongitude, mapLatitude],
            zoom: 12
        });

        console.log(geodata[0])
        setMap(newMap)
        
        // return () => {
        //     map.remove();
        // };
    }, []);

    useEffect(() => {

        if(map && Object.keys(map).length !== 0) {
            if(showZones) {
                geodata.forEach((elm, index) => {
                    let backgroundColor = "#db356c";
                    let RTcolor = "#fee670";
                    let RMcolor = "rgb(100, 131, 197)";
                    let Ccolor = "rgb(245, 91, 105)";
                    // RMcolor = "";
        
                    switch(elm.zoning_category) {
                        case "RT": 
                            backgroundColor = RTcolor;
                            break;
                        case "RM": 
                            backgroundColor = RMcolor;
                            break;
                        case "C": 
                            backgroundColor = Ccolor;
                            break;
                    }
        
                        map.addLayer({
                            'id': `Keiks-${index}`,
                            'type': 'fill',
                            'source': {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Polygon',
                                        'coordinates': elm.geom.geometry.coordinates
                                    }
                                }
                            },
                            'layout': {},
                            'paint': {
                                'fill-color': backgroundColor,
                                'fill-opacity': 0.5,
                                'fill-outline-color': 'black'
                            }
                        }); 
                    })
            }
            else {
                geodata.forEach((elm, index) => {
                    map.removeLayer({
                        'id': `Keiks-${index}`
                    })
                })
            }
        }

    }, [map, showZones]);

    useEffect(() => {
      const markers = [];

      if(map && Object.keys(map).length !== 0 && geoCodes.length !== 0) {
        let n = 0;
        geoCodes.forEach(geoCode => {
          const marker = new tomtom.Marker().setLngLat([geoCode.lon, geoCode.lat]).addTo(map);
          const popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            "bottom-right": [0, -70],
            "bottom-left": [0, -70],
            left: [25, -35],
            right: [-25, -35],
          };
          const popup = new tomtom.Popup(popupOffsets).setHTML(`<h2>${backendData[n].adress1}</h2><p>More Details</p>`);
          marker.setPopup(popup);

          markers.push(marker);

          n++
        });
        console .log(geoCodes)

    }
      
        
    }, [geoCodes]);
  //------------------------------------------------------------
  const [input, setInput] = useState("");

  //form
  const handleSubmit = async (event) => {
    event.preventDefault();
    changeLoading(true);
    try {
      const response = await fetch(`${APIURL}/scrapper?input=${input}`);
        console.log(process.env.DEV_API_URL);
        const data = await response.json();
      let dataResults = (data[Object.keys(data)[0]])
      console.log(dataResults)
      setBackendData(dataResults)
      changeLoading(false);
    } catch (error) {
      console.log(error)
    }
  };
  //------------------------------------------------------------

  return (
    <>
    <PostModal toggleModal={toggleModal} isOpen={isOpen} property={activeProperty}/>
    <StatsModal toggleStats={toggleStats} statsIsOpen={statsIsOpen}/>
    <div className='pageContainer'>
      <div className='menuContainer'>

        <LoadingSpin loadingTemplate={loadingTemplate}/>

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

        <div className='searcTitle'>
          Search results 
{/*           <div className='toggleListings toggle'> Listing</div>
          <div className='toggleSaved toggle'>Saved</div> */}
        </div>
        
        <div className='seeAllButton'>See all the Lists</div>
        <div className='listContainer'>
          <div className='postListings'>

            {(backendData.length === 0 ) ?
              (<span></span>)
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
            <div className="switch-container switch-ios">
                <input type="checkbox" name="ios" id="ios" value={showZones} onChange={() => setShowZones(!showZones)} />
                <label for="ios"></label>
            </div>
        <div ref={mapContainer} style={{ height: "100vh" }} />
      </div>
    </div>
    </>
  )
}

export default SearchMapResults
