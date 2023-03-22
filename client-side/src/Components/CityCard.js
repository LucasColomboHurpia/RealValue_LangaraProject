import { React } from "react";
import './ComponentStyles/cityCards.css';
import { Link } from "react-router-dom";

const CityCard = (props) => {



    const listStyle = {
        backgroundColor: '#D9D9D9',
        backgroundImage: `url(${props.city.thumbnail})`,
    }

    return (
        <div className="cityCardContainer">
            <Link to={`/searchResults/${props.city.name}`} className="card-city" style={listStyle}>
                <p className="card-city-title">{props.city.name}</p>
            </Link>
        </div>
    )
}

export default CityCard;