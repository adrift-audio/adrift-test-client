const connection = io.connect(
  WEBSOCKETS_ENDPOINT,
  {
    auth: {
      token: null,
    },
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    withCredentials: true,
  },
);

async function Sockets(token) {
  connection.auth.token = token;

  await connection.connect();

  connection.on(
    EVENTS.CONNECT,
    () => {
      console.log('-- connected to WS server with id', connection.id);


      connection.emit(
        EVENTS.CLIENT_CONNECTED,
        {
          issuer: CLIENT_TYPE,
          client: CLIENT_TYPE,
        },
      );
    },
  );

  connection.on(EVENTS.CONNECT_ERROR, (error) => {
    console.log('Error connecting to the sockets:', error);
    return connection.close();
  });

  connection.on(EVENTS.SWITCH_TRACK, (data) => {
    const decodedMagnet = decodeMagnet(data.link);
    return downloadTorrent(decodedMagnet, data.track);
  });

  connection.on(
    EVENTS.ERROR, 
    (payload) => console.log('Error in response:', payload.error),
  );
}
