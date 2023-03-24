import React, { useEffect, useState } from 'react';
import CityCard from '../Components/CityCard';
import { useNavigate } from 'react-router-dom';
import './pageStyles/main.css';

import thumbnail1 from '../Assets/science-world-false-creek-vancouver-british-columbia-63332.png'
import thumbnail2 from '../Assets/pexels-photo-302769.png'
import thumbnail3 from '../Assets/pexels-photo-2389474.png'

function MainPage() {
    const history = useNavigate();

    const cities = [
        {
            name: 'Vancouver',
            thumbnail: thumbnail1
        },
        {
            name: 'Richmond',
            thumbnail: thumbnail2
        },
        {
            name: 'Burnaby',
            thumbnail: thumbnail3
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const displayCities = () => {
        return cities.map(city => {
            return (
                <CityCard city={city} />
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
                    <label className='search-label' htmlFor='searchQuery'>Welcome to RealValue</label>
                    <div className='searchSlogan'>The website  for real estate appraisers that helps cutting down complex research processes to just a few minutes!</div>
                    <div className='search-input-group'>
                        <img className='search-icon' src='/icons/icon_search_outline.svg' />
                        <input
                            className='search-input'
                            id='searchQuery'
                            value={searchQuery}
                            placeholder='Enter an address, neighbourhood, city, or ZIP code.'
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <div className='search-right'>
                            <div className='search-filter'>
                                <p>Advanced filters</p>
                            </div>
                            <input type="submit" className="search-input-btn" value="Search" />
                        </div>
                    </div>
                </form>
            </section>

            <section className='card-city-section'>
                <div className='container'>
                    <h4 className='card-city-h4'>Search by City</h4>
                    <div className='card-city-list'>
                        {displayCities()}
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainPage
