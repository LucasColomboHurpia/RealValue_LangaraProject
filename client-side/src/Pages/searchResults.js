import React, { useEffect, useState } from 'react'

import './pageStyles/searchResults.css';

//RUN ON PORT 3000
//cd client-side
//npm start

function SearchResults() {

  const [backendData, setBackendData] = useState([{}]);

  console.log(backendData)

  //----------------------------------------
  const [input, setInput] = useState(""); 

  //form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {      
      const response = await fetch(`/scrapper?input=${input}`);
      const data = await response.json();
      let dataResults = (data[Object.keys(data)[0]])
      console.log(dataResults)
      setBackendData(dataResults)
    } catch (error) {
      console.log(error)
    }
  };
  //---------------------------------------------

  return (

    <div>
      <div className='inputTest'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

    <div></div>

      {(backendData[0].price === undefined) ?
        (<p>Loading...</p>)
        :
        (backendData.map((item, i) => (
          <>
            <div className='postContainer'>
              <img src={item.image} alt={item.image} className='imagePost' key={(Math.random())}></img>
              <div key={(Math.random())}>{item.area}</div>
              <div key={(i + Math.random())}>{item.price}</div>
              <div key={(i + Math.random())}>{item.adress1}</div>
              <div key={(i + Math.random())}>{item.adress2}</div>
            </div>
          </>
        ))
        )}
    </div>
  )
}

export default SearchResults
