import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Breadcrumb, Button } from 'antd';

const DemoPie = () => {
  const data = [
    {
      type: 'Қателік проценті',
      value: 14.4,
    },
    {
      type: 'Дәлдік проценті',
      value: 52.6,
    },
    
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Желінің қателік проценті',
      },
    },
  };
  return (
  <>  
  <Breadcrumb
  items={[
    {
      title: 'Home',
    },
    {
      title: <a href="">Application Center</a>,
    },
    {
      title: <a href="">Application List</a>,
    },
    {
      title: 'An Application',
    },
  ]}
/>
<Pie {...config} />
</>

  )
};

export default DemoPie;

ReactDOM.render(<DemoPie />, document.getElementById('root'));
