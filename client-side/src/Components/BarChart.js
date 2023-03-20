import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './ComponentStyles/StatsModal.css'

function ChartSection() {
    const ref = useRef();

    const data = [
        { x: '2018', y: 155 },
        { x: '2019', y: 180 },
        { x: '2020', y: 140 },
        { x: '2021', y: 190 },
        { x: '2022', y: 140 },
    ];

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = +svg.attr('width');
        const height = +svg.attr('height');

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.x))
            .range([0, innerWidth])
            .padding(0.5);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.y)])
            .nice()
            .range([innerHeight, 0])


        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));


        g.append('g')
            .call(d3.axisLeft(yScale).ticks(4).tickFormat(d3.format('.2s')))

        g.selectAll('.bar')
            .data(data)
            .enter().append('g')
            .attr('class', 'bar')
            .attr('transform', d => `translate(${xScale(d.x)}, 0)`)
            .append('rect')
            .attr('x', 0)
            .attr('y', d => yScale(d.y))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d.y))
            .attr('rx', 8) // sets the border radius of the bars
            .attr('ry', 8); // sets the border radius of the bars


    }, [data]);

    return (


        <svg ref={ref} width={520} height={200}>
            <style>
                {`
            .bar {
              fill: url(#gradient);
              border-radius: 5px;
            }

            .bar:hover {
              fill: #9D5FFF;
            }

            .axis-x path {
              display: none;
            }

            .axis-x line {
              stroke: #ddd;
              stroke-width: 1;
              shape-rendering: crispEdges;
            }

            .axis-x text {
              font-size: 14px;
            }

            .axis-y path {
              stroke: none;
              fill: none;
            }

            .axis-y line {
              stroke: #ddd;
              stroke-width: 1;
              shape-rendering: crispEdges;
            }

            .axis-y text {
              font-size: 14px;
            }

            .grid line {
              stroke: #eee;
              stroke-opacity: 0.7;
              shape-rendering: crispEdges;
            }

            .grid path {
              stroke-width: 0;
            }
          `}
            </style>
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6617E2" />
                    <stop offset="100%" stopColor="#9D5FFF" />
                </linearGradient>
            </defs>
        </svg>
    );

}

export default ChartSection;






