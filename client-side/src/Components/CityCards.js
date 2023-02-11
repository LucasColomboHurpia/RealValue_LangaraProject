import React from 'react';
import './ComponentStyles/cityCard.css';

function CityCards(props) {
    
    return(
        <div className='city-card-container'>
            <div className='city-card'>
                <h4 className='city-h4'>{props.cityName}</h4>
            </div>
        </div>
    )
}

export default CityCards;