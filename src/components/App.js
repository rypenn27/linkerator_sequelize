import React, { useState, useEffect } from "react";
import { Header } from "../components";

// import {
//   getSomething
// } from '../api';

const App = () => {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   getSomething()
  //     .then((response) => {
  //       setMessage(response.message);
  //     })
  //     .catch((error) => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
