async function Sockets(anchor) {
  $(anchor).empty().append('Connecting to websockets...');

  const connection = io.connect(
    WEBSOCKETS_ENDPOINT,
    {
      autoConnect: false,
      query: {
        token: getToken(),
      },
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      withCredentials: true,
    },
  );

  await connection.connect();

  connection.on(
    'connect',
    () => {
      console.log('Connected to WS');
      $(anchor).empty().append('Websockets connected!');
    },
  );
}
