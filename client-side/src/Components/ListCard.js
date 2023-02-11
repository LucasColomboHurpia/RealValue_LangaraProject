import React, { useEffect, useState } from 'react'
import './ComponentStyles/listcard.css'



function ListCard(props) {

  
    return (
        <div className='listCard'>
        <div className='imageListContainer'>
          <img alt='property' className='imgList' src={props.property.image}></img>
        </div>
        <div className='infoList'>
          <div className='listPrice'>{props.property.price}</div>
          <div className='listArea'>{props.property.area}</div>
          <div className='listAddress'>{props.property.adress1}</div>
        </div>
      </div>
    )
  }
  
  export default ListCard
  