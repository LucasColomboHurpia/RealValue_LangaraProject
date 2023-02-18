import React, { useState } from 'react';
import './ComponentStyles/postModal.css';

function PostModal({toggleModal, isOpen}) {

    return (
        <div className={isOpen?'postModalContainer':'hide'}>
            <div className='closePostModal' onClick={toggleModal}>X</div>
            <div className='postModal'>
                <div className='infoSection-postModal'>
                    <div className='price-postModal'>CA $850,000</div>
                    <div className='infoSection1-postModal'>information information information</div>
                    <div className='infoSection2-postModal'>address</div>
                    <div className='map-postModal'>map?</div>
                    <div className='infoSection3-postModal'>
                        <div className='3info1-postModal'>
                            <div className='infoTitle-postModal'>Land to building ratio</div>
                            <div className='info3-postModal'>Info</div>
                        </div>
                        <div className='3info2-postModal'>
                            <div className='infoTitle-postModal'>Value per sqft</div>
                            <div className='info3-postModal'>Info</div>
                        </div>
                        <div className='3info3-postModal'>
                            <div className='infoTitle-postModal'>Building age</div>
                            <div className='info3-postModal'>Info</div>
                        </div>
                    </div>
                    <div className='sourceLink-postModal'>Go to website</div>
                </div>
                <div className='pictureSection-postModal'>
                    <div className='save-postModal'>
                        <div className='saveToList-postModal'>
                            <div className='saveToList-icon-postModal'></div>
                            <div className='saveToList-Text-postModal'>Save to list</div>
                        </div>
                    </div>
                    <div className='mainImage-postModal'></div>
                    <div className='imageGallery-postModal'>
                        <div className='image-postModal'></div>
                        <div className='image-postModal'></div>
                        <div className='image-postModal'></div>
                        <div className='image-postModal'></div>                  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal;