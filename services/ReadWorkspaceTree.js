import fs from "fs";
import path from "path";

export const createDirectoryItem = (name, fullpath, children = []) => {
  return {
    name: name,
    fullpath: fullpath,
    children: children,
  };
};

export const getChildDir = (folderPath) => {
  let names = fs.readdirSync(folderPath);
  let children = [];
  names.map((name) => {
    let fullpath = path.join(folderPath, name);
    let stat = fs.statSync(fullpath);
    if (stat.isDirectory()) {
      children.push(createDirectoryItem(name, fullpath));
    }
  });
  return children;
};
