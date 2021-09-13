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
    EVENTS.CONNECT,
    () => {
      console.log('-- connected to WS server with id', connection.id);

      $(anchor).empty().append(`
<div>Websockets connected!</div>
<div id="now-playing"></div>
<div id="track-list"></div>
<div id="audio"></div>
      `);

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

  // Receive available playlist when desktop connects and display it
  connection.on(
    EVENTS.AVAILABLE_PLAYLIST,
    ({ playlist }) => {
      playlist.forEach((track) => $('#track-list').append(`
<button
    class="track-item flex justify-content-space-between w-100 track"
    id="${track.id}"
    type="button"
>
    <span>${track.name}</span>
    <span>${formatDuration(track.duration)}</span>
</button>
      `)); 

      $('.track-item').on('click', (event) => connection.emit(
        EVENTS.PLAY_NEXT,
        {
          id: event.target.id,
          issuer: CLIENT_TYPE,
          target: 'desktop',
        },
      ));
    },
  );

  connection.on(EVENTS.SWITCH_TRACK, (data) => {
    const decodedMagnet = decodeMagnet(data.link);
    $('#now-playing').empty().append(`
<div>
  Now playing: ${data.track.name} (<span id="progress"></span>)
</div>    
    `);

    return downloadTorrent(decodedMagnet, 'progress', data.track);
  });

  $('#logout').on('click', async () => {
    localStorage.removeItem('token');
    await connection.disconnect(true);
    return Index();
  });
}
