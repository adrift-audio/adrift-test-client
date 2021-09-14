const TRACK_LIST_ANCHOR = 'track-list';

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
<div
  class="mt-1"
  id="${TRACK_LIST_ANCHOR}"
></div>
<div
  class="mt-1"
  id="audio"
></div>
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
      $(`#${TRACK_LIST_ANCHOR}`).empty();
      playlist.forEach((track) => $(`#${TRACK_LIST_ANCHOR}`).append(`
<button
    class="track-item flex justify-content-space-between w-100 track"
    id="${track.id}"
    type="button"
>
    <span id="${track.id}">${track.name}</span>
    <span id="${track.id}">${formatDuration(track.duration)}</span>
</button>
      `)); 

      $('.track-item').on('click', (event) => {
        const { id } = event.target;
        connection.emit(
          EVENTS.PLAY_NEXT,
          {
            id,
            issuer: CLIENT_TYPE,
            target: 'desktop',
          },
        );
      });
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

  connection.on(
    EVENTS.REMOVE_ALL,
    (payload) => {
      if (payload.target !== CLIENT_TYPE) {
        return null;
      }

      // TODO: clear torrents & links

      return $(`#${TRACK_LIST_ANCHOR}`).empty();
    },
  );

  connection.on(
    EVENTS.ERROR, 
    (payload) => console.log('Error in response:', payload.error),
  );

  $('#logout').on('click', async () => {
    localStorage.removeItem('token');
    await connection.disconnect(true);
    return Index();
  });
}
