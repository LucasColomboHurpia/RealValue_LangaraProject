import React, { useEffect, useState } from 'react'

import './pageStyles/searchResults.css';

//RUN ON PORT 3000
//cd client-side
//npm start

function SearchResults() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        let dataResults = (data[Object.keys(data)[0]])[0];
        setBackendData(dataResults)
        console.log(dataResults)
      }
    ).catch(setBackendData(undefined))
  }, [])

  return (
    <div>
        {(backendData === undefined) ? 
        (<p>Loading...</p>)
        :
        (backendData.map((item, i) => (
          <>
          <div className='postContainer'>
            <img src={item.image} alt={item.image} className='imagePost' key={(Math.random())}></img>
            <div key={(Math.random())}>{item.area}</div>
            <div key={(i+Math.random())}>{item.price}</div>
            <div key={(i+Math.random())}>{item.adress1}</div>
            <div key={(i+Math.random())}>{item.adress2}</div>
          </div>
          </>
          ))
        )}
    </div> 
  )
}

export default SearchResults
