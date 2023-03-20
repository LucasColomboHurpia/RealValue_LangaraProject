import React, { Component } from 'react';
import './ComponentStyles/postModal.css';

import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tomtom from '@tomtom-international/web-sdk-maps';

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.mapContainerModal = React.createRef();
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    const map = tomtom.map({
      key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
      source: 'raster',
      container: this.mapContainerModal.current,
      center: [-123.12816828788911, 49.27892695457111],
      zoom: 12,
    });

    this.map = map;

    // Trigger a map resize
    this.handleResize();

    // Add the event listener to window resize
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    // Remove the event listener for window resize
    window.removeEventListener('resize', this.handleResize);
    this.map.remove();
  }

  handleResize() {
    if (this.map) {
      this.map.resize();
    }
  }

  render() {
    const { toggleModal, isOpen, property } = this.props;

    return (
        <div className={'postModalContainer'}>
            <div className='closePostModal' onClick={toggleModal}>X</div>
            <div className='postModal'>
                <div className='infoSection-postModal'>
                    <div className='price-postModal'>{property.price}</div>
                    <div className='infoSection1-postModal'>{property.area} sqft</div>
                    <div className='infoSection2-postModal'>{property.adress1}, {property.adress2}</div>

                    <div className='infoSection3-postModal'>
                        <div className='info1-3postModal'>
                            <div className='infoTitle-postModal'>Property Type</div>
                            <div className='info3-postModal'>{property.type}</div>
                        </div>
                        <div className='info1-3postModal'>
                            <div className='infoTitle-postModal'>Value per sqft</div>
                            <div className='info3-postModal'>{property.ratio}</div>
                        </div>
                        <div className='info1-3postModal'>
                            <div className='infoTitle-postModal'>Building age</div>
                            <div className='info3-postModal'>{property.age}</div>
                        </div>
                        <div className='info1-3postModal'>
                            <div className='infoTitle-postModal'>Land to building ratio</div>
                            <div className='info3-postModal'>N/A</div>
                        </div>
                    </div>

                    <div className='map-postModal'>
                        <div ref={this.mapContainerModal}  className='tomMap'/>
                    </div>


                    
                </div>
                <div className='pictureSection-postModal'>
                    <div className='save-postModal'>
                        <div className='sourceLink-postModal'><a href={property.link}>Go to Website</a></div>
                        <div className='saveToList-postModal'>
                            <div className='saveToList-icon-postModal'></div>
                            <div className='saveToList-Text-postModal'>Save to list</div>
                        </div>
                    </div>
                    <div className='mainImage-postModal'>
                        <img src={property.image} className='imgPostModal'></img>
                    </div>

                </div>
            </div>
        </div>
    );
}
}

export default PostModal;