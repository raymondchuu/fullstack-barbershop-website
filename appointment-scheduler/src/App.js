import React from 'react';
import logo from './logo.svg';
import 'typeface-roboto';
import Menu from './components/Menu';
import Main from './components/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import AppointmentApp from './components/Appointment';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


function App() {
  const navLinks = [
    {
      text: 'Home', 
      path: '/'
    },
    {
      text: 'About Me',
      path: 'about'
    },
    {
      text: 'Services',
      path: 'services'
    },
    {
      text: 'Book an Appointment',
      path: '/appointment'
    },
    {
      text: 'Contact Me',
      path: 'footer'
    }
  ]

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/appointment">
            <MuiThemeProvider>
              <AppointmentApp />
            </MuiThemeProvider>
          </Route>
          <Route path="/">
            <Menu navLinks={ navLinks }/>
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

