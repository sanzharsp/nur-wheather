import DemoPie from '../diagramm/charts'
import { Card } from 'antd';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';
import {LeftOutlined } from  '@ant-design/icons';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';



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
            return ${datum.night}个;
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
            return ${datum.day}个;
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
  
  

  
        <Breadcrumbs aria-label="breadcrumb">
   
   <Link
     underline="hover"
     color="inherit"
    
   >    <a
   href='https://nur-ai-weather.vercel.app/'
  
 >
          <Button variant="contained"   >
        <LeftOutlined />
    
          Артқа
        
        </Button>
        </a>
   </Link>
   <Typography color="text.primary"> <Button variant="contained" >Деректер анализі    </Button></Typography>
 </Breadcrumbs>
       

  <DemoPie />
  <Card title="Күндіз бен түнгі (2014-2023) температуранын орташа көрсеткіші" >
  <DualAxes  {...config} />
  </Card>

      </Card>
      )
};

export default Chart;

ReactDOM.render(<Chart />, document.getElementById('root'));