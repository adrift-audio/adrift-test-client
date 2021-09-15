let LOADED_PLAYLIST = [];

function drawContent(anchor) {
  LOADED_PLAYLIST.forEach((track) => $(anchor).append(`
<button
  class="flex justify-content-space-between w-100 track"
  id="${track.id}"
  type="button"
>
  <span id="${track.id}">${track.name}</span>
  <span id="${track.id}">${formatDuration(track.duration)}s</span>
</button>
  `));

  $('.track').on('click', (event) => {
    const { id } = event.target;
    connection.emit(
      EVENTS.PLAY_NEXT,
      {
        id,
        issuer: CLIENT_TYPE,
        target: 'desktop',
      },
    );
    SELECTED_TRACK = LOADED_PLAYLIST.filter((track) => track.id === id)[0];
    console.log(SELECTED_TRACK);
    return Player();
  }); 
}

function Playlist(anchor = '#home-player') {
  $(anchor).empty();

  $('#select-player').removeClass('tab-selected');
  $('#select-playlist').addClass('tab-selected');
  TAB = 'playlist';

  return drawContent(anchor);
}

connection.on(
  EVENTS.AVAILABLE_PLAYLIST,
  ({ playlist: newPlaylist, target }) => {
    if (target !== CLIENT_TYPE) {
      return null;
    }

    LOADED_PLAYLIST = newPlaylist;
    return drawContent('#home-player');
  },
);

connection.on(
  EVENTS.REMOVE_ALL,
  (payload) => {
    if (payload.target !== CLIENT_TYPE) {
      return null;
    }

    LOADED_PLAYLIST = [];
    return drawContent('#home-player');
  },
);
