import {
  DesktopWindowsRounded,
  VideoCameraFrontRounded,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";

type VideoSourcePreviewCardProps = {
  videoSource: CaptureMediaSource;
};
export default function VideoSourcePreviewCard(
  props: VideoSourcePreviewCardProps
) {
  const { videoSource } = props;
  const elementRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    // This is jank but TS won't let us pass in proper constraints otherwise
    const mediaDevices = navigator.mediaDevices as any;
    let constraints;
    switch (videoSource.type) {
      case "screen":
      case "window":
        constraints = {
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: videoSource.id,
            },
          },
        };
        break;
      case "videoinput":
        constraints = {
          video: {
            sourceID: videoSource.id,
            frameRate: 15,
          },
        };
        break;
    }
    mediaDevices.getUserMedia(constraints).then((stream: MediaStream) => {
      if (elementRef.current !== undefined) {
        stream.getVideoTracks()[0].applyConstraints({
          frameRate: videoSource.type != "videoinput" ? 15 : 30,
        });
        const video = elementRef.current;
        video.srcObject = stream;
        video.onloadedmetadata = (e) => video.play();
      }
    });
  }, []);

  let icon;
  switch (videoSource.type) {
    case "screen":
      icon = <DesktopWindowsRounded />;

      break;
    case "window":
      icon = <img src={videoSource.iconDataURL} width={24} height={24} />;
      break;
    case "videoinput":
      icon = <VideoCameraFrontRounded />;

      break;
  }

  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        component="video"
        ref={elementRef}
        sx={{ width: "100%", height: "auto", aspectRatio: "1.7px" }}
      />
      <CardContent>
        <Box display="flex" alignItems="center">
          {icon}
          <Box mx={0.5} />
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            noWrap
            sx={{
              overflow: "hidden",
              maxLines: 1,
              marginBottom: 0,
            }}
          >
            {videoSource.label}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={window.electron.ipcRenderer.record}
        >
          Record
        </Button>
      </CardActions>
    </Card>
  );
}

{
  /*  */
}
