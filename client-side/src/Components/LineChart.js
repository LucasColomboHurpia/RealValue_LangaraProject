import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './ComponentStyles/StatsModal.css'

const LineChart = ({ data, chartId }) => {
    const ref = useRef(null);

    // Set up state and refs as needed

    useEffect(() => {

    // Set up the D3 chart
    const margin = { top: 10, right: 10, bottom: 15, left: 20 };
    const width = 130 - margin.left - margin.right;
    const height = 70 - margin.top - margin.bottom;

    const svg = d3.select(`#${chartId}`)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Set up the scales and axes
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.x))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    // Add the line
    const line = d3.line()
        .x(d => xScale(d.x) + xScale.bandwidth() / 2)
        .y(d => yScale(d.y));

    svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);

        // Style the chart
        svg.selectAll('.domain')
            .style('stroke', 'gray');
        svg.selectAll('.tick line')
            .style('stroke', 'gray');
        svg.selectAll('.line')
            .style('fill', 'none')
            .style('stroke', 'white')
            .style('stroke-width', '3px');
        svg.selectAll('.x-axis .domain, .x-axis .tick line')
            .style('display', 'none'); // Hide the X axis
        svg.selectAll('.y-axis .domain, .y-axis .tick line')
            .style('display', 'none'); // Hide the Y axis
            svg.selectAll('.x-axis text, .y-axis text')
            .style('display', 'none'); // Hide the numbers in the X and Y axis

}, []);

    return (
        <div id={chartId}>
        </div>
    );
};

export default LineChart;
