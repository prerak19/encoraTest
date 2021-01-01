import React, { Component } from 'react';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import Login from './components/Login';
import Notes from './components/Notes';
import { Container } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/notes' component={Notes} />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;