import { Box, IconButton, Typography } from "@mui/material";
import {
  CloseRounded,
  DragIndicatorRounded,
  PauseRounded,
  PlayArrowRounded,
  StopRounded,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";

export default function VideoControls() {
  const [paused, setPaused] = useState(false);
  // Notify main process when window is ready and React is loaded

  const ipcCaptureControls = window.electron.captureControls;

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <DragIndicatorRounded className="drag-handle" />
        <Box mt={0.4}>
          <Typography variant="subtitle1" className="unselectable">
            00:00:00
          </Typography>
        </Box>
        <IconButton
          onClick={() => {
            (paused ? ipcCaptureControls.play : ipcCaptureControls.pause)();
            setPaused(!paused);
          }}
        >
          {paused ? <PlayArrowRounded /> : <PauseRounded />}
        </IconButton>
        <IconButton onClick={ipcCaptureControls.stop}>
          <StopRounded />
        </IconButton>
        <IconButton onClick={ipcCaptureControls.close}>
          <CloseRounded />
        </IconButton>
      </Box>
    </>
  );
}
