import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppState from "./AppState";

const updateStream = new WebSocket("ws://localhost:8080/api/v1/update-stream");

updateStream.onopen = function (event) {
    console.log("Websocket opened", event)
}

updateStream.onmessage = function (event) {
    const message = JSON.parse(event.data)
    console.log("Websocket message received ",message, event)
    alert("Websocket msg received" + message)
}

updateStream.onerror = function(error) {
    console.log("Websocket error", error)
    alert("Websocket error " + error)
}



ReactDOM.render(<AppState />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
