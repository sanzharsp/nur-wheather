import App from '../App'
import {useRoutes} from "react-router-dom";
import Chart from '../diagramm/diagramm';

const Routings = (props) => {

    let routes = useRoutes([
      { path: "/", element: <App/> },  
      { path: "/charts" , element: <Chart/>},

    ]);
    return routes;

}
export default Routings