import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tomtom from '@tomtom-international/web-sdk-maps';

import './ComponentStyles/StatsModal.css'

function StatsModal({ toggleStats, statsIsOpen }) {
  const ref = useRef();

  const dataBarChart = [
    { x: '2018', y: 155 },
    { x: '2019', y: 180 },
    { x: '2020', y: 140 },
    { x: '2021', y: 190 },
    { x: '2021', y: 140 },
  ];
  const dataLineChart1 = [
    { x: '1', y: 100 },
    { x: '2', y: 120 },
    { x: '3', y: 65 },
  ];
  const dataLineChart2 = [
    { x: '1', y: 100 },
    { x: '2', y: 60 },
    { x: '3', y: 112 },
  ];
  const dataLineChart3 = [
    { x: '1', y: 70 },
    { x: '2', y: 90 },
    { x: '3', y: 50 },
    { x: '4', y: 70 },
  ];
  const dataLineChart4 = [
    { x: '1', y: 70 },
    { x: '2', y: 65 },
    { x: '3', y: 100 },
    { x: '4', y: 70 },
  ];

  const dataPieChart1 = [
    { label: 'Option A', value: 70 },
    { label: 'Option B', value: 30 },
  ];

  const dataPieChart2 = [
    { label: 'Option A', value: 4.1 },
    { label: 'Option B', value: 3 },
  ];


    //------------------------------------------------------------
    //MAP
    const mapContainer = useRef();

    const [mapLongitude, setMapLongitude] = useState(-121.91599);
    const [mapLatitude, setMapLatitude] = useState(37.36765);
    const [mapZoom, setMapZoom] = useState(13);
    const [map, setMap] = useState({});

    useEffect(() => {
        console.log(tomtom)
        let map = tomtom.map({
            key: "SAs8GubigOjo4UwoTk7tG4sXMPosF8uU",
            source: "raster",
            container: mapContainer.current,
            center: [-123.12816828788911, 49.27892695457111], //49.27892695457111, -123.12816828788911
            zoom: 12
        });
        return () => {
            map.remove();
        };
    }, []);
    //------------------------------------------------------------

  return (
    <div className={statsIsOpen ? 'statsModalContainer' : 'hide'}>
                  <div className='closePostModal' onClick={toggleStats} >X</div>
      <div className='statsModal'>
        <div className='statsModalTitle'>Insights for "Downtown, Vancouver" </div>
        <div className='statsModalInfoContainer'>

          <div className='statsModalsection1'>
            <div className='statsModalStatsSnippetsContainer'>

              {/* ------snippet--------- */}
              <div className='statsModalStatsSnippets'>
                <div className='statsModalSnippetPart1'>
                  <div className='statsModalSnippetTitle'>Average Sold Price</div>
                  <div className='statsModalSnippetPrice'>$ 4.829</div>
                </div>
                <div className='statsModalSnippetPart2'>
                  <div id="line-chart-1">
                    <LineChart data={dataLineChart1} chartId={'line1'}></LineChart>
                  </div>
                </div>
              </div>

              {/* ------snippet--------- */}
              <div className='statsModalStatsSnippets'>
                <div className='statsModalSnippetPart1'>
                  <div className='statsModalSnippetTitle'>Sold properties last year</div>
                  <div className='statsModalSnippetPrice'>82</div>
                </div>
                <div className='statsModalSnippetPart2'>
                  <div id="line-chart-2">
                    <LineChart data={dataLineChart2} chartId={'line2'}></LineChart>
                  </div>
                </div>
              </div>

              {/* ------snippet--------- */}
              <div className='statsModalStatsSnippets'>
                <div className='statsModalSnippetPart1'>
                  <div className='statsModalSnippetTitle'>Average Rent</div>
                  <div className='statsModalSnippetPrice'>$ 6.114 <span style={{ fontSize: '0.6rem' }}>/sqm</span></div>
                </div>
                <div className='statsModalSnippetPart2'>
                  <div id="line-chart-3">
                    <LineChart data={dataLineChart3} chartId={'line3'}></LineChart>
                  </div>
                </div>
              </div>

              {/* ------snippet--------- */}
              <div className='statsModalStatsSnippets'>
                <div className='statsModalSnippetPart1'>
                  <div className='statsModalSnippetTitle'>Yearly Sales Price Changee</div>
                  <div className='statsModalSnippetPrice'>-0.47 %</div>
                </div>
                <div className='statsModalSnippetPart2'>
                  <div id="line-chart-4">
                    <LineChart data={dataLineChart4} chartId={'line4'}></LineChart>
                  </div>
                </div>
              </div>

            </div>
            <div className='chartContainer'>
              <div className='chartBarTitle'>Units Listed per Sale / Average Price</div>
            <BarChart></BarChart>
            </div>
            <div className='statsModalPieCharts'>
              <div className='statsModalPieChartsTitle'>Price per SQFT / Capitalization Rate (%)</div>
              <div className='statsModalPieChartsSection'>

                <div className='pieChartCircleGrid'>
                  <div className='pieCharCircle'>
                    <div className='pieChartDesc'>Capitalization Rate</div>
                    <div className='pieChartRender'>
                      <PieChart data={dataPieChart1} id="pie-chart-1" width={15} height={15} text={'70%'} />
                    </div>
                  </div>
                  <div className='pieCharCircle'>
                    <div className='pieChartDesc'>Land to building ratio</div>
                    <div className='pieChartRender'>
                    <PieChart data={dataPieChart2} id="pie-chart-2"   width={15} height={15} text={'4:3'}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='statsModalsection2'>
            <div className='statsModalMapContainer'>
            <div ref={mapContainer}  className='tomMapStatModal'/>
            </div>
          </div>
        </div>



      </div>
    </div>
  );

}

export default StatsModal;
