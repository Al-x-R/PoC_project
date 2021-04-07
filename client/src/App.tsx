import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopBar from "./components/TopBar/TopBar";
import Book from "./components/Book/Book";

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
          <Route exact path='/' component={Book}/>
          <Route exact path='/edit' component={Book}/>
      </Switch>
    </Router>
  );
}

export default App;
