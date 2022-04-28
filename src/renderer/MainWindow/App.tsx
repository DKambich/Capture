import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import MenuIcon from "@material-ui/icons/Menu";

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
}));

function App() {
  console.log(window);
  const classes = useStyles();
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
        onClick={() => window.electron.ipcRenderer.myPing()}
      >
        Hello World
      </Button>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
