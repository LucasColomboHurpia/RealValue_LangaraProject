import { React } from "react";
import './ComponentStyles/cityCards.css';



const CityCard = (props) => {



    const listStyle = {
        backgroundColor: '#D9D9D9',
        backgroundImage: `url(${props.city.thumbnail})`,
    }

    return (
        <div className="cityCardContainer">
            <a href={`/searchResults/${props.city.name}`} className="card-city" style={listStyle}>
                <p className="card-city-title">{props.city.name}</p>
            </a>
        </div>
    )
}

export default CityCard;