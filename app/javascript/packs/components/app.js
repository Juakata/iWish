import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SigninForm from '../containers/signinForm';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <SigninForm />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
