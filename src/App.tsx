import React from 'react';
import './App.css';
import {GetOrderInterface, LoginInterface, LogoutInterface} from "./interfaces/interfaces";
import Login from "./components/auth/Login";

export interface AppProps extends LoginInterface, LogoutInterface, GetOrderInterface{

}

const App: React.FC<AppProps> = (props: AppProps) => {

  return (
    <div className="App">
      <Login {...props} />
    </div>
  );
}

export default App;
