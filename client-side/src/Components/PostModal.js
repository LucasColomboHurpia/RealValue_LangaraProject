import React, { useRef, useEffect, useState } from 'react'
import './ComponentStyles/postModal.css';

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tomtom from '@tomtom-international/web-sdk-maps';

function PostModal({ toggleModal, isOpen, property }) {

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
            source: "raster",
            container: mapContainer.current,
            center: [-123.12816828788911, 49.27892695457111], //49.27892695457111, -123.12816828788911
            zoom: 11
        });
        map.setStyle('tomtom://raster/1/satellite');
        return () => {
            map.remove();
        };
    }, []);
    //------------------------------------------------------------

    return (
        <div className={isOpen ? 'postModalContainer' : 'hide'}>
            <div className='closePostModal' onClick={toggleModal}>X</div>
            <div className='postModal'>
                <div className='infoSection-postModal'>
                    <div className='price-postModal'>{property.price}</div>
                    <div className='infoSection1-postModal'>{property.area} sqft</div>
                    <div className='infoSection2-postModal'>{property.adress1}, {property.adress2}</div>
                    <div className='map-postModal'>
                        <div ref={mapContainer}  className='tomMap'/>
                    </div>
                    <div className='infoSection3-postModal'>
                        <div className='3info1-postModal'>
                            <div className='infoTitle-postModal'>Property Type</div>
                            <div className='info3-postModal'>{property.type}</div>
                        </div>
                        <div className='3info2-postModal'>
                            <div className='infoTitle-postModal'>Value per sqft</div>
                            <div className='info3-postModal'>{property.ratio}</div>
                        </div>
                        <div className='3info3-postModal'>
                            <div className='infoTitle-postModal'>Building age</div>
                            <div className='info3-postModal'>{property.age}</div>
                        </div>
                    </div>
                    
                </div>
                <div className='pictureSection-postModal'>
                    <div className='save-postModal'>
                        <div className='sourceLink-postModal'><a href={property.link}>Go to Website</a></div>
                        <div className='saveToList-postModal'>
                            <div className='saveToList-icon-postModal'></div>
                            <div className='saveToList-Text-postModal'>Save to list</div>
                        </div>
                    </div>
                    <div className='mainImage-postModal'>
                        <img src={property.image} className='imgPostModal'></img>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PostModal;