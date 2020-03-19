import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SigninForm from '../containers/signinForm';
import SignupForm from '../containers/signupForm';
import Home from '../containers/home';
import Profile from '../containers/profile';
import Events from '../containers/events';
import Groups from '../containers/groups';
import Friends from '../containers/friends';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <SigninForm />} />
        <Route exact path="/signup" render={() => <SignupForm />} />
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/events" render={() => <Events />} />
        <Route exact path="/groups" render={() => <Groups />} />
        <Route exact path="/friends" render={() => <Friends />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
