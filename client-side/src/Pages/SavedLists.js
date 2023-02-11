import './pageStyles/savedLists.css';
import React, { useState } from 'react';

function Header() {

  return (
    <div className='savedListsContainer'>
      <div className='savedListTitle'>Saved Lists</div>

      <div className='ListContainer'>

        <div className='List'>
          <div className='listTitle'>My list
            <div className='SeeAllButton'>See all</div></div>


          <div className='cardContainer'>

            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>

            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>
            
            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>

          </div>

        </div>

        <div className='List'>
          <div className='listTitle'>My list
            <div className='SeeAllButton'>See all</div></div>


          <div className='cardContainer'>

            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>

            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>
            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>

          </div>

        </div>

        <div className='List'>
          <div className='listTitle'>My list
            <div className='SeeAllButton'>See all</div></div>


          <div className='cardContainer'>

            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>

            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>
            <div className='listCard'>
              <div className='imageList'>
                <div className='favoriteIcon'></div>
              </div>
              <div className='infoList'>
                <div className='listPrice'>$500,000</div>
                <div className='listArea'>Residential</div>
                <div className='listAddress'>Vancouver, BC</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Header;