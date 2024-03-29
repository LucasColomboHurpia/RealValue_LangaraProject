import React, { Component } from 'react';
import './ComponentStyles/postModal.css';

import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tomtom from '@tomtom-international/web-sdk-maps';

import saveListPng from '../Assets/png-save-white.png'
import saveListPngOpen from '../Assets/png-save-grey02.png'
import websiteIcon from '../Assets/png-website-darkgrey.png'
import axios from 'axios';

class PostModal extends Component {

    constructor(props) {
        super(props);
        this.mapContainerModal = React.createRef();
        this.handleResize = this.handleResize.bind(this);
        this.toggleElement = this.toggleElement.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            showElement: false,
            inputText: '',
            checkedItems: [],
        };
    }

    async componentDidMount() {
        const map = tomtom.map({
            key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
            source: 'raster',
            container: this.mapContainerModal.current,
            center: [-123.12816828788911, 49.27892695457111],
            zoom: 12,
        });

        // Geocode the address

        this.map = map;
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


    handleInputChange(event) {
        this.setState({ inputText: event.target.value });
        console.log(event.target.value)
    }

    handleCreateList = () => {
        this.props.createNewList(this.state.inputText);
        this.setState({ inputText: '' });
    }

    handleUpdate(e) {
        this.props.updateList(this.state.checkedItems, this.props.property);
    }

    toggleElement() {
        this.setState(prevState => ({ showElement: !prevState.showElement }));
    }


    render() {
        const { toggleModal, isOpen, property, createNewList, updateList } = this.props;
        const { showElement, inputText } = this.state;
        const { myLists } = this.props;



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
                            <div ref={this.mapContainerModal} className='tomMap' />
                        </div>



                    </div>
                    <div className='pictureSection-postModal'>
                        <div className='save-postModal'>
                            <div className='sourceLink-postModal'><a href={property.link} className='sourceLink-postModal'><img className='souceLink-icon-postModal1' src={websiteIcon}></img><span>Go to Website</span></a></div>
                            <div className='saveToList-postModal' onClick={this.toggleElement}>
                                <div className='saveToList-icon-postModal1'> <img src={saveListPng}></img> </div>
                                <div className='saveToList-Text-postModal'>Save to list </div>
                            </div>
                            {showElement && (
                                <div className='saveListPoup-Container'>
                                    <div className='AddListContainer'>
                                        <input className='saveListInput'
                                            placeholder='Add List...'
                                            value={inputText}
                                            onChange={this.handleInputChange}></input>
                                        <div className='AddListPlusButton' onClick={this.handleCreateList}>+</div>
                                    </div>
                                    <div className='OptionListsContainer'>

                                        {myLists.map((item, index) => (
                                            <div className='OptionListItem' key={index}>
                                                <div className='checkBoxOptList'>
                                                    <input
                                                        type={'checkbox'}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                this.setState((prevState) => ({
                                                                    checkedItems: [...prevState.checkedItems, item.id],
                                                                }));
                                                            } else {
                                                                this.setState((prevState) => ({
                                                                    checkedItems: prevState.checkedItems.filter(
                                                                        (i) => i !== index
                                                                    ),
                                                                }));
                                                            }
                                                        }}
                                                    ></input>
                                                </div>
                                                <div className='ListNameOptList'>{item.name}</div>
                                            </div>
                                        ))}
                                        <div className='SaveToListButton' onClick={this.handleUpdate}>Save</div>
                                    </div>
                                </div>)}
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