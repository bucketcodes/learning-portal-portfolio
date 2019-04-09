import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layout/App";
import NotLoggedApp from "./app/layout/NotLoggedApp";
import NavBar from "./features/nav/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";
import { Router } from "react-router-dom";
import { SnackbarProvider } from 'material-ui-snackbar-redux'
import history from './app/common/util/history'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#51505c"
    },
    secondary: {
      main: "#659D32"
    }
  },
  root: {
    marginTop: "56px"
  }
});


let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider SnackbarProps={{autoHideDuration: 6500, style: {marginBottom: '10px'} }}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </Router>
      </SnackbarProvider>
    </Provider>,
    document.getElementById("root")
  );
};

let renderNotLogged = () => {
  ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider SnackbarProps={{autoHideDuration: 6500, style: {marginBottom: '10px'} }}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <CssBaseline />
          <NotLoggedApp />
        </MuiThemeProvider>
      </Router>
      </SnackbarProvider>
    </Provider>,
    document.getElementById("root")
  );
};

store.firebaseAuthIsReady.then(() => {
  store.firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      render();
    } else {
      renderNotLogged();
    }
    });
  
});
