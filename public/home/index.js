async function Home(anchor) {
  loader(anchor);

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

    const { user } = data;
    const socketsAnchor = 'websockets-anchor';
    $(anchor).empty().append(`
  <h1>Hello ${user.firstName} ${user.lastName}!</h1>
  <mark>Logged in as ${CLIENT_TYPE}</mark>
  <div id="${socketsAnchor}"></div>
  <div>
    <button
      class="mt-1"
      id="logout"
      type="button"
    >
      Logout
    </button>
  </div>
    `);
  
    await Sockets(`#${socketsAnchor}`);
  } catch (error) {

  }
}
