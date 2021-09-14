// const BACKEND_ENDPOINT = 'http://192.168.2.123:5611';
const BACKEND_ENDPOINT = 'http://localhost:5611';
const CLIENT_TYPE = 'mobile';
// const WEBSOCKETS_ENDPOINT = 'http://192.168.2.123:5622';
const WEBSOCKETS_ENDPOINT = 'http://localhost:5622';

const EVENTS = {
  ADD_FILE: 'ADD_FILE',
  AVAILABLE_PLAYLIST: 'AVAILABLE_PLAYLIST',
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  DISCONNECT: 'disconnect',
  ERROR: 'ERROR',
  PLAY_NEXT: 'PLAY_NEXT',
  REMOVE_ALL: 'REMOVE_ALL',
  REMOVE_FILE: 'REMOVE_FILE',
  SWITCH_TRACK: 'SWITCH_TRACK',
};

const decodeMagnet = (encoded = '') => window.atob(encoded);

const formatDuration = (duration = 0) => {
  const toNumber = Number(duration);
  if (!duration || Number.isNaN(toNumber)) {
    return '--:--';
  }

  const seconds = Math.round(toNumber);
  const fullMinutes = Math.floor(seconds / 60);
  const leftOverSeconds = seconds - (fullMinutes * 60);
  const fullHours = Math.floor(fullMinutes / 60);

  if (fullHours === 0) {
    const formattedMinutes = fullMinutes > 9 ? fullMinutes : `0${fullMinutes}`;
    const formattedSeconds = leftOverSeconds > 9 ? leftOverSeconds : `0${leftOverSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const leftOverMinutes = fullMinutes - (fullHours * 60);
  const formattedHours = fullHours > 9 ? fullHours : `0${fullHours}`;
  const formattedMinutes = leftOverMinutes > 9 ? leftOverMinutes : `0${leftOverMinutes}`;
  const formattedSeconds = leftOverSeconds > 9 ? leftOverSeconds : `0${leftOverSeconds}`;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const getToken = () => localStorage.getItem('token');

const randomize = (array = []) => {
  const mutable = [...array];
  for (let i = mutable.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mutable[i], mutable[j]] = [mutable[j], mutable[i]];
  }
  return mutable;
}

const setToken = (token = '') => localStorage.setItem('token', token);
