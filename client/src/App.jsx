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
  const [newfoodName, setNewFoodName] = useState('');
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

  // const Delete = async () => {
  //   try {
  //     await axios.post('http://localhost:5000/delete', {
  //       foodName: foodName,
  //       daysSinceEaten: dayssinceEaten,
  //     })
  //     alert("Deleted Data Successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const Update = async (id) => {
    try {
      await axios.put('http://localhost:5000/update', {
        id: id,
        newfoodName: newfoodName
      })
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
            <input type="text" placeholder='Replace Name' onChange={(e) => setNewFoodName(e.target.value)} />
            <button onClick={() => Update(value._id)}>Update Food</button>
            {/* <button onClick={Delete}>Delete</button> */}
          </div>
        </div>
      })}
    </div>
  )
}

export default App