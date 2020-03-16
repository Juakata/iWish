import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SigninForm from '../containers/signinForm';
import SignupForm from '../containers/signupForm';
import Home from '../containers/home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <SigninForm />} />
        <Route exact path="/signup" render={() => <SignupForm />} />
        <Route exact path="/home" render={() => <Home />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
