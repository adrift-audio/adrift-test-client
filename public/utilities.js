const BACKEND_ENDPOINT = 'http://localhost:5611';
const CLIENT_TYPE = 'web';
const WEBSOCKETS_ENDPOINT = 'http://localhost:5622';

const EVENTS = {
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
};

const getToken = () => localStorage.getItem('token');

const setToken = (token = '') => localStorage.setItem('token', token);
