import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import "../assets/css/App.css";
import { getChildDir } from "../../services/ReadWorkspaceTree";

function App() {
  const [dirItemParent, setDirItemParent] = useState([]);

  ipcRenderer.send("workspace:on", true);

  const openDialog = () => {
    ipcRenderer.send("workspace:open", true);
  };

  useEffect(() => {
    ipcRenderer.on("workspace:folder-path", (event, arg) => {
      console.log(arg);
      console.log(getChildDir(arg[0]));
      setDirItemParent(getChildDir(arg[0]));
    });
  }, []);

  return (
    <div>
      <h1>ASR Development Helper</h1>
      <p>Recent Workspace</p>
      <RecentWorkspace />
      <button onClick={openDialog}>Open File</button>
      {dirItemParent.length > 0 ? (
        <DirTree
          directoryItem={dirItemParent.fullpath}
          onFindChild={getChildDir}
        />
      ) : (
        <p>Zero</p>
      )}
    </div>
  );
}

function RecentWorkspace() {
  // use state to save data from main thread
  const [workspaces, setWorkspaces] = useState([]);

  ipcRenderer.send("workspace:recent-get", true);
  useEffect(() => {
    ipcRenderer.on("workspace:recent-post", (event, workspaces) => {
      setWorkspaces(workspaces); // set the state into renderer variabel
    });
  }, [ipcRenderer, setWorkspaces]);

  return (
    <div>
      <ul id="listWorkspace">
        {workspaces.map((workspace) => (
          <ReactWorkspacesList key={workspace.path} path={workspace.path} />
        ))}
      </ul>
    </div>
  );
}

function ReactWorkspacesList(props) {
  const { path } = props;
  return <li>{path}</li>;
}

function DirTree(props) {
  const { directoryItem, onFindChild } = props;
  console.log(directoryItem);
  const [dirItem, setDirItem] = useState(directoryItem);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let child = onFindChild(dirItem.fullpath);
    console.log(child);

    let copy = dirItem;
    copy.children = child;

    setDirItem(copy);
  }, [setDirItem]);

  const handleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <ul>
      <li>
        <span
          onClick={() => {
            handleExpand;
          }}
        >
          {isExpanded ? "Tutup" : "Buka"}
        </span>
        <span>{dirItem.name}</span>
      </li>
      <ul>
        {isExpanded &&
          dirItem.map((item) => (
            <DirTree
              key={item.fullpath}
              directoryItem={item}
              onFindChild={getChildDir}
            />
          ))}
      </ul>
    </ul>
  );
}

// function openDialog() {
//   ipcRenderer.send("workspace:open", true);
// }

export default App;
