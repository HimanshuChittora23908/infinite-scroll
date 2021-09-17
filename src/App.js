import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Manual from './Manual';

export default function App() {
  return (
    <>
      <div className="App">
        <Switch>
          <Route path="/infinite-scroll/" exact component={Manual} />
          <Redirect to="/infinite-scroll/" />
        </Switch>
      </div>
    </>
  );
}
