import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession, openMenu, addGroup } from '../actions/index';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    const { session, history } = this.props;
    if (session === '' || session === 'destroy') {
      history.push('/');
    }
  }

  componentDidUpdate(prevProps) {
    const { session, history } = this.props;
    if (prevProps.session !== session) {
      history.push('/');
    }
  }

  menu = () => {
    const { functions, openMenu } = this.props;
    const { open } = functions;
    openMenu(open);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const { name } = this.state;
    const { addGroup } = this.props;
    addGroup(name);
  }

  render() {
    const { name } = this.state;
    const { destroySession } = this.props;
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={name}
              placeholder="Group's name"
            />
            <button type="submit">Add Group</button>
          </form>
        </div>
      </div>
    );
  }
}

Groups.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.string.isRequired,
  destroySession: PropTypes.func.isRequired,
  functions: PropTypes.instanceOf(Object).isRequired,
  openMenu: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  openMenu: open => dispatch(openMenu(open)),
  addGroup: name => dispatch(addGroup(name)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups));
