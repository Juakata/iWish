import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SigninForm extends React.Component {
  componentDidMount() {
    axios.get('v1/sessions?id=12345')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <h1>Hola</h1>
    );
  }
}

export default connect(null, null)(SigninForm);
