import { React } from "react";
import './ComponentStyles/CityCard.css';

const ListCard = (props) => {

    return (
        <div className='listCard'>
            <div className='imageList'>
                <img src={props.property.image} alt={props.property.image} className='imagePost' key={(Math.random())}></img>
                <div className='favoriteIcon'></div>
            </div>
                <div className='infoList'>
                <div className='listPrice'>{`$${props.property.price}`}</div>
                <div className='listArea'>{props.property.type}</div>
                <div className='listAddress'>{props.property.address}</div>
            </div>
        </div>
        
    )
}

export default ListCard;