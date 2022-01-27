import './App.css';
import React, { useState } from "react";
import app from './firebase.js';
import { getDatabase, ref, set, onValue } from "firebase/database";

// Get a reference to the database service
const db = getDatabase(app);

// GET user data
// const users = ref(db, 'users/');
// onValue(users, (snapshot) => {
//   const data = snapshot.val();
//   console.log("LESS NESTED DATA")
//   console.log(data);

//   const user = Object.values({ users : 1231});
//   const summited = data[user].summits;
//   console.log(Object.keys(summited));
// });

const nested = ref(db, 'users_nested/');
onValue(nested, (snapshot) => {
  const data = snapshot.val();
  console.log("MORE NESTED DATA")
  console.log(data)

  const user = Object.values({ users_nested : "UserB"});
  const summited = data[user].Summited;
  console.log(Object.keys(summited));
});

// const mountains = ref(db, 'mountains/');
// onValue(mountains, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data)

//   const mtns = Object.keys(data)
//   console.log(mtns)
// });

// Add data
// function writePeakData(rank, name, elev, coord, range) {
//   set(ref(db, 'mountains/' + name), {
//     name: name,
//     elev: elev,
//     coord: coord,
//     rank : rank,
//     range: range
//   });
// };
// writePeakData(1, "Mount Rainier", "14411", ["46.852947", " -121.760424"], "Mount Rainier Area");

const Example = () => {
  const [text, setText] = useState({text : ""});

  const updateText = (e) => {
    setText(e.target.value);
  };

  // Add data
  function writePeakData(rank, name, elev, coord, range) {
    set(ref(db, 'mountains/' + name), {
      name: name,
      elev: elev,
      coord: coord,
      rank : rank,
      range: range
    });
  };
  
  return (
    <>
      <input type='text' onChange={updateText}></input>
      <button onClick={writePeakData}>Save</button>
    </>
  );
};


function App() {
  return (
    <div>
      <h1>HOW DOES IT WORK?</h1>
      <Example />
    </div>
  );
}

export default App;
