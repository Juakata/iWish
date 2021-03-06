import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';
import rootReducer from './reducers/index';

const data = {
  session: '',
  profile: {},
  functions: { open: true },
  requests: {
    friends: [],
    received: [],
    newRequests: [],
    sent: [],
  },
  wishesgivers: [],
  events: { myevents: [], allevents: [], comingevents: [] },
};

const store = createStore(rootReducer, data);

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('main')),
  );
});
