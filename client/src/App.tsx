import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReadBookPage from "./pages/ReadBookPage";
import EditBookPage from "./pages/EditBookPage";

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={ReadBookPage}/>
          <Route exact path='/edit' component={EditBookPage}/>
      </Switch>
    </Router>
  );
}

export default App;
