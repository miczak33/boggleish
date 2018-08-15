import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import List from './List';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switcher />
      </div>
    )
  }
}

const Switcher = () => (
  <React.Fragment>
    <Switch>
      <Route path='/board/:boardId' component={Board} />
      <Route path='/' component={List} />
    </Switch>
  </React.Fragment>
);

export default App;
