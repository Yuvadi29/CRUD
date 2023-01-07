import React from 'react';
import { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useEffect } from 'react';


const App = () => {


  useEffect(() => {
    axios.get('http://localhost:5000/display').then((res) => {
      setList(res.data);
    });
  }, []);


  const [foodName, setFoodName] = useState('');
  const [dayssinceEaten, setDaysSinceEaten] = useState(0);

  const [list, setList] = useState([]);

  const Add = async () => {
    try {
      await axios.post('http://localhost:5000/add', {
        foodName: foodName,
        daysSinceEaten: dayssinceEaten,
      })
      alert("Data Added Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='App'>
      <h1>CRUD APP WITH MERN</h1>

      <h2>Add New Food</h2>
      <input type="text" onChange={(e) => {
        setFoodName(e.target.value);
      }} />
      <h2>Days Since Eaten</h2>
      <input type="number" onChange={(e) => {
        setDaysSinceEaten(e.target.value);
      }} />
      <button onClick={Add}>Add To List</button>

      <h2>Food List</h2>
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">Food Name</th>
            <th scope="col">Days Since the Food has been Eaten</th>
          </tr>
        </thead>
      </table> */}
      {list.map((value, key) => {
        return <div key={key}>
          <div className="container">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Food Name</div>
                <div className="col col-2">Days Since Eaten</div>
              </li>
              <li className="table-row">
                <div className="col col-1" >{value.foodName}</div>
                <div className="col col-2" >{value.daysSinceEaten}</div>
              </li>
            </ul>
          </div>
        </div>
      })}
    </div>
  )
}

export default App