import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SigninForm from '../containers/signinForm';
import SignupForm from '../containers/signupForm';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <SigninForm />} />
        <Route exact path="/signup" render={() => <SignupForm />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
