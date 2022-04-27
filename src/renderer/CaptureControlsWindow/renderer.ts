// Add this to the end of the existing file
import React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();
import VideoControls from "./VideoControls";
ReactDOM.render(
  React.createElement(VideoControls),
  document.getElementById("root")
);
