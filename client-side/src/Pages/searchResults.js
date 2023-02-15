import React, { useEffect, useRef, useState } from 'react'
import {
    useParams
} from "react-router-dom";

import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import './pageStyles/searchResults.css';

import ListCard from '../Components/ListCard';

function SearchResults(props) {
    console.log(process.env.REACT_APP_API_KEY)
    const mapElement = useRef();
    let { searchQuery } = useParams();

    const [geoCodes, setGeoCodes] = useState([]);
    const [backendData, setBackendData] = useState([]);
    const [mapLongitude, setMapLongitude] = useState(-121.91599);
    const [mapLatitude, setMapLatitude] = useState(37.36765);
    const [mapZoom, setMapZoom] = useState(10);
    const [map, setMap] = useState({});
    

    const getScrapperData = async () => {
        try {      
            const response = await fetch(`/scrapper?input=${searchQuery}`);
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

        <div>
            <div style={{ flex: '0 0 50%' }}>
                {displayCards()}
            </div>
            <div style={{ height: "100vh", width: "80%" }} ref={mapElement} className="mapDiv"></div>
        </div>
    )
}

export default SearchResults
