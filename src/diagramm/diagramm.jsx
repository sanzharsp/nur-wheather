import DemoPie from '../diagramm/charts'
import { Card } from 'antd';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';


const Chart = () => {
  const data = [
    {
      year: '2014',
      night: 10.5,
      day: 17,
    },
    {
      year: '2015',
      night: 12.06,
      day: 18.86,
    },
    {
      year: '2016',
      night: 12,
      day: 17,
    },
    {
      year: '2017',
      night: 14,
      day: 19,
    },
    {
      year: '2018',
      night: 10,
      day: 13,
    },
    {
      year: '2019',
      night: 12,
      day: 18,
    },
    {
      year: '2020',
      night: 17,
      day: 22,
    },
    {
      year: '2021',
      night: 15,
      day: 19,
    },
    {
      year: '2022',
      night: 13,
      day: 20,
    },
    {
      year: '2023',
      night: 13.29,
      day: 18.38,
    },
  ];
  const config = {
    data: [data, data],
    xField: 'year',
    yField: ['night', 'day'],
    geometryOptions: [
      {
        geometry: 'line',
        smooth: false,
        color: '#5B8FF9',
        label: {
          formatter: (datum) => {
            return `${datum.night}个`;
          },
        },
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
      },
      {
        geometry: 'line',
        smooth: true,
        color: '#5AD8A6',
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        label: {
          formatter: (datum) => {
            return `${datum.day}个`;
          },
        },
        point: {
          shape: 'circle',
          size: 4,
          style: {
            opacity: 0.5,
            stroke: '#5AD8A6',
            fill: '#fff',
          },
        },
      },
    ],
  }; 
  return (<Card>
  <DemoPie />
  <Card title="Күндіз бен түнгі (2014-2023) температуранын отрша көрсеткіші" >
  <DualAxes  {...config} />
  </Card>

      </Card>
      )
};

export default Chart;

ReactDOM.render(<Chart />, document.getElementById('root'));
