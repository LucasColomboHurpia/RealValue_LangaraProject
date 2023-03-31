import React, { useState } from 'react';


function MyListCard(props) {
    const handleClick = () => {
      props.setNewProperty(props.property);
      props.toggleModal();
    };  


    return (
      <div className='savedListCard' onClick={handleClick}>
      <div className='imageList'>
        <img src={props.property.image} className='myListImage'/>
      </div>
      <div className='infoList'>
        <div className='listPrice'>{props.property.price}</div>
        <div className='listArea'>{props.property.area} sqft</div>
        <div className='listAddress'>{props.property.adress2} </div>
      </div>
    </div>

    )
}

export default MyListCard;