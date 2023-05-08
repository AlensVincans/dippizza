import React, {useState, useEffect} from 'react';
import Navibar from './NaviBar.js';

function App() {
  const [data ,setData] = useState([])

  useEffect(() => {
    fetch("/products")
    .then(res => res.json())
    .then(data => {
        setData(data.result_pizza);
        console.log(data);
      });
  }, []);

  return(
  <>
 <Navibar />
  <div className="App">
      {data.map((item, index) => (
        <div key={index}>{item[1]} - {item[2]} <h1>Стоимость: {item[3]}</h1></div>
      ))}

  </div>
 </> 
  );
}

export default App;
