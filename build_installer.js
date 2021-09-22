const { MSICreator } = require("electron-wix-msi");
const path = require("path");

const APP_DIR = path.resolve(__dirname, "./builds/asr-manager-win32-x64");
const OUT_DIR = path.resolve(__dirname, "./builds/windows_installer");

const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,

  // Configure metadata
  description: "Tool for managing ASR repository",
  exe: "asr-manager",
  name: "ASR Manager Tool",
  manufacturer: "Labs 247",
  version: "1.0.0",

  // Configure installer User Interface
  ui: {
    chooseDirectory: true,
  },
});

msiCreator.create().then(function () {
  msiCreator.compile();
});
