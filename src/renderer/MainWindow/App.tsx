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
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { DesktopWindowsRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  cardRoot: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = React.useState<DesktopMediaSource[]>([]);

  React.useEffect(() => {
    window.electron.ipcRenderer.getMediaSources().then((data) => {
      setData(data);
    });
  }, []);
  console.log(data);
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
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
      {data.map((e) => (
        <>
          <Card className={classes.cardRoot}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                src={e.thumbnailDataURL}
                component="img"
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
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Record
              </Button>
            </CardActions>
          </Card>
        </>
      ))}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
