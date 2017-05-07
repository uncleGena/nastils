import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {BrowserRouter, Route, Link} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'

// for theme changing
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey800} from 'material-ui/styles/colors';

// TODO create random colors for app in separate file
const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
  },
  appBar: {
    height: 50,
  },
});

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Header />
      <Home />
    </div>
  </MuiThemeProvider>,
  document.getElementById('app')
);


// TODO test theme changing.
