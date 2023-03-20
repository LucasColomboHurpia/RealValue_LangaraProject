import React, { Component } from 'react'

import './ComponentStyles/loadingSpin.css'

function LoadingSpin({ loadingTemplate }) {
    if (!loadingTemplate) {
        return null;
    }

    return (
        <div className='loadContainer'><div className="loader"></div></div>
    );
}

export default LoadingSpin