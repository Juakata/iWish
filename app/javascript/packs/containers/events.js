import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession, openMenu, addMyevents } from '../actions/index';
import MenuEvents from '../components/menuEvents';
import Wish from '../components/wish';
import Event from '../components/event';
import HumanDate from '../components/humanDate';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 'myEvents',
      title: '',
      description: '',
      date: '',
      time: '',
      openForm: false,
      items: [],
      iTitle: '',
      iDescription: '',
      openWindow: false,
      index: 0,
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
    const {
      session, addMyevents, events, profile,
    } = this.props;
    const {
      title, description, date, time, items,
    } = this.state;
    axios.get(`v1/createevent?email=${session}&title=${title}&description=${description}&date=${date}&time=${time}&items=${items}`)
      .then(response => {
        if (response.data.result === 'Event created') {
          const n = events.myevents.length;
          const myevent = {
            id: n === 0 ? 1 : events.myevents[n - 1].id + 1,
            title,
            description,
            date,
            time,
            profile,
            people: [],
            items,
          };
          addMyevents(myevent);
          this.setState({
            title: '',
            description: '',
            time: '',
            date: '',
            items: [],
          });
        }
      })
      .catch(() => {});
  }

  handleWishList = () => {
    this.setState(state => ({
      openForm: !state.openForm,
      iTitle: '',
      iDescription: '',
    }));
  }

  handleWish = item => {
    this.setState(state => ({
      items: state.items.filter(e => e.id !== item.id),
    }));
  }

  handleItems = () => {
    const { iTitle, iDescription, items } = this.state;
    const item = {
      id: items.length + 1,
      title: iTitle,
      description: iDescription,
      people: [],
    };
    const currentItems = [...items, item];
    this.setState(state => ({
      openForm: !state.openForm,
      iTitle: '',
      iDescription: '',
      items: currentItems,
    }));
  }

  handleWindow = index => {
    this.setState(state => ({
      openWindow: !state.openWindow,
      index,
    }));
  }


  render() {
    const {
      render, title, description, date, time, openForm, items,
      iTitle, iDescription, openWindow, index,
    } = this.state;
    let showItems;
    const { destroySession, events } = this.props;
    if (openWindow) {
      showItems = events.myevents[index].items.map(item => (
        <div key={item.id}>{item.title}</div>
      ));
    }
    const renderMyEvents = events.myevents.map((myevent, index) => (
      <Event
        key={myevent.id}
        currentEvent={myevent}
        date=<HumanDate date={myevent.date} time={myevent.time} />
        my
        add
        seeItems={() => this.handleWindow(index)}
      />
    ));
    const renderItems = items.map(item => (
      <Wish
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        onClick={() => this.handleWish(item)}
      />
    ));
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
        <div className="container remove-padding">
          <MenuEvents
            myEvents={this.myEvents}
            createEvent={this.createEvent}
            comingEvents={this.comingEvents}
          />
          {render === 'myEvents' && (
            <div className="events-cont">
              {renderMyEvents}
            </div>
          )}
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
              {openForm && (
                <div className="cover-img-selector">
                  <div id="wishlistform" className="profile-form-list">
                    <input
                      type="text"
                      name="iTitle"
                      value={iTitle}
                      placeholder="Item's name."
                      onChange={this.handleChange}
                      required
                    />
                    <textarea
                      name="iDescription"
                      value={iDescription}
                      placeholder="Item's description."
                      onChange={this.handleChange}
                      required
                    />
                    <div className="btnsCont">
                      <button type="button" onClick={this.handleWishList}>Close</button>
                      <button type="button" onClick={this.handleItems}>Add</button>
                    </div>
                  </div>
                </div>
              )}
              <div className="cont-title-list">
                <button className="mylist-btn" onClick={this.handleWishList} type="button">
                  <h2 className="title">Items List</h2>
                  <i className="fas fa-plus my-plus" />
                </button>
                <div className="cont-wishes">
                  {renderItems}
                </div>
              </div>
              <button type="submit">Save</button>
            </form>
          )}
          {render === 'comingEvents'}
        </div>
        {openWindow && (
          <div
            type="button"
            tabIndex={0}
            role="button"
            className="cover-img-selector"
            onClick={this.handleWindow}
            onKeyPress={this.onKeyPressHandler}
          >
            <div className="showItems-cont">
              {showItems}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Events.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  events: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.string.isRequired,
  destroySession: PropTypes.func.isRequired,
  functions: PropTypes.instanceOf(Object).isRequired,
  openMenu: PropTypes.func.isRequired,
  addMyevents: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
  events: state.events,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  openMenu: open => dispatch(openMenu(open)),
  addMyevents: myEvent => dispatch(addMyevents(myEvent)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
