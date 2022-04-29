import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  IconButton,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DesktopWindowsRounded,
  MenuRounded,
  MicRounded,
  SpeakerRounded,
  VideoCameraFrontRounded,
  WebRounded,
} from "@mui/icons-material";
import * as React from "react";
import * as ReactDOM from "react-dom";

function App() {
  const [mediaData, setMediaData] = React.useState<CaptureMediaSource[]>([]);
  const [videoID, setVideoID] = React.useState("");
  console.log(videoID);
  const [data, setData] = React.useState([]);

  const [stream, setStream] = React.useState(null);

  React.useEffect(() => {
    refreshMedia();
  }, []);

  const audioInputDevices = mediaData.filter((e) => e.type === "audioinput");
  const audioOutputDevices = mediaData.filter((e) => e.type === "audiooutput");
  const videoOutputDevices = mediaData.filter((e) => e.type === "videoinput");
  const windowOutputDevices = mediaData.filter((e) => e.type === "window");
  const screenOutputDevices = mediaData.filter((e) => e.type === "screen");

  async function refreshMedia() {
    const displayMedia = await window.electron.ipcRenderer.getMediaSources();
    const ioDevices = await navigator.mediaDevices.enumerateDevices();

    setMediaData([
      ...displayMedia.map(
        (media): CaptureMediaSource => ({
          id: media.id,
          label: media.name,
          type: media.type,
          iconDataURL: media.iconDataURL,
        })
      ),
      ...ioDevices.map(
        (device): CaptureMediaSource => ({
          id: device.deviceId,
          label: device.label,
          type: device.kind,
          iconDataURL: null,
        })
      ),
    ]);
  }

  async function getStreamfromMediaSource(source: CaptureMediaSource) {
    // This is jank but TS won't let us pass in proper constraints otherwise
    const mediaDevices = navigator.mediaDevices as any;
    let constraints;
    switch (source.type) {
      case "screen":
      case "window":
        constraints = {
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: source.id,
            },
          },
        };
        break;
      case "videoinput":
        constraints = {
          video: {
            sourceID: source.id,
          },
        };
        break;
    }
    return await mediaDevices.getUserMedia(constraints);
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuRounded />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container p={1} spacing={1}>
        <Grid item xs={12} sm={6}>
          <Select
            sx={{ width: "100%", maxWidth: "100%" }}
            value={videoID}
            onChange={(e) => {
              setVideoID(e.target.value);
              getStreamfromMediaSource(
                mediaData.find((media) => media.id === e.target.value)
              ).then(setStream);
            }}
          >
            <ListSubheader>
              <Box display="flex" alignItems="center">
                <DesktopWindowsRounded fontSize="small" />
                <Box mx={0.5} />
                Screens
              </Box>
            </ListSubheader>
            {screenOutputDevices.map((e) => (
              <MenuItem value={e.id}>{e.label}</MenuItem>
            ))}
            <ListSubheader>
              <Box display="flex" alignItems="center">
                <WebRounded fontSize="small" />
                <Box mx={0.5} />
                Windows
              </Box>
            </ListSubheader>
            {windowOutputDevices.map((e) => (
              <MenuItem value={e.id}>
                <img src={e.iconDataURL} width={16} height={16} />
                <Box mx={0.5} />
                {e.label}
              </MenuItem>
            ))}
            <ListSubheader>
              <Box display="flex" alignItems="center">
                <VideoCameraFrontRounded fontSize="small" />
                <Box mx={0.5} />
                Video Input
              </Box>
            </ListSubheader>
            {videoOutputDevices.length === 0 ? (
              <MenuItem disabled={true}>No Video Ouput Devices Found</MenuItem>
            ) : (
              videoOutputDevices.map((e) => (
                <MenuItem value={e.id}>{e.label}</MenuItem>
              ))
            )}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select sx={{ width: "100%", maxWidth: "100%" }}>
            <ListSubheader>
              <Box display="flex" alignItems="center">
                <MicRounded fontSize="small" />
                <Box mx={0.5} />
                Audio Input Devices
              </Box>
            </ListSubheader>
            {audioInputDevices.map((e) => (
              <MenuItem value={e.id}>{e.label}</MenuItem>
            ))}
            <ListSubheader>
              <Box display="flex" alignItems="center">
                <SpeakerRounded fontSize="small" />
                <Box mx={0.5} />
                Audio Output Devices
              </Box>
            </ListSubheader>
            {audioOutputDevices.map((e) => (
              <MenuItem value={e.id}>{e.label}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Box m={1}>
        <Button variant="contained" color="primary" onClick={refreshMedia}>
          Refresh Displays
        </Button>
      </Box>
      <video
        ref={(video) => {
          if (stream != null && video != null) {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => video.play();
          }
        }}
        width={800}
        height={600}
      />
      <Grid container spacing={2} p={1}>
        {screenOutputDevices.map((e) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={e.id}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }}
                // src={e.thumbnailDataURL}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  noWrap
                  sx={{
                    overflow: "hidden",
                    maxLines: 1,
                  }}
                >
                  {e.label}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {e.iconDataURL != null ? (
                    <img src={e.iconDataURL} width={24} height={24} />
                  ) : (
                    <DesktopWindowsRounded />
                  )}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {e.id}
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
          </Grid>
        ))}
      </Grid>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
