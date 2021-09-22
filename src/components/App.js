import React from "react";
import { ipcRenderer } from "electron";

import "../assets/css/App.css";

function App() {
  ipcRenderer.send("workspace", "on");

  ipcRenderer.on("resultPath", (event, arg) => {
    console.log(arg);
  });

  return (
    <div>
      <h1>Hello, Electron!</h1>

      <p>
        I hope you enjoy using basic-electron-react-boilerplate to start your
        dev off right!
      </p>
      <button onClick={openDialog}>Open File</button>
    </div>
  );
}

function openDialog() {
  // send async ipc request
  ipcRenderer.send("open-workspace", true);
}

export default App;
