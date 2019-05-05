import React from 'react';
import './App.css';
import Login from "./components/auth/Login";
import axios from "axios";

const App: React.FC = (props) => {

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
