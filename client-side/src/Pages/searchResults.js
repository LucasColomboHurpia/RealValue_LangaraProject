import React, { useEffect, useRef, useState } from 'react'
import {
    useParams
} from "react-router-dom";

import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import './pageStyles/searchResults.css';

import ListCard from '../Components/ListCard';
import APIURL from '../constants/apiUrl';

function SearchResults(props) {
    const mapElement = useRef();
    let { searchQuery } = useParams();

    const [geoCodes, setGeoCodes] = useState([]);
    const [backendData, setBackendData] = useState([]);
    const [mapLongitude, setMapLongitude] = useState(-121.91599);
    const [mapLatitude, setMapLatitude] = useState(37.36765);
    const [mapZoom, setMapZoom] = useState(12);
    const [map, setMap] = useState({});

    const getScrapperData = async () => {
        try {      
            const response = await fetch(`${APIURL}/scrapper?input=${searchQuery}`);
            const data = await response.json();
            setBackendData(data.query)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getScrapperData();
    }, []);

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
                container: mapElement.current,
                center: [geoCodes[0].lon, geoCodes[0].lat],
                zoom: mapZoom,
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


    //----------------------------------------
    const displayCards = () => {
        if(backendData && backendData.length !== 0) {
            return backendData.map((item, i) => (
                
                <ListCard property={item} />
            ))
        }

    }

    //---------------------------------------------

    return (

        <div className='result'>
            <div className='result-left'>
                <div className='filters'>
                    <p className='filters-title'>Filters</p>

                    <select className='filters-select'>
                        <option>Type</option>
                    </select>

                    <select className='filters-select'>
                        <option>Zoning</option>
                    </select>
                </div>

                <div className='result-card'>
                    <form className='search-form' 
                        // onSubmit={onSearch}
                    >
                        <div className='search-input-group'>
                            <input
                                className='search-input'
                                id='searchQuery'
                                // value={searchQuery}
                                placeholder='Enter an address, neighbourhood, city, or ZIP code.'
                                // onChange={e => setSearchQuery(e.target.value)}
                            />
                            <img className='search-icon' src='/icons/icon_search_outline.svg' />
                        </div>
                    </form>


                    <div className='banner-info'>
                        <div className='banner'>
                            <span className='banner-item banner-active'>Listings</span>
                            <span className='banner-item'>Saved</span>
                        </div>

                        <a href='#'>See saved lists</a>
                    </div>
                </div>

                
                <div className='listCard-container'>
                    {displayCards()}
                </div>
            </div>

            <div style={{ height: "100vh", width: "80%" }} ref={mapElement} className="mapDiv"></div>
        </div>
    )
}

export default SearchResults
