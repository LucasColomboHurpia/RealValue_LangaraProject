import { React } from "react";
import './ComponentStyles/cityCard.css';

const CityCard = (props) => {

    return (
        <a href={`/searchResults/${props.city}`} className="card-city">
            <p className="card-city-title">{props.city}</p>
        </a>
        
    )
}

export default CityCard;