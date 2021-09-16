let TAB = 'playlist';
let USER = {};

function HomePlayer() {

}

async function Home(anchor = '#root') {
  loader();

  const token = getToken();
  if (!token) {
    return Index();
  }

  try {
    const { data } = await $.ajax({
      headers: {
        Authorization: token,
      },
      method: 'GET',
      url: `${BACKEND_ENDPOINT}/api/account`,
    });

    USER = data.user;

    loader.hide();

    if (!connection.connected) {
      await Sockets(token);
    }

    $(anchor).empty().append(`
  <div class="flex justify-content-space-between items-center noselect">
    <div>${USER.firstName} ${USER.lastName} (${USER.email})</div>
    <div class="flex items-center">
      <span class="mr-1">
        Client: ${CLIENT_TYPE}
      </span>
      <button
        id="logout"
        type="button"
      >
        Logout
      </button>
    </div>
  </div>
  <div
    class="flex w-100 noselect"
    id="tabs"
  >
    <button
      class="home-tab-button ${TAB === 'player' ? 'tab-selected' : ''}"
      id="select-player"
      type="button"
    >
      Player
    </button>
    <button
      class="home-tab-button ${TAB === 'playlist' ? 'tab-selected' : ''}"
      id="select-playlist"
      type="button"
    >
      Playlist
    </button>
  </div>
  <div
    class="mt-1"
    id="home-player"
  ></div>
    `);
  
    $('#select-player').on('click', () => {
      if (TAB === 'player') {
        return null;
      }

      return Player();
    });
    $('#select-playlist').on('click', () => {
      if (TAB === 'playlist') {
        return null;
      }

      return Playlist();
    });

    $('#logout').on('click', async () => {
      removeToken();
      // await connection.disconnect(true);
      return Index();
    });
  } catch (error) {
    loader.hide();
    console.log(error);
  }
}
