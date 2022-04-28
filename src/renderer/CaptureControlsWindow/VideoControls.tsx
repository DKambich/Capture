import { Box, IconButton, Typography } from "@material-ui/core";
import {
  CloseRounded,
  DragIndicatorRounded,
  PauseRounded,
  PlayArrowRounded,
  StopRounded,
} from "@material-ui/icons";
import React, { useState } from "react";

export default function VideoControls() {
  const [paused, setPaused] = useState(false);
  console.log(window);
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <DragIndicatorRounded className="title-bar" />
        <Typography variant="subtitle1" component="h2">
          00:00:00
        </Typography>

        <IconButton onClick={() => setPaused(!paused)}>
          {paused ? <PlayArrowRounded /> : <PauseRounded />}
        </IconButton>
        <IconButton>
          <StopRounded />
        </IconButton>
        <IconButton
          onClick={() => window.captureControls.ipcRenderer.closeWindow()}
        >
          <CloseRounded />
        </IconButton>
      </Box>
    </>
  );
}
