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
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { DesktopWindowsRounded, MenuRounded } from "@mui/icons-material";
import * as React from "react";
import * as ReactDOM from "react-dom";

function App() {
  const [data, setData] = React.useState<DesktopMediaSource[]>([]);

  React.useEffect(() => {
    window.electron.ipcRenderer.getMediaSources().then((data) => {
      setData(data);
    });
  }, []);
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.electron.ipcRenderer.record()}
      >
        Hello World
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          window.electron.ipcRenderer
            .getMediaSources()
            .then((data) => setData(data))
        }
      >
        Refresh Displays
      </Button>
      <Grid container spacing={2}>
        {data.map((e) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card sx={{ width: 345 }}>
              <CardMedia
                component="img"
                height={(345 * 9) / 16}
                src={e.thumbnailDataURL}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {e.name}
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
                <Button size="small" color="primary">
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
