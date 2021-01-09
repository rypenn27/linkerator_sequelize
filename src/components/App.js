import React, { useState, useEffect } from "react";
import { Header, NewLinkForm, Links } from "../components";

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
      {/* <Links /> */}
      <NewLinkForm />
    </div>
  );
};

export default App;
