import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession, openMenu } from '../actions/index';
import MenuEvents from '../components/menuEvents';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 'myEvents',
      title: '',
      description: '',
      date: '',
      time: '',
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

  myEvents = () => {
    const btn1 = document.getElementById('btn-myEvents');
    const btn2 = document.getElementById('btn-createEvent');
    const btn3 = document.getElementById('btn-comingEvents');
    btn1.style.borderBottom = '4px solid #c73f00';
    btn2.style.borderBottom = '';
    btn3.style.borderBottom = '';
    this.setState({
      render: 'myEvents',
    });
  }

  createEvent = () => {
    const btn1 = document.getElementById('btn-myEvents');
    const btn2 = document.getElementById('btn-createEvent');
    const btn3 = document.getElementById('btn-comingEvents');
    btn1.style.borderBottom = '1px solid grey';
    btn2.style.borderBottom = '4px solid #c73f00';
    btn3.style.borderBottom = '';
    this.setState({
      render: 'createEvent',
    });
  }

  comingEvents = () => {
    const btn1 = document.getElementById('btn-myEvents');
    const btn2 = document.getElementById('btn-createEvent');
    const btn3 = document.getElementById('btn-comingEvents');
    btn1.style.borderBottom = '1px solid grey';
    btn2.style.borderBottom = '';
    btn3.style.borderBottom = '4px solid #c73f00';
    this.setState({
      render: 'comingEvents',
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    const {
      render, title, description, date, time,
    } = this.state;
    const { destroySession } = this.props;
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
        <div className="container remove-padding">
          <MenuEvents
            myEvents={this.myEvents}
            createEvent={this.createEvent}
            comingEvents={this.comingEvents}
          />
          {render === 'myEvents'}
          {render === 'createEvent' && (
            <form className="event-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                placeholder="Title"
                required
              />
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="Description"
                required
              />
              <input
                type="date"
                name="date"
                value={date}
                onChange={this.handleChange}
                required
              />
              <input
                type="time"
                name="time"
                value={time}
                onChange={this.handleChange}
                required
              />
              <button type="submit">Save</button>
            </form>
          )}
          {render === 'comingEvents'}
        </div>
      </div>
    );
  }
}

Events.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.string.isRequired,
  destroySession: PropTypes.func.isRequired,
  functions: PropTypes.instanceOf(Object).isRequired,
  openMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  openMenu: open => dispatch(openMenu(open)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
