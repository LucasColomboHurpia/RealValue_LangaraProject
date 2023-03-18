import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, id, text, width = 50, height = 50 }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(data);

        const svg = d3
            .select(`#${id}`)
            .append('div')
            .classed('svg-container', true) // container class to make it responsive
            .append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `0 0 30 30`) // update the viewBox to a smaller size
            .classed('svg-content-responsive', true) // responsive SVG needs these 2 attributes and no width and height attr
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // set up the d3 pie layout
        const pie = d3.pie().value(d => d.value).padAngle(0.01);

        // create the arcs
        const arc = d3
            .arc()
            .innerRadius(Math.min(width, height) / 4 - 1) // make the center hollow
            .outerRadius(Math.min(width, height) / 2 - 1);

        // create a linear gradient
        const gradient = svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');
        gradient
            .append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#6617E2');
        gradient
            .append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#9D5FFF');

        // create the pie slices
        const slices = svg
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => (i === 0 ? 'url(#gradient)' : '#404080'))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');


        // add the text in the center
        const chartText  = svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '0.2rem')
            .text(`${text}`)
            .attr('fill', 'black')
            .classed('text-pieChart', true);
    }, [data, id, width, height]);

    return <div id={id}></div>;
};

export default PieChart;
