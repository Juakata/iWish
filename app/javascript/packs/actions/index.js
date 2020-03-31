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
const ADD_WISH = 'ADD_WISH';
const OPEN_MENU = 'OPEN_MENU';

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

const addWish = wish => ({
  type: ADD_WISH,
  wish,
});

const openMenu = open => ({
  type: OPEN_MENU,
  open,
});

export {
  createSession, destroySession, getFaces, createProfile, addWish, openMenu,
};
