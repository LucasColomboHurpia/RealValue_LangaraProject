import './ComponentStyles/myListPageItem.css';
import React, { useState } from 'react';
import objectSample from '../objectSample';
import PostModal from './PostModal'

console.log(objectSample)

function MyListPageItem(props) {

    //------------------------------------------------------------
    //MODAL
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    //------------------------------------------------------------
    const [activeProperty, setProperty] = useState({});
    function setNewProperty(Property) {
        console.log(Property)
        setProperty(Property)
    };
    //------------------------------------------------------------

    return (
        <div className='myListPageItemContainer'>
        <div className='myListItemImageContainer'>
            <img className='myListItemImage' src={props.property.image}/>
        </div>
        <div className='myListItemInfoContainer'>
        <div className='myListItemRemove'>Remove</div>
            <div className='myListItemPrice myListItemInfo'>{props.property.price}</div>
            <div className='myListItemPropType myListItemInfo'>{props.property.type}</div>
            <div className='myListItemAddress myListItemInfo'>{props.property.adress1}, {props.property.adress2}</div>
        </div>
    </div>

    );
}

export default MyListPageItem;