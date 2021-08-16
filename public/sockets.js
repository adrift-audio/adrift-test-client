async function Sockets(anchor) {
  $(anchor).empty().append('Connecting to websockets...');

  const connection = io.connect(
    WEBSOCKETS_ENDPOINT,
    {
      auth: {
        token: getToken(),
      },
      autoConnect: false,
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

      $(anchor).empty().append(`
<div>Websockets connected!</div>
<button
  id="play-next"
  type="button"
>
  Play next
</button>
      `);

      $('#play-next').on('click', () => {
        console.log('play next out');
        connection.emit(EVENTS.PLAY_NEXT);
      });    
    },
  );

  connection.on(EVENTS.CONNECT_ERROR, (error) => {
    console.log('Error connecting to the sockets:', error);
    return connection.close();
  });

  connection.on(EVENTS.SWITCH_TRACK, (data) => {
    const decodedMagnet = decodeMagnet(data.link);

    return downloadTorrent(decodedMagnet);
  });

  $('#logout').on('click', async () => {
    localStorage.removeItem('token');
    await connection.disconnect(true);
    return Index();
  });
}
