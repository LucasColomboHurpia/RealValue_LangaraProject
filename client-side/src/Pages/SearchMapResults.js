import React, {useRef, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tomtom from '@tomtom-international/web-sdk-maps';

import './pageStyles/searchMapResults.css';

import PostModal from '../Components/PostModal';
import ListCard from '../Components/ListCard'
import LoadingSpin from '../Components/LoadingSpin';
import StatsModal from '../Components/StatsModal';

import analyticIcon from '../Assets/png-analytics-white.png'

import APIURL from '../constants/apiUrl';

import geodata from '../Data/zoning-districts-and-labels.json';

function SearchMapResults({createNewList, updateList}) {
  //------------------------------------------------------------
  //Loading Icon
  let { searchQuery } = useParams();

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
  const [mapZoom, setMapZoom] = useState(12);
  const [map, setMap] = useState({});
  const [filterByType, setFilterByType] = useState();
  const [filterByZone, setFilterByZone] = useState("Single Detached House");
  

  const [activeProperty, setProperty] = useState({});

  //------------------------------------------------------------
  //DATA FROM BACK END
  const [backendData, setBackendData] = useState([]);
  const [renderedData, setRenderedData] = useState([]);
  const [layerIDs, setLayerIDs] = useState([]);
  const [markers, setMarkers] = useState([]);

    function setNewProperty (Property) {
        console.log(Property)
        setProperty(Property)
    };

    const createMarker = (icon, position, color, popupItem) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';

        const markerContentElement = document.createElement('div');
        markerContentElement.className = 'marker-content';
        markerContentElement.style.backgroundColor = color;
        markerElement.appendChild(markerContentElement);

        const iconElement = document.createElement('div');
        iconElement.className = 'marker-icon';
        iconElement.style.backgroundImage ='url(http://localhost:3000/Assets/map-pin.svg)';
        markerContentElement.appendChild(iconElement);

        const popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            "bottom-right": [0, -70],
            "bottom-left": [0, -70],
            left: [25, -35],
            right: [-25, -35],
        };

        const popup = new tomtom.Popup(popupOffsets).setHTML(`
            <div onclick="">
                <img class="mappop-img" src="${popupItem.image}"/>
                <h4 class="mappop-price">${popupItem.price}</h4>
                <p class="mappop-area">${popupItem.area} sqft</p>
                <p class="mappop-address">${popupItem.adress1}</p>
            </div>
        `);

        // add marker to map
        const marker = new tomtom.Marker({element: markerElement, anchor: 'bottom'})
            .setLngLat(position)
            .setPopup(popup)
            .addTo(map);
        
        return marker;
    }

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
          if((item.response.results[0])!=undefined){
            console.log(item.response.results[0].position)
            return item.response.results[0].position}
            else{
            return   console.log('please code jsut work aaaa')
            }
        });

        setGeoCodes(geo);
    }

    useEffect(() => {
        const newMap = tomtom.map({
            key:'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
            source: "vector",
            container: mapContainer.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });

        setMap(newMap)
        
        // return () => {
        //     map.remove();
        // };
    }, []);

    useEffect(() => {
        if(searchQuery) {
            setInput(searchQuery);
            getPropertiesBySearch();
        }
    }, [])

    useEffect(() => {
        if(renderedData.length !== 0) {
            console.log(JSON.stringify(renderedData))
            const queries = renderedData.map((data) => {
              console.log(`data is`,data.adress1)
                const fullAddress = `${data.adress1} ${data.adress2}`;
                const query = {"query": `/geocode/${fullAddress}.json`}
                return query;
            })

            getGeoCode(queries);
        }
    }, [renderedData]);

    useEffect(() => {
        if(map && Object.keys(map).length !== 0 && geoCodes.length !== 0) {

            if(markers && markers.length !==0) {
                markers.forEach(marker => {
                    marker.remove();
                });
                
                setMarkers([])
            }

            const createdMarkers = [];

            geoCodes.forEach((geoCode, index) => { console.log('geocode is',geoCode)
                if(geoCode!=undefined){
                    if(geoCode.lat>0){console.log('geocode lat is',geoCode.lat)
                        console.log('geocode is',geoCode)
                        
                        const newMarker = createMarker('accident.colors-white.svg', [geoCode.lon, geoCode.lat], '#5327c3', renderedData[index]);
                        createdMarkers.push(newMarker);
                    }

                    setMarkers(createdMarkers);
                }

            })

            map.setCenter({lon: geoCodes[0].lon, lat: geoCodes[0].lat});
        }
        
    }, [geoCodes]);

    useEffect(() => {
        const ids = [];

        if(map && Object.keys(map).length !== 0) {
            if(layerIDs && layerIDs.length !==0) {
                layerIDs.forEach(id => {
                    console.log(id)
                    map.removeLayer(id)
                    map.removeSource(id)
                });
                setLayerIDs([])
            }

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
                        case "RS": 
                            backgroundColor = RMcolor;
                            break;
                        case "C": 
                            backgroundColor = Ccolor;
                            break;
                    }
        
                    if(elm.zoning_classification === filterByZone) {
                        const layerId = `layer-${index}`;
                        ids.push(layerId);
                        map.addLayer({
                            'id': layerId,
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
                    }

                })

                setLayerIDs(ids);
            }
            
        }

    }, [map, filterByZone, showZones]);

    useEffect(() => {
        if(map && Object.keys(map).length !== 0) {
            if(filterByType) {
                const filteredRenderedData = backendData.filter(data => {
                    if(filterByType === "Type") {
                        return data;
                    }

                    if(filterByType === "other") {
                        if(data.type !== "Single Family" && data.type !== "Condo" && data.type !== "Townhome" ) {
                            console.log(data)
                            return data;
                        }
                    }

                    if(data.type === filterByType) {
                        return data
                    }
                });

                setRenderedData(filteredRenderedData);
            }
        }
    }, [map, filterByType])

  //------------------------------------------------------------
  const [input, setInput] = useState("");

  //form
  const handleSubmit =  (event) => {
    event.preventDefault();
    console.log('clicked')
    getPropertiesBySearch()
  };

  const getPropertiesBySearch = async () => {
    changeLoading(true);
    try {
      const response = await fetch(`${APIURL}/scrapper?input=${input}`);
        console.log(process.env.DEV_API_URL);
        const data = await response.json();
      let dataResults = (data[Object.keys(data)[0]])
      setBackendData(dataResults);
      setRenderedData(dataResults);
      changeLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  //------------------------------------------------------------

  return (
    <>
    {isOpen ? <PostModal  toggleModal={toggleModal} isOpen={isOpen} property={activeProperty} createNewList={createNewList} updateList={updateList}/> : null}
    {statsIsOpen ? <StatsModal  toggleStats={toggleStats} statsIsOpen={statsIsOpen} property={activeProperty}/> : null}

    <div className='pageContainer'>
      <div className='menuContainer'>

        <LoadingSpin loadingTemplate={loadingTemplate}/>

        <div className='filtersContainer '>
          <div className='FilterTitle'>Filters</div>
          <div className='FilterType '>
            <form >
              <select name="Types" id="Types" onChange={e => setFilterByType(e.target.value)} className='FilterDropdown'>
                <option value="Type">Type</option>
                <option value="Single Family">Single Family</option>
                <option value="Condo">Condo</option>
                <option value="Townhome">Townhome</option>
                {/* <option value="other">other</option> */}
              </select>
            </form>
          </div>
          <div className='FilterZoning'>
            <form>
              <select name="Zoning" id="Zoning" onChange={(e) => setFilterByZone(e.target.value)} className='FilterDropdown'>
                <option value="Zoning">Zoning</option>
                <option value="Single Detached House">Single Detached House</option>
                <option value="Multiple Dwelling">Multiple Dwelling</option>
                <option value="Industrial">Industrial</option>
                <option value="Duplex">Duplex</option>
                <option value="Commercial">Commercial</option>
                <option value="Comprehensive Development">Comprehensive Development</option>
                <option value="Limited Agriculture">Limited Agriculture</option>
                <option value="Historical Area">Historical Area</option>
                <option value="Other">Other</option>
              </select>
            </form>
          </div>
        </div>
        <div className='searchListingContainer'>
          <div className='searchBarContainer'>
            <form className='searchBarForm' id='searchBarForm' onSubmit={handleSubmit}>
              <input className='searchBar' type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder='Enter an address, neighbourhood, city, or ZIP code.' />
              <img className='searchBarIcon' src='/icons/icon_search_outline.svg' onClick={handleSubmit}/>
            </form>
          </div>
        </div>

        <div className='searcTitle'>
          Search results 
{/*           <div className='toggleListings toggle'> Listing</div>
          <div className='toggleSaved toggle'>Saved</div> */}
        </div>
        
        <div className='seeAllButton'><Link to="/savedLists">See all the Lists</Link></div>
        <div className='listContainer'>
          <div className='postListings'>

            {(renderedData.length === 0 ) ?
              (<span></span>)
              :
              (renderedData.map((item, i) => (
                < >
                  <ListCard toggleModal={toggleModal} setNewProperty={setNewProperty} property={item} />
                </>
              ))
              )}

          </div>
        </div>
      </div>
        <div className='mapContainer'>

            <div className="map-options">
                <label className="switch">
                    <input type="checkbox" id="togBtn" value={showZones} onChange={() => setShowZones(!showZones) } />
                    <div className="slider round">
                        <span className="on">Zoning on</span>
                        <span className="off">Zoning off</span>
                    </div>
                </label>
                
                <div className='analyticsToggle' onClick={toggleStats}>
                    <img src={analyticIcon} className='analyiticIconPNG'/>
                    <span classNmae="analyticsToggleText">Analytics</span>
                </div>
            </div>

            <div ref={mapContainer} style={{ height: "100vh" }} />
        </div>
    </div>
    </>
  )
}

export default SearchMapResults
