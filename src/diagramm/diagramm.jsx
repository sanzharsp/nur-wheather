
import { Card } from 'antd';




import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import DemoPie from '../diagramm/charts'


const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'country',
  };

  return <Card>
       <DemoPie/>
    <Area {...config} />
  </Card>
};

export default Chart;

ReactDOM.render(<Chart />, document.getElementById('root'));

