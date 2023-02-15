import React, { useEffect, useState } from 'react';
import CityCard from '../Components/CityCard';
import { useNavigate } from 'react-router-dom';
import './pageStyles/main.css';


function MainPage() {
    const history = useNavigate();

    const cities = ["vancouver", "richmond", "burnaby"];
    
    const [searchQuery, setSearchQuery] = useState('');

    const displayCities = () => {
        return cities.map(city => {
            return (
                <CityCard city={city}/>
            )
        })
    }

    const onSearch = (e) => {
        e.preventDefault();
        history(`/searchResults/${searchQuery}`)
    }
  
    return (
        <>
            <section className='search'>
                <form className='search-form' onSubmit={onSearch}>
                    <label className='search-label' htmlFor='searchQuery'>Search a property</label>
                    <div className='search-input-group'>
                        <input
                            className='search-input'
                            id='searchQuery'
                            value={searchQuery}
                            placeholder='Enter an address, neighbourhood, city, or ZIP code.'
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <img className='search-icon' src='/icons/icon_search_outline.svg' />
                    </div>
                </form>
            </section>

            <section className='card-city-section'>
                <h4 className='card-city-h4'>Search by City</h4>
                <div className='card-city-list'>
                    {displayCities()}
                </div>
            </section>
        </>
    )
  }
  
  export default MainPage
  