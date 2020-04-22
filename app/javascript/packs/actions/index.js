import Face from '../assets/bakiFace.png';
import Face2 from '../assets/faces/woman1.jpg';
import Face3 from '../assets/faces/man1.jpg';
import Face4 from '../assets/faces/woman2.jpg';
import Face5 from '../assets/faces/man3.jpg';
import Face6 from '../assets/faces/woman3.jpg';
import Face7 from '../assets/faces/man4.jpg';
import Face8 from '../assets/faces/woman4.jpg';
import Face9 from '../assets/faces/man5.jpg';
import Face10 from '../assets/faces/woman5.jpg';
import Face11 from '../assets/faces/man6.jpg';
import Face12 from '../assets/faces/woman6.png';
import Face13 from '../assets/faces/man7.jpg';
import Face14 from '../assets/faces/woman7.png';
import Face15 from '../assets/faces/man8.jpg';
import Face16 from '../assets/faces/woman8.jpg';
import Face17 from '../assets/faces/man2.jpg';
import Face18 from '../assets/faces/woman9.jpg';

const CREATE_SESSION = 'CREATE_SESSION';
const DESTROY_SESSION = 'DESTROY_SESSION';
const GET_FACES = 'GET_FACES';
const CREATE_PROFILE = 'CREATE_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const ADD_WISH = 'ADD_WISH';
const OPEN_MENU = 'OPEN_MENU';
const UPDATE_WISH = 'UPDATE_WISH';
const DELETE_WISH = 'DELETE_WISH';
const CREATE_REQUESTS = 'CREATE_REQUESTS';
const ADD_NEW = 'ADD_NEW';
const ADD_SENT = 'ADD_SENT';
const REMOVE_NEW = 'REMOVE_NEW';
const REMOVE_SENT = 'REMOVE_SENT';
const REMOVE_RECEIVED = 'REMOVE_RECEIVED';
const ADD_FRIEND = 'ADD_FRIEND';
const REMOVE_FRIEND = 'REMOVE_FRIEND';
const ADD_WISHESGIVERS = 'ADD_WISHESGIVERS';
const ADD_GIVER = 'ADD_GIVER';
const REMOVE_GIVER = 'REMOVE_GIVER';
const CREATE_MYEVENTS = 'CREATE_MYEVENTS';
const CREATE_ALLEVENTS = 'CREATE_ALLEVENTS';
const CREATE_COMINGEVENTS = 'CREATE_COMINGEVENTS';
const ADD_MYEVENT = 'ADD_MYEVENT';
const ADD_ALLEVENT = 'ADD_ALLEVENT';
const ADD_COMINGEVENT = 'ADD_COMINGEVENT';
const REMOVE_ALLEVENT = 'REMOVE_ALLEVENT';
const REMOVE_COMINGEVENT = 'REMOVE_COMINGEVENT';

const faces = [
  { id: 1, src: Face }, { id: 2, src: Face2 }, { id: 3, src: Face3 },
  { id: 4, src: Face4 }, { id: 5, src: Face5 }, { id: 6, src: Face6 },
  { id: 7, src: Face7 }, { id: 8, src: Face8 }, { id: 9, src: Face9 },
  { id: 10, src: Face10 }, { id: 11, src: Face11 }, { id: 12, src: Face12 },
  { id: 13, src: Face13 }, { id: 14, src: Face14 }, { id: 15, src: Face15 },
  { id: 16, src: Face16 }, { id: 17, src: Face17 }, { id: 18, src: Face18 },
];

const createSession = user => ({
  type: CREATE_SESSION,
  user,
});

const destroySession = () => ({
  type: DESTROY_SESSION,
});

const getFaces = () => ({
  type: GET_FACES,
  faces,
});

const createProfile = profile => ({
  type: CREATE_PROFILE,
  profile,
});

const updateProfile = (name, birthday, picture) => ({
  type: UPDATE_PROFILE,
  name,
  birthday,
  picture,
});

const addWish = wish => ({
  type: ADD_WISH,
  wish,
});

const updateWish = wish => ({
  type: UPDATE_WISH,
  wish,
});

const deleteWish = id => ({
  type: DELETE_WISH,
  id,
});

const openMenu = open => ({
  type: OPEN_MENU,
  open,
});

const createRequests = ({
  friends, received, newRequests, sent,
}) => ({
  type: CREATE_REQUESTS,
  friends,
  received,
  newRequests,
  sent,
});

const addSent = sent => ({
  type: ADD_SENT,
  sent,
});

const addNew = newRequest => ({
  type: ADD_NEW,
  newRequest,
});

const removeNew = id => ({
  type: REMOVE_NEW,
  id,
});

const removeSent = id => ({
  type: REMOVE_SENT,
  id,
});

const removeReceived = id => ({
  type: REMOVE_RECEIVED,
  id,
});

const addFriend = friend => ({
  type: ADD_FRIEND,
  friend,
});

const removeFriend = id => ({
  type: REMOVE_FRIEND,
  id,
});

const addWishesgivers = wishesgivers => ({
  type: ADD_WISHESGIVERS,
  wishesgivers,
});

const addGiver = (profile, wish, giver) => ({
  type: ADD_GIVER,
  profile,
  wish,
  giver,
});

const removeGiver = (profile, wish, giver) => ({
  type: REMOVE_GIVER,
  profile,
  wish,
  giver,
});

const addMyevents = event => ({
  type: ADD_MYEVENT,
  event,
});

const addAllevent = event => ({
  type: ADD_ALLEVENT,
  event,
});

const addComingevent = (event, profile) => ({
  type: ADD_COMINGEVENT,
  event,
  profile,
});

const removeAllevent = id => ({
  type: REMOVE_ALLEVENT,
  id,
});

const removeComingevent = id => ({
  type: REMOVE_COMINGEVENT,
  id,
});

const createMyEvents = myevents => ({
  type: CREATE_MYEVENTS,
  myevents,
});

const createAllEvents = allevents => ({
  type: CREATE_ALLEVENTS,
  allevents,
});

const createComingevents = comingevents => ({
  type: CREATE_COMINGEVENTS,
  comingevents,
});

export {
  createSession, destroySession, getFaces, createProfile, addWish, openMenu,
  updateWish, deleteWish, createRequests, addSent, addNew, removeNew, removeSent,
  removeReceived, addFriend, removeFriend, addWishesgivers, addGiver, removeGiver,
  addMyevents, addAllevent, createMyEvents, createAllEvents, updateProfile,
  removeAllevent, createComingevents, addComingevent, removeComingevent,
};
