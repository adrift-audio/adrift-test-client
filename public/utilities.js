const BACKEND_ENDPOINT = 'http://localhost:5611';
const CLIENT_TYPE = 'mobile';
const WEBSOCKETS_ENDPOINT = 'http://localhost:5622';

const EVENTS = {
  AVAILABLE_PLAYLIST: 'AVAILABLE_PLAYLIST',
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  DISCONNECT: 'disconnect',
  PLAY_NEXT: 'PLAY_NEXT',
  SWITCH_TRACK: 'SWITCH_TRACK',
};

const decodeMagnet = (encoded = '') => window.atob(encoded);

const getToken = () => localStorage.getItem('token');

const setToken = (token = '') => localStorage.setItem('token', token);
