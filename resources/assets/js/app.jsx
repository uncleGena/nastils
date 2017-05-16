import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Clients from './components/Clients'
import Spends from './components/Spends'
import Orders from './components/Orders'


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


      <Router>
        <div>
          <Header />
          <div>  
            <Route exact path="/"  component={Home}/>
            <Route path="/clients" component={Clients}/>
            <Route path="/spends"  component={Spends}/>
            <Route path="/orders"  component={Orders}/>
          </div>
        </div>
      </Router>
    </div>

  </MuiThemeProvider>,
  document.getElementById('app')
);


// TODO test theme changing.
